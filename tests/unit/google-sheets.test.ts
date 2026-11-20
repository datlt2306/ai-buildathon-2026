import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatStudentRegistrationForSheet,
  formatPhase1SubmissionForSheet,
  syncStudentRegistrationToGoogleSheets,
  syncPhase1SubmissionToGoogleSheets,
  setGoogleSheetsWebhookUrl,
  getGoogleSheetsWebhookUrl,
  isGoogleSheetsConfigured
} from '../../src/services/googleSheetsService.ts';
import type { StudentRegistrationFormValues, Phase1SubmissionFormValues } from '../../src/types/forms.ts';

describe('Unit: Google Sheets & Drive Excel Integration', () => {
  const sampleStudentPayload: StudentRegistrationFormValues = {
    teamName: 'Poly AI Innovators',
    teamSize: '3',
    mentor: 'Hoàng Nhật Minh - Minhnh31',
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
    assert.equal(row.mentor, 'Hoàng Nhật Minh - Minhnh31');
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

  it('correctly maps individual registration (1 member) into row format', () => {
    const individualPayload: StudentRegistrationFormValues = {
      teamName: 'Thí sinh tự do - Nguyễn Văn An',
      teamSize: '1',
      mentor: 'BTC hỗ trợ điều phối Mentor',
      fullName: 'Nguyễn Văn An',
      studentId: 'PH12345',
      email: 'annvph12345@fpt.edu.vn',
      phone: '0987654321',
      majorClass: 'WD18301 - Lập trình Web (Kỳ 4)',
      domainInterest: 'workflow-automation',
      members: []
    };

    const row = formatStudentRegistrationForSheet(individualPayload);
    assert.equal(row.teamSize, '1 thành viên');
    assert.equal(row.teamName, 'Thí sinh tự do - Nguyễn Văn An');
    assert.equal(row.leaderName, 'Nguyễn Văn An');
    assert.equal(row.leaderStudentId, 'PH12345');
    assert.equal(row.member2Name, '');
    assert.equal(row.member2StudentId, '');
    assert.equal(row.member3Name, '');
    assert.equal(row.member3StudentId, '');
    assert.equal(row.member4Name, '');
    assert.equal(row.member4StudentId, '');
    assert.equal(row.status, 'Đã tiếp nhận');
  });

  it('handles sync gracefully when webhook URL is not yet configured', async () => {
    setGoogleSheetsWebhookUrl('');
    const result = await syncStudentRegistrationToGoogleSheets(sampleStudentPayload);
    assert.equal(result.success, true);
    assert.equal(result.syncedToCloud, false);
    assert.match(result.message, /Đã lưu đăng ký cục bộ/);
    setGoogleSheetsWebhookUrl(null as any);
  });

  it('correctly maps Phase 1 submission into Sheet payload format', () => {
    const phase1Payload: Phase1SubmissionFormValues = {
      studentId: 'PH12345',
      email: 'annvph12345@fpt.edu.vn',
      teamName: 'Team AI Builders',
      leaderName: 'Nguyễn Văn An',
      phone: '0987654321',
      mentor: 'Thầy Hoàng Nhật Minh',
      registrationType: 'team',
      registrationId: 'AIC-STU-PH12345',
      projectTitle: 'Trợ lý AI tra cứu nội quy & chính sách HR',
      pitchDeckUrl: 'https://docs.google.com/presentation/d/sample',
      videoUrl: 'https://youtu.be/sample123',
      summaryDescription: 'Ứng dụng AI Gemini Flash hỗ trợ nhân viên tra cứu sổ tay nội bộ tức thì.',
      confirmedShareAccess: true,
    };

    const payload = formatPhase1SubmissionForSheet(phase1Payload);
    assert.equal(payload.action, 'submitPhase1');
    assert.equal(payload.studentId, 'PH12345');
    assert.equal(payload.email, 'annvph12345@fpt.edu.vn');
    assert.equal(payload.teamName, 'Team AI Builders');
    assert.equal(payload.registrationType, 'Đội thi');
    assert.equal(payload.projectTitle, 'Trợ lý AI tra cứu nội quy & chính sách HR');
    assert.equal(payload.pitchDeckUrl, 'https://docs.google.com/presentation/d/sample');
    assert.equal(payload.videoUrl, 'https://youtu.be/sample123');
    assert.ok(payload.timestamp.length > 0);
  });
});
