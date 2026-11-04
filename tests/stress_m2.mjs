/**
 * Empirical Stress Test Harness for Milestone 2
 * Developed by Teamwork Challenger (critic, specialist)
 * Tests Validation Engine & Mock API Service thoroughly.
 */

import { performance } from 'node:perf_hooks';
import {
  VN_PHONE_REGEX,
  RFC_EMAIL_REGEX,
  cleanPhoneNumber,
  validateVietnamesePhone,
  validateEmail,
  validateRequired,
  validateTeamSize,
  validateStudentForm,
  validateBusinessForm,
  validateEducationForm,
} from '../src/services/validation.ts';

import {
  MockRegistrationService,
  STORAGE_KEYS,
  DEFAULT_MOCK_LATENCY_MS,
} from '../src/services/mockApiService.ts';

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passCount++;
  } else {
    failCount++;
    failures.push(message);
    console.error(`  ❌ FAILED: ${message}`);
  }
}

console.log('='.repeat(70));
console.log('🧪 EMPIRICAL CHALLENGER: M2 STRESS TEST HARNESS');
console.log('='.repeat(70));

// ============================================================================
// SUITE 1: Vietnamese Phone Carrier Prefix Stress Test
// ============================================================================
console.log('\n--- SUITE 1: VIETNAMESE PHONE CARRIER PREFIXES ---');

// All standard 10-digit carrier prefixes in Vietnam:
// Viettel: 032, 033, 034, 035, 036, 037, 038, 039 (086, 096, 097, 098)
// Vietnamobile: 052, 056, 058, 059 (092)
// MobiFone: 070, 076, 077, 078, 079 (089, 090, 093)
// Vinaphone: 081, 082, 083, 084, 085, 088 (091, 094)
// Wintel / I-Telecom: 087
// Gmobile: 099
const carrierPrefixes = [
  // 032-039 (Viettel)
  '032', '033', '034', '035', '036', '037', '038', '039',
  // 056-059 & 052, 058 (Vietnamobile)
  '052', '056', '058', '059',
  // 070-079 (MobiFone)
  '070', '076', '077', '078', '079',
  // 081-089 (Vinaphone, Viettel, Wintel, MobiFone)
  '081', '082', '083', '084', '085', '086', '087', '088', '089',
  // 090-099 (All carriers)
  '090', '091', '092', '093', '094', '095', '096', '097', '098', '099',
];

console.log(`Testing ${carrierPrefixes.length} carrier prefixes across 3 format variations (0, +84, 84)...`);

for (const prefix of carrierPrefixes) {
  const restOfDigits = '1234567'; // 7 digits, making prefix (3 digits) + 7 = 10 digits
  const standardPhone = `${prefix}${restOfDigits}`;
  assert(
    validateVietnamesePhone(standardPhone) === null,
    `Prefix ${prefix} standard format (${standardPhone}) should be VALID`
  );

  // +84 format (replaces initial 0)
  const plus84Prefix = `+84${prefix.slice(1)}`;
  const plus84Phone = `${plus84Prefix}${restOfDigits}`;
  assert(
    validateVietnamesePhone(plus84Phone) === null,
    `Prefix ${prefix} +84 format (${plus84Phone}) should be VALID`
  );

  // 84 format (no plus)
  const plain84Prefix = `84${prefix.slice(1)}`;
  const plain84Phone = `${plain84Prefix}${restOfDigits}`;
  assert(
    validateVietnamesePhone(plain84Phone) === null,
    `Prefix ${prefix} 84 format (${plain84Phone}) should be VALID`
  );
}

// Formatting variations with delimiters
const formattedPhones = [
  '0912 345 678',
  '0912-345-678',
  '0912.345.678',
  '(0912) 345 678',
  '+84 912 345 678',
  '+84-912-345-678',
  '+84 (912) 345 678',
  '84 912 345 678',
  '84-912-345-678',
];
for (const phone of formattedPhones) {
  assert(
    validateVietnamesePhone(phone) === null,
    `Formatted phone '${phone}' should be VALID`
  );
}

