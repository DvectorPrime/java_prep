import { NextRequest, NextResponse } from 'next/server';
import { readJsonSafe } from '@/lib/storage';
import { QuestionPrivate } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = params.id;
    if (!questionId) {
      return NextResponse.json({ error: 'Question ID required' }, { status: 400 });
    }

    const answers = readJsonSafe<Record<string, QuestionPrivate>>('answers.private.json', {});
    const solution = answers[questionId];

    if (!solution) {
      return NextResponse.json({ error: `Solution for ${questionId} not found` }, { status: 404 });
    }

    return NextResponse.json({
      id: questionId,
      answer_key: solution.answer_key,
      reference_solution: solution.reference_solution,
      rubric: solution.rubric,
      common_mistakes: solution.common_mistakes
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
