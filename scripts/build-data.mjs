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

// Expected section distribution for 200 questions (2 batches of 100)
const EXPECTED_SECTIONS = {
  A: 40,
  B: 30,
  C: 24,
  D: 26,
  E: 24,
  F: 16,
  G: 10,
  H: 20,
  I: 10
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

function parseQuestionsFromBank(content) {
  const qBlocks = content.split(/^### (Q\d{3})/m);
  if (qBlocks.length < 2) {
    throw new Error('CRITICAL: No questions found matching ### Q###');
  }

  const list = [];

  for (let i = 1; i < qBlocks.length; i += 2) {
    const id = qBlocks[i].trim();
    const rawBody = qBlocks[i + 1];

    // Stop if we hit ## Manifest or other trailing section headers
    const body = rawBody.split(/^## (?:Section|Manifest|Mock|Study)/m)[0];

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
        meta[m[1].trim()] = m[2].trim();
      }
    }

    const remainingBody = lines.slice(bodyStartIndex).join('\n');
    const type = meta.type || '';

    let task = '';
    let code = '';
    let answerKey = '';
    let referenceSolution = '';
    let rubric = '';
    let commonMistakes = '';

    // Extract code
    const codeMatch = remainingBody.match(/\*\*Code:\*\*[\s\S]*?```(?:java)?\r?\n([\s\S]*?)```/i);
    if (codeMatch) {
      code = codeMatch[1].trim();
    } else {
      // For questions where code is placed inside Task (e.g. Bank 1 predict-output)
      const codeInTask = remainingBody.match(/```(?:java)?\r?\n([\s\S]*?)```/);
      if (codeInTask && remainingBody.indexOf('**Answer key:**') > remainingBody.indexOf('```')) {
        code = codeInTask[1].trim();
      }
    }

    // Extract task
    const taskMatch = remainingBody.match(/\*\*Task:\*\*([\s\S]*?)(?=\*\*Code:\*\*|\*\*Answer key:\*\*)/i);
    if (taskMatch) {
      let t = taskMatch[1].trim();
      t = t.replace(/```(?:java)?\r?\n[\s\S]*?```/g, '').trim();
      task = t;
    }

    // Extract answerKey
    const ansMatch = remainingBody.match(/\*\*Answer key:\*\*([\s\S]*?)(?=\*\*Reference solution:\*\*|\*\*Trace and Explanation:\*\*|\*\*Rubric:\*\*)/i);
    if (ansMatch) answerKey = ansMatch[1].trim();

    // Extract referenceSolution or trace
    const refMatch = remainingBody.match(/(?:\*\*Reference solution:\*\*|\*\*Trace and Explanation:\*\*)\s*([\s\S]*?)(?=\*\*Rubric:\*\*)/i);
    if (refMatch) referenceSolution = refMatch[1].trim();

    // Extract rubric
    const rubMatch = remainingBody.match(/\*\*Rubric:\*\*([\s\S]*?)(?=\*\*Common (?:mistakes|pitfalls):\*\*|$)/i);
    if (rubMatch) rubric = rubMatch[1].trim();

    // Extract common mistakes
    const misMatch = remainingBody.match(/\*\*Common (?:mistakes|pitfalls):\*\*([\s\S]*?)$/i);
    if (misMatch) commonMistakes = misMatch[1].trim();

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

    list.push({ qPublic, qPrivate, rawBody });
  }

  return list;
}

const allQuestions = parseQuestionsFromBank(content);
console.log(`Parsed ${allQuestions.length} questions from QUESTION_BANK.md.`);

const publicQuestions = [];
const privateAnswers = {};
const parsedMap = new Map();

for (const item of allQuestions) {
  const { qPublic, qPrivate } = item;
  parsedMap.set(qPublic.id, item);
  publicQuestions.push(qPublic);
  privateAnswers[qPublic.id] = qPrivate;
}

// 3.2 Strict Parsing Validation Rules
// 1. Total questions != 200
if (publicQuestions.length !== 200) {
  console.error(`VALIDATION ERROR: Expected 200 questions, but found ${publicQuestions.length}`);
  process.exit(1);
}

// 2. Check IDs from Q001 through Q200
for (let n = 1; n <= 200; n++) {
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
  if (!q.task) {
    console.error(`VALIDATION ERROR: Question ${q.id} has empty task!`);
    process.exit(1);
  }
}

// 6 Full Mock Papers (3 from Bank 1 + 3 from Bank 2)
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
  },
  {
    id: 4,
    title: 'Mock Paper 4: Practical Synthesis & Verification (Leans Medium)',
    targetMinutes: 71,
    totalPoints: 37,
    description: 'Batch 2 practical paper covering essential OOP encapsulation, swing clearance forms, and insertion sort.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Encapsulation & Exceptions',
        questionIds: ['Q105', 'Q106', 'Q110', 'Q124', 'Q138']
      },
      {
        part: 2,
        title: 'Part 2: Abstract Classes & GUI Controls',
        questionIds: ['Q125', 'Q141', 'Q149', 'Q152']
      },
      {
        part: 3,
        title: 'Part 3: Algorithm Implementation',
        questionIds: ['Q169']
      }
    ]
  },
  {
    id: 5,
    title: 'Mock Paper 5: Advanced Practical Examination (Leans Medium-Hard)',
    targetMinutes: 76,
    totalPoints: 41,
    description: 'Batch 2 examination with multilevel inheritance, custom exceptions, and library registry systems.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Class Hierarchies & Exceptions',
        questionIds: ['Q103', 'Q107', 'Q113', 'Q127', 'Q143']
      },
      {
        part: 2,
        title: 'Part 2: Interfaces & Event Handling',
        questionIds: ['Q128', 'Q145', 'Q150', 'Q156']
      },
      {
        part: 3,
        title: 'Part 3: Debug & Extend (Library Collection)',
        questionIds: ['Q197']
      }
    ]
  },
  {
    id: 6,
    title: 'Mock Paper 6: Comprehensive Rigorous Mock (Leans Hard)',
    targetMinutes: 106,
    totalPoints: 53,
    description: 'High-rigour capstone mock testing advanced polymorphic payments, GUI state tracking, and selection sort.',
    parts: [
      {
        part: 1,
        title: 'Part 1: Overriding & Complex Validations',
        questionIds: ['Q117', 'Q114', 'Q119', 'Q131', 'Q144']
      },
      {
        part: 2,
        title: 'Part 2: Static/Final Interfaces & Admission GUIs',
        questionIds: ['Q133', 'Q134', 'Q146', 'Q155']
      },
      {
        part: 3,
        title: 'Part 3: Selection Sort Implementation',
        questionIds: ['Q171']
      }
    ]
  }
];