// Invalid phone numbers
const invalidPhoneCases = [
  { val: '', reason: 'Empty string' },
  { val: '   ', reason: 'Whitespace' },
  { val: null, reason: 'null' },
  { val: undefined, reason: 'undefined' },
  { val: '0123456789', reason: 'Old 01 prefix (deprecated)' },
  { val: '01681234567', reason: 'Old 11-digit Viettel' },
  { val: '0241234567', reason: '024 landline (Hanoi)' },
  { val: '0281234567', reason: '028 landline (HCMC)' },
  { val: '0412345678', reason: '04 prefix' },
  { val: '0612345678', reason: '06 prefix' },
  { val: '0012345678', reason: '00 prefix' },
  { val: '1234567890', reason: 'Missing 0/+84/84 prefix' },
  { val: '091234567', reason: '9 digits (too short)' },
  { val: '09123456789', reason: '11 digits (too long)' },
  { val: '091234567890', reason: '12 digits (too long)' },
  { val: '091234abcd', reason: 'Contains alphabetic characters' },
  { val: '++84912345678', reason: 'Double plus prefix' },
  { val: '+840912345678', reason: '+84 followed by redundant 0' },
  { val: '+85912345678', reason: 'Wrong country code (+85)' },
  { val: '<script>alert(1)</script>', reason: 'XSS payload' },
  { val: "0912345678' OR '1'='1", reason: 'SQL injection payload' },
];
for (const item of invalidPhoneCases) {
  assert(
    validateVietnamesePhone(item.val) !== null,
    `Invalid phone '${item.val}' (${item.reason}) should be REJECTED`
  );
}

// ============================================================================
// SUITE 2: RFC Email Validation Stress Test
// ============================================================================
console.log('\n--- SUITE 2: RFC EMAIL VALIDATION STRESS TEST ---');

const validEmails = [
  'simple@example.com',
  'very.common@example.com',
  'disposable.style.email.with+symbol@example.com',
  'other.email-with-hyphen@example.com',
  'fully-qualified-domain@example.com',
  'user.name+tag+sorting@example.com',
  'x@example.com',
  'example-indeed@strange-example.com',
  'admin@mailserver1.domain.org',
  'student@hcmut.edu.vn',
  'teacher@neu.edu.vn',
  'innovator@startup.ai',
  'founder@venture.io',
  'contact@fpt.com.vn',
  'user_name@domain.co.uk',
  '123456@domain.com',
  'user@subdomain.example.com',
];
for (const email of validEmails) {
  assert(
    validateEmail(email) === null,
    `Valid email '${email}' should PASS`
  );
}

const invalidEmails = [
  { val: '', reason: 'Empty string' },
  { val: '   ', reason: 'Whitespace' },
  { val: null, reason: 'null' },
  { val: undefined, reason: 'undefined' },
  { val: 'plainaddress', reason: 'No @ symbol' },
  { val: '@missing-local.org', reason: 'Missing local part' },
  { val: 'missing-domain@', reason: 'Missing domain part' },
  { val: 'missing-tld@domain', reason: 'Missing TLD' },
  { val: 'trailing-dot@domain.', reason: 'Trailing dot in domain' },
  { val: 'leading-dot@.domain.com', reason: 'Leading dot in domain' },
  { val: 'email with spaces@domain.com', reason: 'Spaces in local part' },
  { val: 'email@domain with space.com', reason: 'Spaces in domain' },
  { val: 'email@domain..com', reason: 'Double dots in domain' },
  { val: 'email@.org', reason: 'Empty domain before dot' },
  { val: '<script>alert(1)</script>@domain.com', reason: 'HTML injection' },
  { val: 'victim@domain.com\nBcc:attacker@evil.com', reason: 'Header injection newline' },
  { val: 'victim@domain.com\r\nBcc:attacker@evil.com', reason: 'CRLF injection' },
];
for (const item of invalidEmails) {
  const result = validateEmail(item.val);
  assert(
    result !== null,
    `Invalid email '${item.val}' (${item.reason}) should be REJECTED`
  );
}

// ReDoS / Catastrophic Backtracking Stress Test
console.log('Testing email regex against catastrophic backtracking (ReDoS)...');
const redosPayloads = [
  'a'.repeat(500) + '@' + 'b'.repeat(500) + '.com',
  'a'.repeat(100) + '!' + '@' + 'b'.repeat(100) + '.com',
  'user@' + 'a-'.repeat(50) + 'xyz.com',
  'user@' + 'a.'.repeat(50) + 'com',
];
for (const payload of redosPayloads) {
  const start = performance.now();
  validateEmail(payload);
  const elapsed = performance.now() - start;
  assert(
    elapsed < 50,
    `ReDoS protection: '${payload.slice(0, 30)}...' evaluated in ${elapsed.toFixed(2)}ms (< 50ms)`
  );
}

// ============================================================================
// SUITE 3: Team Size Boundary Stress Test
// ============================================================================
console.log('\n--- SUITE 3: TEAM SIZE BOUNDARY STRESS TEST ---');

// Valid cases: 1 to 5 members
const validTeamSizes = [1, 2, 3, 4, 5, '1', '2', '3', '4', '5'];
for (const size of validTeamSizes) {
  assert(
    validateTeamSize(size) === null,
    `Team size ${JSON.stringify(size)} should be VALID (1-5 members)`
  );
}

