/**
 * Unit Test Suite: Form Validation Engine
 * Verifies client-side validation logic per ORIGINAL_REQUEST.md R2 & PROJECT.md F05
 */

import { describe, it, expect } from '../helpers/compat.ts';
import {
  VALID_PHONES,
  INVALID_PHONES,
  VALID_EMAILS,
  INVALID_EMAILS,
  VALID_STUDENT_DATA,
  VALID_BUSINESS_DATA,
  VALID_EDUCATION_DATA,
} from '../helpers/fixtures.ts';

// Import and re-export pure validation engine implementations directly from src/services/validation.ts
import {
  VN_PHONE_REGEX,
  RFC_EMAIL_REGEX,
  validateVietnamesePhone,
  validateEmail,
  validateRequired,
  validateTeamSize,
  validateStudentForm,
  validateBusinessForm,
  validateEducationForm,
} from '../../src/services/validation.ts';

export {
  VN_PHONE_REGEX,
  RFC_EMAIL_REGEX,
  validateVietnamesePhone,
  validateEmail,
  validateRequired,
  validateTeamSize,
  validateStudentForm,
  validateBusinessForm,
  validateEducationForm,
};

describe('Unit: Form Validation Engine', () => {
  describe('Vietnamese Phone Validation', () => {
    it('accepts valid 10-digit Vietnamese phone numbers across all carriers (03, 05, 07, 08, 09)', () => {
      for (const phone of VALID_PHONES) {
        expect(validateVietnamesePhone(phone), `Expected ${phone} to be valid`).toBeNull();
      }
    });

    it('rejects invalid or deprecated phone numbers', () => {
      for (const invalid of INVALID_PHONES) {
        expect(
          validateVietnamesePhone(invalid.value),
          `Expected ${invalid.label} (${invalid.value}) to be invalid`
        ).not.toBeNull();
      }
    });

    it('handles phones formatted with dashes or spaces gracefully', () => {
      expect(validateVietnamesePhone('0912 345 678')).toBeNull();
      expect(validateVietnamesePhone('0912-345-678')).toBeNull();
      expect(validateVietnamesePhone('+84 912 345 678')).toBeNull();
    });
  });

  describe('RFC Email Validation', () => {
    it('accepts valid emails including academic and domain extensions', () => {
      for (const email of VALID_EMAILS) {
        expect(validateEmail(email), `Expected ${email} to be valid`).toBeNull();
      }
    });

    it('rejects malformed email formats', () => {
      for (const invalid of INVALID_EMAILS) {
        expect(
          validateEmail(invalid.value),
          `Expected ${invalid.label} (${invalid.value}) to be invalid`
        ).not.toBeNull();
      }
    });
  });

  describe('Required String & Boundary Validation', () => {
    it('passes for non-empty strings with Vietnamese diacritics', () => {
      expect(validateRequired('Nguyễn Văn Đạt', 'Họ tên', 2, 100)).toBeNull();
      expect(validateRequired('Trường Đại học Bách Khoa', 'Tên đơn vị', 3, 150)).toBeNull();
    });

    it('fails when input is empty or whitespace-only', () => {
      expect(validateRequired('', 'Họ tên')).not.toBeNull();
      expect(validateRequired('   ', 'Họ tên')).not.toBeNull();
      expect(validateRequired(null, 'Họ tên')).not.toBeNull();
      expect(validateRequired(undefined, 'Họ tên')).not.toBeNull();
    });

    it('enforces minLength constraint correctly', () => {
      expect(validateRequired('A', 'Tên', 2)).not.toBeNull();
      expect(validateRequired('AB', 'Tên', 2)).toBeNull();
      expect(validateRequired('Quá ngắn', 'Mô tả bài toán', 20)).not.toBeNull();
      expect(validateRequired(VALID_BUSINESS_DATA.problemDescription, 'Mô tả bài toán', 20)).toBeNull();
      expect(validateRequired('Hợp tác', 'Nội dung phối hợp', 10)).not.toBeNull();
      expect(validateRequired(VALID_EDUCATION_DATA.collaborationScope, 'Nội dung phối hợp', 10)).toBeNull();
    });

    it('enforces maxLength constraint correctly', () => {
      const longText = 'a'.repeat(101);
      expect(validateRequired(longText, 'Họ tên', 2, 100)).not.toBeNull();
    });
  });

  describe('Full Form Payload Validation Contracts', () => {
    it('validates a complete student registration payload successfully', () => {
      const { fullName, email, phoneNumber, studentId, majorClass, teamSize, domainInterest } = VALID_STUDENT_DATA;
      expect(validateRequired(fullName, 'Họ và tên', 2)).toBeNull();
      expect(validateEmail(email)).toBeNull();
      expect(validateVietnamesePhone(phoneNumber)).toBeNull();
      expect(validateRequired(studentId, 'Mã số sinh viên', 4, 20)).toBeNull();
      expect(validateRequired(majorClass, 'Lớp / Chuyên ngành', 3)).toBeNull();
      expect(['1', '2', '3', '4', '5'].includes(teamSize)).toBe(true);
      expect([
        'customer-support',
        'marketing-assistant',
        'document-processing',
        'workflow-automation',
        'data-analytics',
        'other',
      ].includes(domainInterest)).toBe(true);
    });

    it('validates a complete business partnership payload successfully', () => {
      const { companyName, contactPerson, jobTitle, email, phoneNumber, partnershipType, problemDescription } =
        VALID_BUSINESS_DATA;
      expect(validateRequired(companyName, 'Tên doanh nghiệp', 2)).toBeNull();
      expect(validateRequired(contactPerson, 'Người liên hệ đại diện', 2)).toBeNull();
      expect(validateRequired(jobTitle, 'Chức vụ', 2)).toBeNull();
      expect(validateEmail(email)).toBeNull();
      expect(validateVietnamesePhone(phoneNumber)).toBeNull();
      expect(['problem-provider', 'mentor', 'judge', 'sponsor', 'multiple'].includes(partnershipType)).toBe(true);
      expect(validateRequired(problemDescription, 'Mô tả bài toán', 20)).toBeNull();
    });

    it('validates a complete education partnership payload successfully', () => {
      const { institutionName, contactPerson, email, phoneNumber, collaborationScope } = VALID_EDUCATION_DATA;
      expect(validateRequired(institutionName, 'Tên đơn vị', 3)).toBeNull();
      expect(validateRequired(contactPerson, 'Người đại diện liên hệ', 2)).toBeNull();
      expect(validateEmail(email)).toBeNull();
      expect(validateVietnamesePhone(phoneNumber)).toBeNull();
      expect(validateRequired(collaborationScope, 'Nội dung phối hợp', 10)).toBeNull();
    });

    it('validates team size constraints (1 to 5 members)', () => {
      expect(validateTeamSize(1)).toBeNull();
      expect(validateTeamSize(5)).toBeNull();
      expect(validateTeamSize('3')).toBeNull();
      expect(validateTeamSize(0)).not.toBeNull();
      expect(validateTeamSize(6)).not.toBeNull();
      expect(validateTeamSize(-1)).not.toBeNull();
      expect(validateTeamSize(null)).not.toBeNull();
      expect(validateTeamSize(undefined)).not.toBeNull();
      expect(validateTeamSize('invalid')).not.toBeNull();
    });

    it('validates a complete student registration payload using validateStudentForm helper', () => {
      const errors = validateStudentForm({
        ...VALID_STUDENT_DATA,
        phone: VALID_STUDENT_DATA.phoneNumber,
        teamSize: '3',
      });
      expect(Object.keys(errors)).toHaveLength(0);

      const invalidErrors = validateStudentForm({
        fullName: 'A',
        email: 'invalid-email',
        phoneNumber: '0123456789',
        studentId: '12',
        majorClass: 'IT',
        teamSize: '6' as any,
        domainInterest: 'unsupported' as any,
      });
      expect(invalidErrors.fullName).toBeDefined();
      expect(invalidErrors.email).toBeDefined();
      expect(invalidErrors.phoneNumber).toBeDefined();
      expect(invalidErrors.studentId).toBeDefined();
      expect(invalidErrors.majorClass).toBeDefined();
      expect(invalidErrors.teamSize).toBeDefined();
      expect(invalidErrors.domainInterest).toBeDefined();
    });

    it('validates a complete business partnership payload using validateBusinessForm helper', () => {
      const errors = validateBusinessForm({
        ...VALID_BUSINESS_DATA,
        phone: VALID_BUSINESS_DATA.phoneNumber,
      });
      expect(Object.keys(errors)).toHaveLength(0);

      const invalidErrors = validateBusinessForm({
        companyName: '',
        contactPerson: '',
        jobTitle: '',
        email: 'bad',
        phoneNumber: '123',
        partnershipType: 'invalid' as any,
        problemDescription: 'short',
      });
      expect(invalidErrors.companyName).toBeDefined();
      expect(invalidErrors.contactPerson).toBeDefined();
      expect(invalidErrors.jobTitle).toBeDefined();
      expect(invalidErrors.email).toBeDefined();
      expect(invalidErrors.phoneNumber).toBeDefined();
      expect(invalidErrors.partnershipType).toBeDefined();
      expect(invalidErrors.problemDescription).toBeDefined();
    });

    it('validates a complete education partnership payload using validateEducationForm helper', () => {
      const errors = validateEducationForm({
        ...VALID_EDUCATION_DATA,
        phone: VALID_EDUCATION_DATA.phoneNumber,
      });
      expect(Object.keys(errors)).toHaveLength(0);

      const invalidErrors = validateEducationForm({
        institutionName: 'A',
        contactPerson: '',
        email: 'bad',
        phoneNumber: '123',
        collaborationScope: 'short',
      });
      expect(invalidErrors.institutionName).toBeDefined();
      expect(invalidErrors.contactPerson).toBeDefined();
      expect(invalidErrors.email).toBeDefined();
      expect(invalidErrors.phoneNumber).toBeDefined();
      expect(invalidErrors.collaborationScope).toBeDefined();
    });
  });
});