// 5. Verify every referenced question ID in mock_papers exists in the bank
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

// Manifest items (200 rows)
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
  title: 'Comprehensive Calibrated Study Plan',
  day1: {
    title: 'Day 1: Foundations & Core Mechanics',
    blocks: [
      {
        block: 1,
        time: '90 min',
        section: 'A',
        topic: 'Classes, Constructors, Encapsulation, Inheritance',
        focus: 'Spot-error drills (Q001-Q020, Q101-Q120)'
      },
      {
        block: 2,
        time: '70 min',
        section: 'B',
        topic: 'Abstract Classes, Interfaces, Polymorphism, Modifiers',
        focus: 'Modifiers and interface contracts (Q021-Q035, Q121-Q135)'
      },
      {
        block: 3,
        time: '90 min',
        section: 'E',
        topic: 'Arrays, Recursion, Sorting, Searching',
        focus: 'Core algorithm coding (Q061-Q072, Q161-Q172)'
      },
      {
        block: 4,
        time: '30 min',
        section: 'H',
        topic: 'Trace the Output (Part 1)',
        focus: 'String immutability, constructors & static blocks (Q086-Q090, Q186-Q190)'
      }
    ]
  },
  day2: {
    title: 'Day 2: Exam Style, Advanced GUI & Synthesis',
    blocks: [
      {
        block: 1,
        time: '60 min',
        section: 'C',
        topic: 'ArrayList & Exception Handling',
        focus: 'Validation, custom exceptions & collections (Q036-Q047, Q136-Q147)'
      },
      {
        block: 2,
        time: '70 min',
        section: 'D',
        topic: 'Swing GUI & Events',
        focus: 'Window builders, event wiring & validation (Q048-Q060, Q148-Q160)'
      },
      {
        block: 3,
        time: '50 min',
        section: 'F',
        topic: 'OOP Class Design',
        focus: 'Polymorphic payroll, payments & hierarchies (Q073-Q080, Q173-Q180)'
      },
      {
        block: 4,
        time: '45 min',
        section: 'G',
        topic: 'ArrayList, Exceptions & Swing Programs',
        focus: 'Full program integration (Q081-Q085, Q181-Q185)'
      },
      {
        block: 5,
        time: '35 min',
        section: 'I',
        topic: 'Debug, then Extend',
        focus: 'Fix bugs and implement extensions (Q096-Q100, Q196-Q200)'
      },
      {
        block: 6,
        time: '25 min',
        section: 'H',
        topic: 'Trace the Output (Part 2)',
        focus: 'Dynamic dispatch, try-finally & remove(int) (Q091-Q095, Q191-Q195)'
      }
    ]
  }
};

const metaData = {
  version: '2.0.0',
  totalQuestions: publicQuestions.length,
  totalPoints: publicQuestions.reduce((s, q) => s + q.points, 0),
  generatedAt: new Date().toISOString(),
  sections,
  mock_papers: mockPapers,
  study_order: studyOrder,
  manifest
};

// Write output JSON files
fs.writeFileSync(path.join(dataDir, 'questions.public.json'), JSON.stringify(publicQuestions, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'answers.private.json'), JSON.stringify(privateAnswers, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'meta.json'), JSON.stringify(metaData, null, 2), 'utf-8');

console.log('Successfully generated:');
console.log(' - data/questions.public.json (' + publicQuestions.length + ' questions)');
console.log(' - data/answers.private.json (' + Object.keys(privateAnswers).length + ' answers)');
console.log(' - data/meta.json (' + sections.length + ' sections, ' + mockPapers.length + ' mock papers)');
console.log('Validation passed: 200 questions, section distribution verified, all mock references verified.');