// Invalid cases
const invalidTeamSizes = [
  { val: 0, label: '0 (zero)' },
  { val: '0', label: "'0' (string zero)" },
  { val: 6, label: '6 (above max)' },
  { val: '6', label: "'6' (string 6)" },
  { val: -1, label: '-1 (negative)' },
  { val: '-5', label: "'-5' (string negative)" },
  { val: 100, label: '100' },
  { val: NaN, label: 'NaN' },
  { val: 'NaN', label: "'NaN' string" },
  { val: null, label: 'null' },
  { val: undefined, label: 'undefined' },
  { val: '', label: 'empty string' },
  { val: '   ', label: 'whitespace' },
  { val: 'abc', label: 'alphabetic string' },
  { val: true, label: 'boolean true' },
  { val: false, label: 'boolean false' },
];

for (const item of invalidTeamSizes) {
  assert(
    validateTeamSize(item.val) !== null,
    `Invalid team size ${item.label} (${JSON.stringify(item.val)}) should be REJECTED`
  );
}

// ============================================================================
// SUITE 4: Mock API Service Async Latency, Persistence & Error Handling
// ============================================================================
console.log('\n--- SUITE 4: MOCK API SERVICE STRESS TEST ---');

async function run() {
  // Test 1: Configurable Latency Timing
  console.log('Testing simulated latency precision...');
  const service = new MockRegistrationService(150);
  assert(service.getLatency() === 150, 'Latency getter returns set value (150ms)');

  const validStudentPayload = {
    fullName: 'Trần Văn An',
    email: 'tran.an@university.edu.vn',
    phoneNumber: '0912345678',
    studentId: 'B21DCCN001',
    majorClass: 'D21CNPM1',
    teamName: 'AI Pioneers',
    teamSize: '3',
    domainInterest: 'workflow-automation',
  };

  // Measure 150ms latency
  let t0 = performance.now();
  await service.registerStudent(validStudentPayload);
  let elapsed = performance.now() - t0;
  assert(
    elapsed >= 140 && elapsed <= 350,
    `Simulated latency of 150ms executed in ${elapsed.toFixed(1)}ms`
  );

  // Measure 0ms latency
  service.setLatency(0);
  t0 = performance.now();
  await service.registerStudent(validStudentPayload);
  elapsed = performance.now() - t0;
  assert(
    elapsed < 50,
    `Simulated latency of 0ms executed in ${elapsed.toFixed(1)}ms`
  );

  // Test 2: Dual-Key LocalStorage Persistence
  console.log('Testing dual-key persistence with mock localStorage...');
  const mockStorage = {};
  globalThis.window = {
    localStorage: {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, val) => {
        mockStorage[key] = String(val);
      },
      removeItem: (key) => {
        delete mockStorage[key];
      },
      clear: () => {
        Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
      },
    },
  };

  // Clear storage
  window.localStorage.clear();

  // Submit student
  const studentRes = await service.registerStudent(validStudentPayload);
  assert(studentRes.success === true, 'Student registration returns success: true');
  assert(
    typeof studentRes.data?.registrationId === 'string' &&
      studentRes.data.registrationId.startsWith('AIC-STU-'),
    `Student registrationId generated with prefix AIC-STU-: ${studentRes.data?.registrationId}`
  );

  // Verify Dual-Key storage for student
  const storedStudentsPrimary = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.students) || '[]'
  );
  const storedStudentsAlias = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.studentsAlias) || '[]'
  );
  assert(
    Array.isArray(storedStudentsPrimary) && storedStudentsPrimary.length === 1,
    `Primary key '${STORAGE_KEYS.students}' contains 1 record`
  );
  assert(
    Array.isArray(storedStudentsAlias) && storedStudentsAlias.length === 1,
    `Alias key '${STORAGE_KEYS.studentsAlias}' contains 1 record`
  );
  assert(
    storedStudentsPrimary[0].registrationId === studentRes.data.registrationId,
    'Stored record contains matching registrationId'
  );
  assert(
    storedStudentsPrimary[0].confirmationCode === studentRes.data.registrationId,
    'Stored record contains matching confirmationCode'
  );

  // Submit Business Partnership
  const validBusinessPayload = {
    companyName: 'Công ty Cổ phần Trí Tuệ Nhân Tạo Á Châu',
    contactPerson: 'Nguyễn Thị Hương',
    jobTitle: 'Phó Tổng Giám Đốc',
    email: 'huong.nguyen@asia-ai.vn',
    phoneNumber: '0988776655',
    partnershipType: 'problem-provider',
    problemDescription: 'Tự động hóa phân loại hồ sơ vay vốn doanh nghiệp vừa và nhỏ.',
  };
  const bizRes = await service.submitBusinessPartnership(validBusinessPayload);
  assert(bizRes.success === true, 'Business submission returns success: true');
  assert(
    typeof bizRes.data?.inquiryId === 'string' &&
      bizRes.data.inquiryId.startsWith('AIC-BIZ-'),
    `Business inquiryId generated with prefix AIC-BIZ-: ${bizRes.data?.inquiryId}`
  );

  // Verify Dual-Key storage for business
  const storedBizPrimary = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.businesses) || '[]'
  );
  const storedBizAlias = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.businessesAlias) || '[]'
  );
  assert(
    Array.isArray(storedBizPrimary) && storedBizPrimary.length === 1,
    `Primary key '${STORAGE_KEYS.businesses}' contains 1 record`
  );
  assert(
    Array.isArray(storedBizAlias) && storedBizAlias.length === 1,
    `Alias key '${STORAGE_KEYS.businessesAlias}' contains 1 record`
  );
  assert(
    storedBizPrimary[0].inquiryId === bizRes.data.inquiryId,
    'Business record contains matching inquiryId'
  );

  // Submit Education Partnership
  const validEduPayload = {
    institutionName: 'Đại học Quốc gia TP.HCM',
    contactPerson: 'PGS. TS. Vũ Đình Bảo',
    email: 'bao.vu@vnuhcm.edu.vn',
    phoneNumber: '0903889900',
    collaborationScope: 'Phối hợp tổ chức vòng sơ khảo và cung cấp hội đồng cố vấn.',
  };
  const eduRes = await service.submitEducationPartnership(validEduPayload);
  assert(eduRes.success === true, 'Education submission returns success: true');
  assert(
    typeof eduRes.data?.partnershipId === 'string' &&
      eduRes.data.partnershipId.startsWith('AIC-EDU-'),
    `Education partnershipId generated with prefix AIC-EDU-: ${eduRes.data?.partnershipId}`
  );
  const storedEdu = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.education) || '[]'
  );
  assert(
    Array.isArray(storedEdu) && storedEdu.length === 1,
    `Education key '${STORAGE_KEYS.education}' contains 1 record`
  );

  // Test 3: Multiple record accumulation
  await service.registerStudent({
    ...validStudentPayload,
    fullName: 'Lê Hoàng Yến',
    studentId: 'B21DCCN002',
  });
  const multiStudents = JSON.parse(
    window.localStorage.getItem(STORAGE_KEYS.students) || '[]'
  );
  assert(
    multiStudents.length === 2,
    `Multiple submissions append to existing array (length: ${multiStudents.length})`
  );

  // Test 4: Corrupted LocalStorage Handling
  console.log('Testing corrupted localStorage recovery...');
  window.localStorage.setItem(STORAGE_KEYS.students, 'INVALID_JSON_CORRUPTED{[[');
  try {
    const corruptedRes = await service.registerStudent({
      ...validStudentPayload,
      fullName: 'Đặng Tuấn Khang',
    });
    assert(
      corruptedRes.success === true,
      'Service survives corrupted localStorage JSON gracefully'
    );
  } catch (e) {
    assert(false, `Service threw unexpected error on corrupted storage: ${e.message}`);
  }

  // Test 5: Validation Error Responses on Invalid Payloads
  console.log('Testing error responses on invalid payloads...');
  const invalidStudentRes = await service.registerStudent({
    fullName: 'A', // too short
    email: 'not-an-email',
    phoneNumber: '0123456789', // deprecated
    studentId: '',
    majorClass: '',
    teamSize: '10', // > 5
    domainInterest: 'non-existent-domain',
  });
  assert(
    invalidStudentRes.success === false,
    'Invalid student payload returns success: false'
  );
  assert(
    invalidStudentRes.error?.code === 'VALIDATION_FAILED',
    `Error code is 'VALIDATION_FAILED' (got '${invalidStudentRes.error?.code}')`
  );
  assert(
    invalidStudentRes.error?.details &&
      Object.keys(invalidStudentRes.error.details).length >= 5,
    `Field error details returned for all invalid fields (${Object.keys(invalidStudentRes.error?.details || {}).join(', ')})`
  );

  const invalidBizRes = await service.submitBusinessPartnership({
    companyName: '',
    contactPerson: '',
    jobTitle: '',
    email: 'bad',
    phoneNumber: '123',
    partnershipType: 'invalid-type',
    problemDescription: 'too short',
  });
  assert(invalidBizRes.success === false, 'Invalid business payload returns success: false');
  assert(invalidBizRes.error?.code === 'VALIDATION_FAILED', 'Business error code is VALIDATION_FAILED');

  const invalidEduRes = await service.submitEducationPartnership({
    institutionName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    collaborationScope: '',
  });
  assert(invalidEduRes.success === false, 'Invalid education payload returns success: false');
  assert(invalidEduRes.error?.code === 'VALIDATION_FAILED', 'Education error code is VALIDATION_FAILED');

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log(`TOTAL ASSERTIONS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log('='.repeat(70));

  if (failCount > 0) {
    console.error('\nFAILURES DETECTED:');
    failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    process.exit(1);
  } else {
    console.log('\n🌟 ALL EMPIRICAL STRESS TESTS PASSED!');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
