import { NextRequest, NextResponse } from 'next/server';
import { readJsonSafe } from '@/lib/storage';
import { getGroqPool } from '@/lib/groqPool';
import { getCachedGrading, setCachedGrading } from '@/lib/gradingCache';
import { checkStudentDailyQuota, recordStudentUsage } from '@/lib/rateLimiter';
import { QuestionPublic, QuestionPrivate, GradingResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

const EXACT_SYSTEM_PROMPT = `You are an expert, strict, and impartial Java university examiner grading a practical exam submission for COS 202 (Advanced OOP in Java) at the University of Ibadan.

You are provided with:
1. The Question Task & Code Snippet
2. The Official Answer Key & Grading Rubric
3. The Student's Submitted Answer

Grading Guidelines:
- Grade strictly according to the provided Answer Key and Rubric.
- Accept equivalent valid code solutions that achieve the correct outcome.
- For 'spot-error' questions:
  * Check line number, error type (syntax vs semantic), and the corrected code.
  * Award 1.0 point if line, type, and fix are correct.
  * Award 0.5 points if two out of three are correct.
  * Award 0 credit for any fix that would not compile or breaks program functionality.
  * Do not penalize students for noting harmless cosmetic variations unless their replacement introduces bugs.
- For 'write-code' questions:
  * Evaluate item by item against the rubric criteria.
  * Credit syntactically valid alternative implementations that meet all specifications.
- For 'predict-output' questions:
  * Compare exact string output, line breaks, and runtime exceptions.
- For 'debug-extend' questions:
  * Grade Part 1 (debugging) and Part 2 (feature extension) against their respective rubric items.
- Keep all feedback items concise (maximum 25 words per item).
- NEVER reveal the full official reference solution in your summary or comments.

You MUST respond ONLY with valid JSON conforming to this exact structure:
{
  "score": number,
  "max": number,
  "items": [
    {
      "label": "string (e.g. Error 1 / Method structure / Pass output)",
      "earned": number,
      "max": number,
      "comment": "string (max 25 words)"
    }
  ],
  "summary": "string (overall assessment, max 40 words)",
  "next_step": "string (actionable advice for the student)"
}`;

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\r?\n/, '').replace(/\r?\n```$/, '');
  }
  return cleaned.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, questionId, answer } = body;

    // 1. Input Validation
    if (!clientId || typeof clientId !== 'string' || !clientId.trim()) {
      return NextResponse.json({ error: 'Client ID is required.' }, { status: 400 });
    }

    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json({ error: 'Question ID is required.' }, { status: 400 });
    }

    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      return NextResponse.json({ error: 'Please enter your answer or code before submitting.' }, { status: 400 });
    }

    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.length > 8000) {
      return NextResponse.json({ error: 'Answer exceeds the 8,000 character maximum limit.' }, { status: 400 });
    }

    // Check question validity
    const publicQuestions = readJsonSafe<QuestionPublic[]>('questions.public.json', []);
    const privateAnswers = readJsonSafe<Record<string, QuestionPrivate>>('answers.private.json', {});

    const questionMeta = publicQuestions.find(q => q.id === questionId);
    const questionPrivate = privateAnswers[questionId];

    if (!questionMeta || !questionPrivate) {
      return NextResponse.json({ error: `Question ${questionId} does not exist.` }, { status: 404 });
    }

    const groqPool = getGroqPool();
    const config = groqPool.getConfig();

    // 2. Grading Pause Check
    if (config.gradingPaused) {
      return NextResponse.json(
        { error: 'AI grading is temporarily paused by the instructor. You can still use Self-Check to view the answer key and solution.' },
        { status: 503 }
      );
    }

    // 3. Exact Cache Lookup
    const cachedResult = getCachedGrading(questionId, trimmedAnswer);
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // 4. Student Daily Limit
    const quota = checkStudentDailyQuota(clientId, config.dailyStudentCap);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: `Daily grading quota reached (${config.dailyStudentCap}/${config.dailyStudentCap}). You can still view official solutions using Self-Check.`
        },
        { status: 429 }
      );
    }

    // 5. Build AI Evaluation Prompt
    const userPrompt = `### QUESTION CONTEXT
Question ID: ${questionMeta.id}
Section: ${questionMeta.section}
Type: ${questionMeta.type}
Total Max Points: ${questionMeta.points}
${questionMeta.error_header ? `Error Header Specification: ${questionMeta.error_header}` : ''}

### TASK INSTRUCTIONS:
${questionMeta.task}

${questionMeta.code ? `### PROVIDED CODE SNIPPET:\n\`\`\`java\n${questionMeta.code}\n\`\`\`` : ''}

### OFFICIAL ANSWER KEY & CRITERIA:
${questionPrivate.answer_key}

### OFFICIAL GRADING RUBRIC:
${questionPrivate.rubric}

### STUDENT SUBMISSION:
${trimmedAnswer}

### INSTRUCTIONS:
Grade the student submission strictly against the rubric and max score of ${questionMeta.points}. Ensure score <= ${questionMeta.points}. Return only the JSON object.`;

    const messages = [
      { role: 'system', content: EXACT_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ];

    let completionResult;
    try {
      completionResult = await groqPool.executeChatCompletion(messages);
    } catch (err: unknown) {
      const error = err as Error;
      return NextResponse.json(
        {
          error: error.message || 'Grader busy. Please try again in a few moments or use Self-Check.',
          retryAfterSeconds: 30
        },
        { status: 503 }
      );
    }

    // 6. Output Parsing & Sanitization
    let parsed: any = null;
    const cleanedJson = cleanJsonString(completionResult.content);

    try {
      parsed = JSON.parse(cleanedJson);
    } catch {
      // Retry once with a corrective nudge
      try {
        const retryMessages = [
          ...messages,
          { role: 'assistant', content: completionResult.content },
          { role: 'user', content: 'Your previous response was not valid JSON. Please re-output ONLY the JSON structure without any commentary or markdown.' }
        ];
        const retryResult = await groqPool.executeChatCompletion(retryMessages);
        parsed = JSON.parse(cleanJsonString(retryResult.content));
      } catch (retryErr) {
        return NextResponse.json(
          { error: 'Failed to parse examiner response. Please try submitting again or use Self-Check.' },
          { status: 502 }
        );
      }
    }

    // Clamp score and normalize fields
    const rawScore = typeof parsed.score === 'number' ? parsed.score : 0;
    const maxScore = questionMeta.points;
    const clampedScore = Math.max(0, Math.min(maxScore, rawScore));

    const finalItems = Array.isArray(parsed.items)
      ? parsed.items.map((item: any, idx: number) => ({
          label: String(item.label || `Criterion ${idx + 1}`),
          earned: typeof item.earned === 'number' ? Math.max(0, item.earned) : 0,
          max: typeof item.max === 'number' ? Math.max(0, item.max) : 1,
          comment: String(item.comment || '').slice(0, 150)
        }))
      : [];

    const finalResponse: GradingResponse = {
      score: clampedScore,
      max: maxScore,
      items: finalItems,
      summary: String(parsed.summary || 'Submission graded.').slice(0, 300),
      next_step: parsed.next_step ? String(parsed.next_step).slice(0, 300) : undefined,
      model: completionResult.model,
      cached: false
    };

    // Cache the successful grading
    setCachedGrading(questionId, trimmedAnswer, finalResponse);

    // Record student quota deduction
    recordStudentUsage(clientId);

    return NextResponse.json(finalResponse);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error in /api/grade:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
