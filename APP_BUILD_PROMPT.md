# COS 202 Java Exam-Prep Web App — Full Coding Agent Build Specification

You are an expert full-stack engineer building a high-performance, mobile-first exam preparation web application for **COS 202 (Advanced Object-Oriented Programming in Java)** students at the **University of Ibadan, Faculty of Computing**.

The application serves preset, authentic practical Java exam questions from `QUESTION_BANK.md` and provides strict, instantaneous AI-powered grading of student code and error identification using a resilient server-side Groq API key pool.

Follow this specification strictly from start to finish.

---

## 1. Core Architecture & Philosophy

1. **Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React icons.
2. **Zero Database / Zero Auth Library**:
   - No Prisma, No ORM, No Supabase, No NextAuth/Clerk.
   - Server persistence is strictly JSON-based files stored in `data/`.
   - Client persistence lives exclusively in the browser's `localStorage`.
   - Student identity is device-local: the student enters their name once, generating a persistent UUID (`clientId`) in `localStorage`.
3. **Question Immutability & Token Economy**:
   - **Never generate questions via AI.** All questions are pre-compiled and served statically from parsed JSON files generated from `QUESTION_BANK.md`.
   - AI is used solely for **answer grading** on demand.
   - A free "Self-Check" mode reveals the official answer key and reference solution after submission or without using AI tokens.
4. **Network & Deployment Model**:
   - **Local LAN Host**: The student runs the app on their laptop (`npm run start -- -H 0.0.0.0 -p 3000`) so classmates on the same Wi-Fi or mobile hotspot can access it seamlessly.
   - **Vercel / Cloud Compatibility**: Vercel has an ephemeral read-only filesystem where server writes to `data/keys.json` or `data/usage.json` will not persist across serverless invocations. The app must detect this environment or fallback gracefully to read Groq API keys from the `GROQ_API_KEYS` environment variable (comma-separated).
5. **Mobile-First UX**:
   - The primary viewport is a 375px mobile screen. Monospace code blocks must have smooth horizontal scrolling, line numbers, and clean copy buttons.

---

## 2. Directory Structure

```text
├── .env.local                 # ADMIN_PASSCODE=..., GROQ_API_KEYS=... (optional fallback)
├── config/
│   └── models.json            # Model ranking and rate-limit configuration
├── data/                      # Server-side JSON storage (gitignored except .gitkeep)
│   ├── questions.public.json  # Sanitized questions sent to client
│   ├── answers.private.json   # Private answer keys and rubrics (SERVER-ONLY)
│   ├── meta.json              # Sections, study order, manifest, mocks
│   ├── keys.json              # Managed Groq API keys (gitignored)
│   ├── grade-cache.json       # SHA-256 hash -> cached grading evaluations
│   └── usage.json             # Request & token counters per key/model
├── scripts/
│   └── build-data.mjs         # Node parser to compile QUESTION_BANK.md -> JSON
├── src/
│   ├── app/
│   │   ├── admin/             # Admin console for key pool & configuration
│   │   ├── api/
│   │   │   ├── admin/         # Key management, limits, test key
│   │   │   ├── grade/         # POST /api/grade (AI evaluation)
│   │   │   ├── meta/          # Meta configuration, sections, mocks
│   │   │   ├── questions/     # Public questions endpoint
│   │   │   └── solution/[id]/ # Fetch private reference solution (self-check / post-grade)
│   │   ├── mock/              # Mock exam portal and mock runner (/mock, /mock/[n])
│   │   ├── q/[id]/            # Individual question solver & grader view
│   │   ├── section/[code]/    # Section questions list
│   │   ├── layout.tsx
│   │   └── page.tsx           # Student Dashboard
│   ├── components/            # UI components (CodeViewer, ResultCard, Timer, etc.)
│   └── lib/                   # groqPool.ts, gradingCache.ts, storage.ts, rateLimiter.ts
└── QUESTION_BANK.md           # The primary 100-question master dataset
```

---

## 3. Data Pipeline (`scripts/build-data.mjs`)

Create `scripts/build-data.mjs` executable via `npm run build:data`. This script parses `QUESTION_BANK.md` into three JSON files in `data/`:

### 3.1 Parsed Output Files
1. **`data/questions.public.json`**:
   Array of questions with public fields only:
   `id`, `section`, `type`, `difficulty`, `topic`, `points`, `time_minutes`, `source`, `error_header`, `task`, `code`.
   *(Never contains `answer_key`, `reference_solution`, `rubric`, or `common_mistakes`)*.
2. **`data/answers.private.json`**:
   Map of `id` -> `{ answer_key, reference_solution, rubric, common_mistakes }`.
   **CRITICAL SECURITY RULE: This file must never be imported into client components or served through public bundle chunks.**
3. **`data/meta.json`**:
   Contains `sections`, `manifest` (100 rows), `study_order`, and `mock_papers`.

