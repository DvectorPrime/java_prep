import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const questionBankPath = path.join(rootDir, 'QUESTION_BANK.md');
const dataDir = path.join(rootDir, 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Reading QUESTION_BANK.md...');
const content = fs.readFileSync(questionBankPath, 'utf-8');

// Expected section distribution
const EXPECTED_SECTIONS = {
  A: 20,
  B: 15,
  C: 12,
  D: 13,
  E: 12,
  F: 8,
  G: 5,
  H: 10,
  I: 5
};

// Section headers and scope descriptions
const sectionMeta = [];
const sectionRegex = /^## Section ([A-I]):\s*(.*?)\r?\n(?:Scope:\s*(.*?))?(?=\r?\n\r?\n|\r?\n###)/gm;
let secMatch;
while ((secMatch = sectionRegex.exec(content)) !== null) {
  sectionMeta.push({
    code: secMatch[1],
    title: secMatch[2].trim(),
    scope: (secMatch[3] || '').trim()
  });
}

// Split by question blocks
const qBlocks = content.split(/^### (Q\d{3})/m);
if (qBlocks.length < 2) {
  console.error('CRITICAL: No questions found matching ### Q###');
  process.exit(1);
}

const publicQuestions = [];
const privateAnswers = {};
const parsedMap = new Map();

for (let i = 1; i < qBlocks.length; i += 2) {
  const id = qBlocks[i].trim();
  const rawBody = qBlocks[i + 1];

  // Stop if we hit ## Manifest or other trailing content in the last chunk
  const body = rawBody.split(/^## /m)[0];

  const lines = body.split(/\r?\n/);
  const meta = {};
  let bodyStartIndex = 0;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (line.startsWith('**') || line.startsWith('```')) {
      bodyStartIndex = idx;
      break;
    }
    const m = line.match(/^-\s*([a-zA-Z0-9_]+)\s*:\s*(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim();
      meta[key] = val;
    }
  }

  const remainingBody = lines.slice(bodyStartIndex).join('\n');

  // Extract sections from remaining body
  // Possible sections:
  // **Task:**
  // **Code:**
  // **Answer key:**
  // **Reference solution:**
  // **Rubric:**
  // **Common mistakes:** (or Common pitfalls:)
  // **Trace and Explanation:** (predict output)

  let task = '';
  let code = '';
  let answerKey = '';
  let referenceSolution = '';
  let rubric = '';
  let commonMistakes = '';

  const type = meta.type || '';

  if (type === 'predict-output') {
    // For predict-output, task typically contains the code snippet
    // Structure:
    // **Task:** ... ```java ... ```
    // **Answer key:** ...
    // **Trace and Explanation:** ...
    // **Rubric:** ...
    // **Common pitfalls:** ...
    const taskMatch = remainingBody.match(/\*\*Task:\*\*([\s\S]*?)(?=\*\*Answer key:\*\*)/i);
    const ansMatch = remainingBody.match(/\*\*Answer key:\*\*([\s\S]*?)(?=\*\*Trace and Explanation:\*\*)/i);
    const traceMatch = remainingBody.match(/\*\*Trace and Explanation:\*\*([\s\S]*?)(?=\*\*Rubric:\*\*)/i);
    const rubricMatch = remainingBody.match(/\*\*Rubric:\*\*([\s\S]*?)(?=\*\*Common (?:mistakes|pitfalls):\*\*|$)/i);
    const mistakesMatch = remainingBody.match(/\*\*Common (?:mistakes|pitfalls):\*\*([\s\S]*?)$/i);

    let rawTask = taskMatch ? taskMatch[1].trim() : '';
    // Extract code block from task if present
    const codeInTask = rawTask.match(/```(?:java)?\r?\n([\s\S]*?)```/);
    if (codeInTask) {
      code = codeInTask[1].trim();
      task = rawTask.replace(/```(?:java)?\r?\n[\s\S]*?```/, '').trim();
    } else {
      task = rawTask;
    }

    answerKey = ansMatch ? ansMatch[1].trim() : '';
    referenceSolution = traceMatch ? traceMatch[1].trim() : '';
    rubric = rubricMatch ? rubricMatch[1].trim() : '';
    commonMistakes = mistakesMatch ? mistakesMatch[1].trim() : '';
  } else if (type === 'debug-extend') {
    // **Task:** ...
    // **Part 1: Debugging ...**
    // **Code:** ...
    // **Part 2: Extension ...**
    // **Answer key:** ...
    // **Reference solution:** ...
    // **Rubric:** ...
    // **Common mistakes:** ...
    const taskMatch = remainingBody.match(/\*\*Task:\*\*([\s\S]*?)(?=\*\*Part 1:|\*\*Code:\*\*)/i);
    const part1Match = remainingBody.match(/\*\*Part 1:[^*]*\*\*([\s\S]*?)(?=\*\*Code:\*\*)/i);
    const codeMatch = remainingBody.match(/\*\*Code:\*\*[\s\S]*?```(?:java)?\r?\n([\s\S]*?)```/i);
    const part2Match = remainingBody.match(/\*\*Part 2:[^*]*\*\*([\s\S]*?)(?=\*\*Answer key:\*\*)/i);
    const ansMatch = remainingBody.match(/\*\*Answer key:\*\*([\s\S]*?)(?=\*\*Reference solution:\*\*)/i);
    const refMatch = remainingBody.match(/\*\*Reference solution:\*\*([\s\S]*?)(?=\*\*Rubric:\*\*)/i);
    const rubricMatch = remainingBody.match(/\*\*Rubric:\*\*([\s\S]*?)(?=\*\*Common (?:mistakes|pitfalls):\*\*|$)/i);
    const mistakesMatch = remainingBody.match(/\*\*Common (?:mistakes|pitfalls):\*\*([\s\S]*?)$/i);

    const taskParts = [];
    if (taskMatch) taskParts.push(taskMatch[1].trim());
    if (part1Match) taskParts.push('**Part 1: Debugging:** ' + part1Match[1].trim());
    if (part2Match) taskParts.push('**Part 2: Extension:** ' + part2Match[1].trim());
    task = taskParts.join('\n\n');

    code = codeMatch ? codeMatch[1].trim() : '';
    answerKey = ansMatch ? ansMatch[1].trim() : '';
    referenceSolution = refMatch ? refMatch[1].trim() : '';
    rubric = rubricMatch ? rubricMatch[1].trim() : '';
    commonMistakes = mistakesMatch ? mistakesMatch[1].trim() : '';
  } else {
    // Standard spot-error or write-code
    const taskMatch = remainingBody.match(/\*\*Task:\*\*([\s\S]*?)(?=\*\*Code:\*\*|\*\*Answer key:\*\*)/i);
    const codeMatch = remainingBody.match(/\*\*Code:\*\*[\s\S]*?```(?:java)?\r?\n([\s\S]*?)```/i);
    const ansMatch = remainingBody.match(/\*\*Answer key:\*\*([\s\S]*?)(?=\*\*Reference solution:\*\*)/i);
    const refMatch = remainingBody.match(/\*\*Reference solution:\*\*([\s\S]*?)(?=\*\*Rubric:\*\*)/i);
    const rubricMatch = remainingBody.match(/\*\*Rubric:\*\*([\s\S]*?)(?=\*\*Common (?:mistakes|pitfalls):\*\*|$)/i);
    const mistakesMatch = remainingBody.match(/\*\*Common (?:mistakes|pitfalls):\*\*([\s\S]*?)$/i);

    task = taskMatch ? taskMatch[1].trim() : '';
    code = codeMatch ? codeMatch[1].trim() : '';
    answerKey = ansMatch ? ansMatch[1].trim() : '';
    referenceSolution = refMatch ? refMatch[1].trim() : '';
    rubric = rubricMatch ? rubricMatch[1].trim() : '';
    commonMistakes = mistakesMatch ? mistakesMatch[1].trim() : '';
  }

  // Clean reference solution of code fences if it's pure code or keep markdown
  // Let's keep referenceSolution formatted or clean
  const qPublic = {
    id,
    section: meta.section,
    type: meta.type,
    difficulty: meta.difficulty,
    topic: meta.topic,
    points: parseInt(meta.points, 10) || 0,
    time_minutes: parseInt(meta.time_minutes, 10) || 5,
    source: meta.source || '',
    error_header: meta.error_header || null,
    task,
    code
  };

  const qPrivate = {
    answer_key: answerKey,
    reference_solution: referenceSolution,
    rubric,
    common_mistakes: commonMistakes
  };

  parsedMap.set(id, { qPublic, qPrivate });
  publicQuestions.push(qPublic);
  privateAnswers[id] = qPrivate;
}

console.log(`Parsed ${publicQuestions.length} questions from QUESTION_BANK.md.`);

// 3.2 Strict Parsing Validation Rules
// 1. Total questions != 100
if (publicQuestions.length !== 100) {
  console.error(`VALIDATION ERROR: Expected 100 questions, but found ${publicQuestions.length}`);
  process.exit(1);
}

// 2. Check IDs from Q001 through Q100
for (let n = 1; n <= 100; n++) {
  const expectedId = 'Q' + String(n).padStart(3, '0');
  if (!parsedMap.has(expectedId)) {
    console.error(`VALIDATION ERROR: Missing question ID ${expectedId}`);
    process.exit(1);
  }
}

// 3. Section counts
const sectionCounts = {};
for (const q of publicQuestions) {
  sectionCounts[q.section] = (sectionCounts[q.section] || 0) + 1;
}

for (const [sec, expectedCount] of Object.entries(EXPECTED_SECTIONS)) {
  const actualCount = sectionCounts[sec] || 0;
  if (actualCount !== expectedCount) {
    console.error(`VALIDATION ERROR: Section ${sec} has ${actualCount} questions, expected ${expectedCount}`);
    process.exit(1);
  }
}

// 4. Any question of type 'spot-error' or 'debug-extend' lacks an error_header
for (const q of publicQuestions) {
  if ((q.type === 'spot-error' || q.type === 'debug-extend') && !q.error_header) {
    console.error(`VALIDATION ERROR: Question ${q.id} (${q.type}) is missing required error_header`);
    process.exit(1);
  }
}

// Parse Mock Papers from QUESTION_BANK.md
const mockPapers = [
  {
    id: 1,
    title: 'Mock Paper 1: Standard Exam Parity (Leans Medium)',
    targetMinutes: 67,
    totalPoints: 43,
    description: 'Replicates standard University of Ibadan COS 202 Java Practical Code Test structure.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Student Records & Inheritance',
        questionIds: ['Q001', 'Q003', 'Q006', 'Q011', 'Q036']
      },
      {
        part: 2,
        title: 'Part 2: Payment Processing & Windows',
        questionIds: ['Q021', 'Q023', 'Q038', 'Q048']
      },
      {
        part: 3,
        title: 'Part 3: Writing a Program',
        questionIds: ['Q072']
      }
    ]
  },
  {
    id: 2,
    title: 'Mock Paper 2: Real Exam Parity (Leans Medium-Hard)',
    targetMinutes: 68,
    totalPoints: 43,
    description: 'Challenging practical leaning medium-hard with complex payment processing and inheritance.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Student Hierarchies & Library Catalog',
        questionIds: ['Q002', 'Q007', 'Q012', 'Q026', 'Q041']
      },
      {
        part: 2,
        title: 'Part 2: Payment Surcharge & Event Handling',
        questionIds: ['Q022', 'Q027', 'Q039', 'Q049']
      },
      {
        part: 3,
        title: 'Part 3: Writing a Program',
        questionIds: ['Q080']
      }
    ]
  },
  {
    id: 3,
    title: 'Mock Paper 3: High-Difficulty Mastery (Leans Hard)',
    targetMinutes: 84,
    totalPoints: 50,
    description: 'Capstone mastery paper featuring advanced OOP, ATM GUI window, and debug & extend scenarios.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Advanced OOP & Exception Handling',
        questionIds: ['Q008', 'Q013', 'Q018', 'Q028', 'Q042']
      },
      {
        part: 2,
        title: 'Part 2: Polymorphic Surcharges & ATM GUI Window',
        questionIds: ['Q031', 'Q032', 'Q045', 'Q060']
      },
      {
        part: 3,
        title: 'Part 3: Debug & Extend Capstone',
        questionIds: ['Q099']
      }
    ]
  }
];

