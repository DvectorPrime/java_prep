const BASE = 'http://localhost:3000';

async function runTests() {
  console.log('--- Starting COS 202 App End-to-End Verification ---');

  // Test 1: GET /api/questions
  console.log('1. Testing GET /api/questions...');
  const resQ = await fetch(`${BASE}/api/questions`);
  if (!resQ.ok) throw new Error(`Failed /api/questions: ${resQ.status}`);
  const questions = await resQ.json();
  console.log(`   ✓ Received ${questions.length} questions (expected 200).`);
  if (questions.length !== 200) throw new Error('Expected 200 questions');
  if ('answer_key' in questions[0]) throw new Error('Security failure: answer_key found in public questions!');
  console.log('   ✓ Security check passed: no private answer fields in public questions.');

  // Test 2: GET /api/meta
  console.log('2. Testing GET /api/meta...');
  const resMeta = await fetch(`${BASE}/api/meta`);
  if (!resMeta.ok) throw new Error(`Failed /api/meta: ${resMeta.status}`);
  const meta = await resMeta.json();
  console.log(`   ✓ Received meta: ${meta.sections.length} sections, ${meta.mock_papers.length} mock papers (expected 6).`);
  if (meta.mock_papers.length !== 6) throw new Error('Expected 6 mock papers');

  // Test 3: GET /api/solution/Q001 and Q101
  console.log('3. Testing GET /api/solution/Q001 & Q101...');
  const resSol1 = await fetch(`${BASE}/api/solution/Q001`);
  if (!resSol1.ok) throw new Error(`Failed /api/solution/Q001: ${resSol1.status}`);
  const sol1 = await resSol1.json();
  console.log(`   ✓ Solution Q001 loaded: has answer_key (${sol1.answer_key.length} chars)`);

  const resSol2 = await fetch(`${BASE}/api/solution/Q101`);
  if (!resSol2.ok) throw new Error(`Failed /api/solution/Q101: ${resSol2.status}`);
  const sol2 = await resSol2.json();
  console.log(`   ✓ Solution Q101 loaded: has answer_key (${sol2.answer_key.length} chars)`);

  // Test 4: POST /api/grade (Live AI evaluation using Groq Key Pool)
  console.log('4. Testing POST /api/grade with live Groq AI evaluation...');
  const sampleAnswer = `Line 5: syntax error - Constructor name must match class name Book, not book. Fix: public Book(String title, double price) {
Line 15: semantic error - Parameter shadows field. Fix: this.price = price;
Line 19: syntax error - Missing semicolon at end of statement. Fix: return price;`;

  const gradeStart = Date.now();
  const resGrade = await fetch(`${BASE}/api/grade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: 'test-student-e2e',
      questionId: 'Q001',
      answer: sampleAnswer
    })
  });

  if (!resGrade.ok) {
    const errText = await resGrade.text();
    throw new Error(`Failed /api/grade: ${resGrade.status} - ${errText}`);
  }
  const gradeResult = await resGrade.json();
  const durationMs = Date.now() - gradeStart;
  console.log(`   ✓ Live AI Grading Succeeded in ${durationMs}ms!`);
  console.log(`     Model: ${gradeResult.model}, Score: ${gradeResult.score}/${gradeResult.max}, Cached: ${gradeResult.cached}`);
  console.log(`     Summary: ${gradeResult.summary}`);
  console.log(`     Items: ${gradeResult.items.length} criteria evaluated.`);

  // Test 5: Cache hit test
  console.log('5. Testing AI Grading Cache Hit...');
  const cacheStart = Date.now();
  const resCache = await fetch(`${BASE}/api/grade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: 'test-student-e2e',
      questionId: 'Q001',
      answer: sampleAnswer
    })
  });
  const cacheResult = await resCache.json();
  const cacheDurationMs = Date.now() - cacheStart;
  console.log(`   ✓ Cache lookup returned in ${cacheDurationMs}ms (Cached: ${cacheResult.cached})`);
  if (!cacheResult.cached) throw new Error('Expected cached evaluation on identical submission!');

  // Test 6: Admin Auth & Status
  console.log('6. Testing Admin Auth & Status...');
  const resAuth = await fetch(`${BASE}/api/admin/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode: 'admin2026' })
  });
  if (!resAuth.ok) throw new Error('Admin auth failed');
  const authCookie = resAuth.headers.get('set-cookie');
  console.log('   ✓ Admin authenticated successfully.');

  const resAdminStatus = await fetch(`${BASE}/api/admin/status`, {
    headers: {
      'Authorization': 'Bearer admin2026'
    }
  });
  if (!resAdminStatus.ok) throw new Error('Admin status failed');
  const adminData = await resAdminStatus.json();
  console.log(`   ✓ Admin status OK: ${adminData.keys.length} keys in pool, ${adminData.cacheStats.totalEntries} cache entries.`);

  // Test 7: Frontend Page Routes
  console.log('7. Testing Frontend Page Routes...');
  const pages = ['/', '/mock', '/mock/1', '/q/Q001', '/section/A', '/admin'];
  for (const p of pages) {
    const res = await fetch(`${BASE}${p}`);
    if (!res.ok) throw new Error(`Failed to load page ${p}: ${res.status}`);
    console.log(`   ✓ Page ${p} loaded successfully (${res.status} OK)`);
  }

  console.log('\n========================================');
  console.log('🎉 ALL 7 TEST SUITES PASSED FLAWLESSLY!');
  console.log('========================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