### 3.2 Strict Parsing Validation Rules
The build script must fail with `process.exit(1)` and print descriptive error messages if:
- Total questions != 100.
- Any ID is duplicated or missing from the range `Q001` through `Q100`.
- Section counts deviate from the syllabus:
  - Section A: 20
  - Section B: 15
  - Section C: 12
  - Section D: 13
  - Section E: 12
  - Section F: 8
  - Section G: 5
  - Section H: 10
  - Section I: 5
- Any question of type `spot-error` or `debug-extend` lacks an `error_header`.
- Any referenced question ID in `mock_papers` does not exist in the bank.

---

## 4. Groq Key Pool Engine (`src/lib/groqPool.ts`)

The key pool connects to Groq's OpenAI-compatible completions endpoint:
`https://api.groq.com/openai/v1/chat/completions` using native `fetch` (no external SDK).

### 4.1 Configuration: `config/models.json`
```json
{
  "modelPriority": [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b"
  ],
  "defaultLimits": {
    "rpm": 30,
    "rpd": 1000,
    "tpm": 8000,
    "tpd": 200000
  },
  "maxConcurrentRequests": 6,
  "queueTimeoutMs": 60000,
  "dailyStudentCap": 30,
  "gradingPaused": false
}
```
*Note: Per user requirement, use only OpenAI's models (`openai/gpt-oss-120b` prioritized first, falling back to `openai/gpt-oss-20b` when rate-limited or cooling down).*

### 4.2 Key Selection & Health Lifecycle
Each key in memory (and persisted to `data/keys.json`) maintains:
```typescript
interface GroqKeyRecord {
  id: string;              // uuid or hash
  key: string;             // gsk_...
  label?: string;          // e.g. "Personal Key 1"
  status: 'active' | 'cooldown' | 'invalid' | 'disabled';
  cooldownUntil?: number;  // timestamp ms
  lastError?: string;
  usageToday: {
    [model: string]: { requests: number; tokens: number };
  };
  slidingWindowTokens: { timestamp: number; tokens: number }[];
}
```

**Selection Algorithm**:
1. Filter enabled keys where `status === 'active'` (or cooldown expired).
2. For each key, compute estimated TPM usage over the last 60 seconds.
3. Exclude keys exceeding 80% of configured TPM or RPM.
4. Pick the key with the lowest token usage in the current sliding window.
5. If no active key is available for the current model, step down to the next model in `modelPriority`.

**Error Handling**:
- **429 (Rate Limit)**:
  - Parse `retry-after` header or default to 60 seconds.
  - If `retry-after` > 900 seconds (15 mins), the daily quota (RPD/TPD) has been reached: mark key cooling down until midnight UTC.
  - Immediately retry the request with the next available key or model.
- **401 / 403 (Invalid Auth)**:
  - Mark key `status: 'invalid'`. Disable it immediately.
- **5xx / Network Error**:
  - Retry once. If failed, cycle to another key.
- **Overall Deadline**: If no key succeeds within 45 seconds, reject with HTTP 503 and return `{ error: "Grader busy. Please try again in a few moments or use Self-Check.", retryAfterSeconds: 30 }`.

### 4.3 Atomic File Persistence & Concurrency
- Provide atomic JSON file writes (write to `.tmp` file then `fs.renameSync`) to eliminate corruption during concurrent class submissions.
- Periodic usage flush to `data/usage.json` every 10 seconds and on `process.on('SIGINT')`.

---

## 5. Grading API (`POST /api/grade`)

### 5.1 Request Pipeline
Body: `{ clientId: string, questionId: string, answer: string }`

1. **Input Validation**:
   - `answer` must be a trimmed non-empty string <= 8,000 characters.
   - `questionId` must exist in `answers.private.json`.
   - `clientId` must be present.
2. **Grading Pause Check**: If `gradingPaused: true` in config, return HTTP 503.
3. **Exact Cache Lookup**:
   - Compute `hash = sha256(questionId + "::" + normalizeAnswer(answer))` where `normalizeAnswer` trims lines and collapses whitespace.
   - If cache hit exists in `data/grade-cache.json`, return it immediately with `cached: true`. **Cached evaluations do not count toward the daily limit.**
4. **Student Daily Limit**:
   - Enforce server-side limit (`dailyStudentCap`, default 30).
   - If exceeded, return HTTP 429: `{ error: "Daily grading quota reached (30/30). You can still view official solutions using Self-Check." }`.
5. **AI Evaluation Request**:
   - Construct prompt using the official Question Task, Provided Code, Private Answer Key, Rubric, and Student Answer.
   - Call Groq Key Pool with `temperature: 0`, `max_tokens: 1000`.
   - For `gpt-oss` models, pass `reasoning_effort: "low"`. If rejected with HTTP 400, immediately retry without `reasoning_effort`.
6. **Output Parsing & Sanitization**:
   - Strip markdown markdown fences (````json ... ````) if present.
   - If JSON parse fails, retry once with a corrective system prompt nudge.
   - Clamp final score between `0` and `question.points`.
   - Save to `data/grade-cache.json`.
   - Return `{ score, max, items, summary, model, cached: false }`.

