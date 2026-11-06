import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatStudentRegistrationForSheet,
  syncStudentRegistrationToGoogleSheets,
  setGoogleSheetsWebhookUrl,
  getGoogleSheetsWebhookUrl,
  isGoogleSheetsConfigured
} from '../../src/services/googleSheetsService.ts';
import type { StudentRegistrationFormValues } from '../../src/types/forms.ts';

describe('Unit: Google Sheets & Drive Excel Integration', () => {
  const sampleStudentPayload: StudentRegistrationFormValues = {
    teamName: 'Poly AI Innovators',
    teamSize: '3',
    fullName: 'Nguyễn Văn An',
    studentId: 'PH12345',
    email: 'annvph12345@fpt.edu.vn',
    phone: '0987654321',
    majorClass: 'WD18301 - Lập trình Web (Kỳ 4)',
    domainInterest: 'workflow-automation',
    members: [
      { fullName: 'Trần Thị Bình', studentId: 'PH23456' },
      { fullName: 'Lê Văn Cường', studentId: 'PH34567' }
    ]
  };

  it('correctly maps 3-member team into Google Sheet row format', () => {
    const row = formatStudentRegistrationForSheet(sampleStudentPayload, {
      registrationId: 'AIC-STU-TEST-001',
      fullName: sampleStudentPayload.fullName,
      teamName: sampleStudentPayload.teamName,
      registeredAt: new Date().toISOString()
    });

    assert.equal(row.registrationId, 'AIC-STU-TEST-001');
    assert.equal(row.teamName, 'Poly AI Innovators');
    assert.equal(row.teamSize, '3 thành viên');
    assert.equal(row.leaderName, 'Nguyễn Văn An');
    assert.equal(row.leaderStudentId, 'PH12345');
    assert.equal(row.leaderEmail, 'annvph12345@fpt.edu.vn');
    assert.equal(row.leaderPhone, '0987654321');
    assert.equal(row.majorClass, 'WD18301 - Lập trình Web (Kỳ 4)');
    assert.equal(row.member2Name, 'Trần Thị Bình');
    assert.equal(row.member2StudentId, 'PH23456');
    assert.equal(row.member3Name, 'Lê Văn Cường');
    assert.equal(row.member3StudentId, 'PH34567');
    assert.equal(row.member4Name, '');
    assert.equal(row.member4StudentId, '');
    assert.equal(row.status, 'Đã tiếp nhận');
    assert.ok(row.timestamp.length > 0);
  });

  it('correctly maps 4-member team with member 4 into row format', () => {
    const fourMemberPayload: StudentRegistrationFormValues = {
      ...sampleStudentPayload,
      teamSize: '4',
      members: [
        { fullName: 'Trần Thị Bình', studentId: 'ph23456' },
        { fullName: 'Lê Văn Cường', studentId: 'ph34567' },
        { fullName: 'Phạm Thị Dung', studentId: 'ph45678' }
      ]
    };

    const row = formatStudentRegistrationForSheet(fourMemberPayload);
    assert.equal(row.teamSize, '4 thành viên');
    assert.equal(row.member2StudentId, 'PH23456');
    assert.equal(row.member3StudentId, 'PH34567');
    assert.equal(row.member4Name, 'Phạm Thị Dung');
    assert.equal(row.member4StudentId, 'PH45678');
  });

  it('handles sync gracefully when webhook URL is not yet configured', async () => {
    // In node environment without configured URL
    const result = await syncStudentRegistrationToGoogleSheets(sampleStudentPayload);
    assert.equal(result.success, true);
    assert.equal(result.syncedToCloud, false);
    assert.match(result.message, /Đã lưu đăng ký cục bộ/);
  });
});
