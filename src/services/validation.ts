import type {
  StudentRegistrationFormValues,
  BusinessPartnershipFormValues,
  EducationPartnershipFormValues,
  ChallengeCategory,
  BusinessPartnershipType,
} from '../types/forms';

/**
 * Vietnamese Telecom Phone Number Regex
 * Accepts prefixes 0, +84, and 84 followed by carrier codes 3, 5, 7, 8, 9 and 8 digits (10 digits total in VN format).
 * Examples: 0912345678, +84912345678, 84988776655, 0381234567
 */
export const VN_PHONE_REGEX = /^(?:0|\+84|84)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Standard RFC Compliant Email Regex
 */
export const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const VALID_CHALLENGE_CATEGORIES: readonly ChallengeCategory[] = [
  'customer-support',
  'marketing-assistant',
  'document-processing',
  'workflow-automation',
  'data-analytics',
  'other',
] as const;

export const VALID_PARTNERSHIP_TYPES: readonly BusinessPartnershipType[] = [
  'problem-provider',
  'mentor',
  'judge',
  'sponsor',
  'multiple',
] as const;

/**
 * Strips formatting characters (spaces, dashes, dots, parentheses) from phone string
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s.\-()]/g, '');
}

/**
 * Validates a Vietnamese phone number
 * @returns null if valid, or a localized error message string
 */
export function validateVietnamesePhone(phone: string | undefined | null): string | null {
  if (!phone || !phone.trim()) {
    return 'Vui lòng nhập số điện thoại liên hệ.';
  }
  const cleaned = cleanPhoneNumber(phone.trim());
  if (!VN_PHONE_REGEX.test(cleaned)) {
    return 'Số điện thoại không hợp lệ (cần gồm 10 chữ số hợp lệ tại Việt Nam).';
  }
  return null;
}

/**
 * Validates an email address against standard RFC format
 * @returns null if valid, or a localized error message string
 */
export function validateEmail(email: string | undefined | null): string | null {
  if (!email || !email.trim()) {
    return 'Vui lòng nhập địa chỉ email.';
  }
  const trimmed = email.trim();
  if (!RFC_EMAIL_REGEX.test(trimmed)) {
    return 'Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.';
  }
  return null;
}

/**
 * Validates required string input with minLength and maxLength constraints
 * @returns null if valid, or a localized error message string
 */
export function validateRequired(
  value: string | undefined | null,
  fieldName: string,
  minLength = 1,
  maxLength = 1000
): string | null {
  if (!value || !value.trim()) {
    return `Vui lòng nhập ${fieldName}.`;
  }
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return `${fieldName} phải có tối thiểu ${minLength} ký tự.`;
  }
  if (trimmed.length > maxLength) {
    return `${fieldName} không được vượt quá ${maxLength} ký tự.`;
  }
  return null;
}

/**
 * Validates team size for student registration (1 to 5 members)
 * @returns null if valid, or a localized error message string
 */
export function validateTeamSize(size: string | number | undefined | null): string | null {
  if (size === undefined || size === null || size === '') {
    return 'Vui lòng chọn số lượng thành viên.';
  }
  const num = typeof size === 'number' ? size : parseInt(String(size), 10);
  if (isNaN(num) || num < 1 || num > 5) {
    return 'Số lượng thành viên mỗi đội từ 1 đến 5 bạn.';
  }
  return null;
}

/**
 * Validates the full Student Registration payload
 * Returns a map of fieldName -> errorMessage. Empty object means payload is valid.
 */
export function validateStudentForm(
  values: Partial<StudentRegistrationFormValues>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const nameError = validateRequired(values.fullName, 'Họ và tên', 2, 100);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const phoneValue = values.phoneNumber || values.phone;
  const phoneError = validateVietnamesePhone(phoneValue);
  if (phoneError) {
    errors.phone = phoneError;
    if (values.phoneNumber !== undefined) {
      errors.phoneNumber = phoneError;
    }
  }

  const idError = validateRequired(values.studentId, 'Mã số sinh viên', 4, 20);
  if (idError) errors.studentId = idError;

  const classError = validateRequired(values.majorClass, 'Lớp / Chuyên ngành', 3, 100);
  if (classError) errors.majorClass = classError;

  const teamSizeError = validateTeamSize(values.teamSize);
  if (teamSizeError) errors.teamSize = teamSizeError;

  if (!values.domainInterest || !VALID_CHALLENGE_CATEGORIES.includes(values.domainInterest)) {
    errors.domainInterest = 'Vui lòng chọn lĩnh vực bài toán quan tâm.';
  }

  return errors;
}

/**
 * Validates the full Business Partnership payload
 * Returns a map of fieldName -> errorMessage. Empty object means payload is valid.
 */
export function validateBusinessForm(
  values: Partial<BusinessPartnershipFormValues>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const companyError = validateRequired(values.companyName, 'Tên doanh nghiệp', 2, 200);
  if (companyError) errors.companyName = companyError;

  const contactError = validateRequired(values.contactPerson, 'Người liên hệ đại diện', 2, 100);
  if (contactError) errors.contactPerson = contactError;

  const titleError = validateRequired(values.jobTitle, 'Chức vụ', 2, 100);
  if (titleError) errors.jobTitle = titleError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const phoneValue = values.phoneNumber || values.phone;
  const phoneError = validateVietnamesePhone(phoneValue);
  if (phoneError) {
    errors.phone = phoneError;
    if (values.phoneNumber !== undefined) {
      errors.phoneNumber = phoneError;
    }
  }

  if (!values.partnershipType || !VALID_PARTNERSHIP_TYPES.includes(values.partnershipType)) {
    errors.partnershipType = 'Vui lòng chọn hình thức đồng hành.';
  }

  const descError = validateRequired(values.problemDescription, 'Mô tả bài toán', 20, 2000);
  if (descError) errors.problemDescription = descError;

  return errors;
}

/**
 * Validates the full Education Partnership payload
 * Returns a map of fieldName -> errorMessage. Empty object means payload is valid.
 */
export function validateEducationForm(
  values: Partial<EducationPartnershipFormValues>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const instError = validateRequired(values.institutionName, 'Tên đơn vị', 3, 200);
  if (instError) errors.institutionName = instError;

  const contactError = validateRequired(values.contactPerson, 'Người đại diện liên hệ', 2, 100);
  if (contactError) errors.contactPerson = contactError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const phoneValue = values.phoneNumber || values.phone;
  const phoneError = validateVietnamesePhone(phoneValue);
  if (phoneError) {
    errors.phone = phoneError;
    if (values.phoneNumber !== undefined) {
      errors.phoneNumber = phoneError;
    }
  }

  const scopeError = validateRequired(values.collaborationScope, 'Nội dung phối hợp', 10, 2000);
  if (scopeError) errors.collaborationScope = scopeError;

  return errors;
}