### 5.2 Exact Grader System Prompt
```text
You are an expert, strict, and impartial Java university examiner grading a practical exam submission for COS 202 (Advanced OOP in Java) at the University of Ibadan.

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
}
```

---

## 6. Student UI & Pages

### 6.1 Dashboard (`/`)
- **Hero & Identity**: Student name badge (editable), Client ID display, Daily AI calls remaining counter.
- **Overall Readiness**: Radial gauge or prominent percentage of completed and mastered questions.
- **Progress Matrix**:
  - By Section (A through I) with progress bars, attempted counts, and average scores.
  - By Difficulty (Easy, Medium, Hard).
- **Adaptive Recommendations**: "Next Recommended Question" button based on unattempted questions or low-scoring topics.
- **Weak Topics Analysis**: Displays the bottom 3 topics where the student scored < 60%.
- **Data Management**: Export Progress to JSON, Import Progress, Reset All Data.
- **Mock Exam Launchpad**: Direct entry into Mock Exams 1, 2, and 3.

### 6.2 Question Page (`/q/[id]`)
- **Header**: Breadcrumbs, Question ID, Section title, Difficulty chip (Green=Easy, Amber=Medium, Rose=Hard), Points, Estimated Time.
- **Error Header Callout**: For `spot-error` and `debug-extend`, display the lecturer's count prominently (e.g., `3 errors (2 syntax, 1 semantic)`).
- **Code Viewer**:
  - Monospace font with crisp line numbers starting at 1.
  - Horizontal scroll with line-highlight on hover.
  - "Copy Code" button.
- **Monospace Answer Area**:
  - Code-friendly `<textarea>` with Tab key indentation (inserts 4 spaces).
  - Real-time autosave to `localStorage` (key: `draft_[id]`).
  - Character counter with 8,000 max limit.
- **Action Buttons**:
  - `Submit for AI Grading`: Disabled while pending, animated loading state ("Evaluating syntax & semantics...").
  - `Self-Check (Reveal Solution)`: Free instant check. Fetches from `/api/solution/[id]`, marks question as `selfChecked`, costs 0 AI tokens.
- **Grading Result Card**:
  - Score badge (e.g., `3.0 / 4.0 pts`).
  - Itemized checklist with checkmarks/crosses and concise feedback.
  - AI examiner summary.
  - "Try Again" button to re-attempt and improve score.
- **Navigation Bar**: Quick `Previous` and `Next` question buttons within the section.

### 6.3 Mock Exam Portal (`/mock` and `/mock/[n]`)
- Simulated exam experience matching the actual 05 October 2026 UI COS 202 test paper structure:
  - **Part 1**: 5 Spot-Error questions (Student Records domain).
  - **Part 2**: 4 Spot-Error questions (Payment Processing & Swing GUI domain).
  - **Part 3**: 1 Comprehensive Write-Code / Debug-Extend question.
- **Persistent Countdown Timer**:
  - Configurable duration (e.g., 90 minutes).
  - Stored in `localStorage` so refreshing or accidental tab closure does not reset the clock.
- **Batch Grading Flow**:
  - "Submit Exam" triggers batch evaluation with a concurrency limiter (max 2 parallel requests in flight) to protect rate limits.
  - Live progress bar: "Grading question 4 of 10...".
  - Full report sheet showing breakdown by Part 1, Part 2, and Part 3, final percentage, and option to re-grade any individual question that failed.

---

## 7. Admin Console (`/admin`)

- **Security**: Protected by `ADMIN_PASSCODE` set in `.env.local`. Verified via cookie or bearer token.
- **Bulk Key Ingestion**: Textarea to paste multiple Groq API keys (one per line) with optional labels.
- **Live Key Dashboard**:
  - Masked key display (e.g., `gsk_a8B9...9xK2`).
  - Status indicator: `Active`, `Cooldown (until HH:mm:ss)`, `Invalid`, `Disabled`.
  - Today's request & token counters per key per model.
  - Real-time "Test Key" action that executes a 5-token ping to Groq.
- **System Controls**:
  - Reorder model priority list.
  - Edit RPM, TPM, and daily caps.
  - Master switch: "Pause AI Grading" (forces students into self-check mode).
  - Cache statistics (total cached submissions, cache hit rate, "Clear Cache" button).

---

## 8. Robustness & Local Hosting Instructions

Include a comprehensive `README.md` instructing how to:
1. Run `npm install` and `npm run build:data` to verify the 100 questions.
2. Launch on LAN: `npm run start -- -H 0.0.0.0 -p 3000`.
3. Configure Windows Firewall to allow port 3000 on private networks.
4. Set up an optional free Cloudflare Tunnel (`cloudflared tunnel --url http://localhost:3000`) for classmates joining over cellular data without hotspot sharing.
5. Deploy to Vercel with `GROQ_API_KEYS=key1,key2,key3` environment variable.