// 5. Any referenced question ID in mock_papers does not exist in the bank
for (const mock of mockPapers) {
  for (const part of mock.parts) {
    for (const qId of part.questionIds) {
      if (!parsedMap.has(qId)) {
        console.error(`VALIDATION ERROR: Mock ${mock.id} references non-existent question ID ${qId}`);
        process.exit(1);
      }
    }
  }
}

// Manifest items (100 rows)
const manifest = publicQuestions.map(q => ({
  id: q.id,
  section: q.section,
  type: q.type,
  difficulty: q.difficulty,
  points: q.points,
  topic: q.topic,
  source: q.source
}));

// Sections meta with computed stats
const sections = sectionMeta.map(sec => {
  const qList = publicQuestions.filter(q => q.section === sec.code);
  const totalPoints = qList.reduce((sum, q) => sum + q.points, 0);
  return {
    code: sec.code,
    title: sec.title,
    scope: sec.scope,
    count: qList.length,
    totalPoints,
    questions: qList.map(q => q.id)
  };
});

// Study Order details
const studyOrder = {
  title: '2-Day Calibrated Study Plan',
  day1: {
    title: 'Day 1: Foundations & Core Mechanics (7 hours)',
    blocks: [
      {
        block: 1,
        time: '08:00 – 10:15 (2h 15m)',
        section: 'A (Q001 – Q020)',
        topic: 'Student Records — Constructors, inheritance, getters/setters, arrays, super(), overriding',
        focus: 'Spotting missing return types, case-sensitive constructor spelling, semicolon omissions, loop bounds.'
      },
      {
        block: 2,
        time: '10:30 – 12:15 (1h 45m)',
        section: 'B (Q021 – Q035)',
        topic: 'Payment Processing — Abstract classes vs interfaces, visibility reduction, polymorphic references',
        focus: 'Enforcing abstract method signatures, public interface methods, surcharge/discount logic.'
      },
      {
        block: 3,
        time: '13:30 – 16:00 (2h 30m)',
        section: 'E (Q061 – Q072)',
        topic: 'Core Practical Programming — Arrays, 2D matrix multiplication, recursion, sorting & searching',
        focus: 'Writing clean Java classes from scratch without IDE assistance. High priority: Q072 (Selection Sort).'
      },
      {
        block: 4,
        time: '16:30 – 17:30 (1h 00m)',
        section: 'H Part 1 (Q086 – Q090)',
        topic: 'Mental Execution & Tracing — Constructor chaining order, static/instance init blocks, string pool, try-catch-finally',
        focus: 'Stepping through code line-by-line before running the JVM.'
      }
    ]
  },
  day2: {
    title: 'Day 2: Advanced OOP, GUI Integration & Timed Mocks (8 hours)',
    blocks: [
      {
        block: 5,
        time: '08:00 – 09:30 (1h 30m)',
        section: 'C (Q036 – Q047) & D (Q048 – Q060)',
        topic: 'University Members, Library & Banking GUI — ArrayList, exceptions, Swing components, ActionListener',
        focus: 'Diagnosing missing container adds, unparsed numeric fields, misplaced catch blocks.'
      },
      {
        block: 6,
        time: '09:45 – 11:30 (1h 45m)',
        section: 'F (Q073 – Q080) & G (Q081 – Q085)',
        topic: 'OOP Design & Swing Forms — Multi-level inheritance, abstract class hierarchies, custom exceptions, complete GUI windows',
        focus: 'Implementing PaymentMethod (Q080) and interactive course registration forms (Q083, Q085).'
      },
      {
        block: 7,
        time: '11:30 – 12:30 (1h 00m)',
        section: 'I (Q096 – Q100) & H Part 2 (Q091 – Q095)',
        topic: 'Capstone Debug & Extend & Advanced Output Tracing',
        focus: 'Two-part questions (error spotting + architectural extension) and tricky JVM corner cases.'
      },
      {
        block: 8,
        time: '13:45 – 17:15 (3h 30m)',
        section: 'Full Mock Exam Simulation',
        topic: 'Timed exam papers: Mock 1 (70m), Mock 2 (70m), Mock 3 (80m)',
        focus: 'Simulate exact exam conditions followed by self-grading and feedback review.'
      }
    ]
  },
  lastHourReview: [
    'Review case sensitivity in constructor names (e.g. public student(...) fails to compile).',
    'Review abstract methods terminating with a body { ... } instead of a semicolon ;.',
    'Review reducing visibility in overridden methods (e.g. protected overriding public).',
    'Review integer division truncation: (1 / 2) * b * h is 0.0; use 0.5 * b * h.',
    'Review String equality using == instead of .equals().',
    'Review off-by-one loop conditions: i <= arr.length triggers ArrayIndexOutOfBoundsException.',
    'Review container additions for Swing components: frame.add(btn), frame.add(new JScrollPane(textArea)).'
  ],
  emergency4Hour: [
    { hour: 1, action: 'Solve Mock Paper 1 under strict 60-minute time conditions.' },
    { hour: 2, action: 'Study Section A (Q001–Q010) and Section B (Q021–Q030) answer keys.' },
    { hour: 3, action: 'Hand-write code for Q072 (SelectionSort) and Q080 (PaymentMethod Hierarchy).' },
    { hour: 4, action: 'Walk through Section H (Q086–Q095) for output tracing corner cases.' }
  ]
};

const metaData = {
  sections,
  manifest,
  study_order: studyOrder,
  mock_papers: mockPapers
};

// Write outputs to data/
fs.writeFileSync(path.join(dataDir, 'questions.public.json'), JSON.stringify(publicQuestions, null, 2));
fs.writeFileSync(path.join(dataDir, 'answers.private.json'), JSON.stringify(privateAnswers, null, 2));
fs.writeFileSync(path.join(dataDir, 'meta.json'), JSON.stringify(metaData, null, 2));

console.log('Successfully generated:');
console.log(' - data/questions.public.json');
console.log(' - data/answers.private.json');
console.log(' - data/meta.json');
console.log('Validation passed: 100 questions, sections distribution verified, mock references verified.');
