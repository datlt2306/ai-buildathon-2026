import type {
  IRegistrationService,
  ApiResponse,
  StudentRegistrationResult,
  BusinessPartnershipResult,
  EducationPartnershipResult,
  StudentRegistrationFormValues,
  BusinessPartnershipFormValues,
  EducationPartnershipFormValues,
} from './apiContract';
import {
  validateStudentForm,
  validateBusinessForm,
  validateEducationForm,
} from './validation';

export const STORAGE_KEYS = {
  students: 'aic_submissions_students',
  studentsAlias: 'aic_submissions_student',
  businesses: 'aic_submissions_businesses',
  businessesAlias: 'aic_submissions_business',
  education: 'aic_submissions_education',
} as const;

export const DEFAULT_MOCK_LATENCY_MS = 800;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// In-memory fallback if localStorage is not accessible
const inMemoryStore: Record<string, string> = {};

function getStorageItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return inMemoryStore[key] || null;
  } catch {
    return inMemoryStore[key] || null;
  }
}

function setStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    inMemoryStore[key] = value;
  } catch {
    inMemoryStore[key] = value;
  }
}

function persistToStorage<T>(primaryKey: string, aliasKey: string | null, record: T): void {
  try {
    const raw = getStorageItem(primaryKey) || (aliasKey ? getStorageItem(aliasKey) : null);
    const list: T[] = raw ? JSON.parse(raw) : [];
    list.push(record);
    const serialized = JSON.stringify(list);

    setStorageItem(primaryKey, serialized);
    if (aliasKey) {
      setStorageItem(aliasKey, serialized);
    }
  } catch (err) {
    console.warn(`[MockApi] Failed to persist data to storage:`, err);
  }
}

/**
 * Concrete Mock Implementation of IRegistrationService
 * Completely decoupled from UI layers.
 * Features:
 * - Configurable artificial latency (default 800ms)
 * - Safe localStorage persistence with alias compatibility
 * - Structured console logging
 * - Validates input payloads before acceptance
 */
export class MockRegistrationService implements IRegistrationService {
  private latencyMs: number;

  constructor(latencyMs = DEFAULT_MOCK_LATENCY_MS) {
    this.latencyMs = latencyMs;
  }

  public setLatency(ms: number): void {
    this.latencyMs = ms;
  }

  public getLatency(): number {
    return this.latencyMs;
  }

  async registerStudent(
    payload: StudentRegistrationFormValues
  ): Promise<ApiResponse<StudentRegistrationResult>> {
    console.info('[MockApi] Submitting Student Registration:', payload);

    if (this.latencyMs > 0) {
      await sleep(this.latencyMs);
    }

    const errors = validateStudentForm(payload);
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Thông tin đăng ký sinh viên chưa đầy đủ hoặc không hợp lệ.',
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Vui lòng kiểm tra lại các trường thông tin đăng ký.',
          details: errors,
        },
        timestamp: new Date().toISOString(),
      };
    }

    const registrationId = generateId('AIC-STU');
    const result: StudentRegistrationResult = {
      registrationId,
      fullName: payload.fullName.trim(),
      teamName: payload.teamName?.trim() || 'Thí sinh tự do',
      registeredAt: new Date().toISOString(),
    };

    const storedRecord = {
      ...payload,
      ...result,
      confirmationCode: registrationId,
      submittedAt: result.registeredAt,
    };

    persistToStorage(
      STORAGE_KEYS.students,
      STORAGE_KEYS.studentsAlias,
      storedRecord
    );

    return {
      success: true,
      message: 'Đăng ký tham gia AI INNOVATION CHALLENGE thành công!',
      data: result,
      trackingId: registrationId,
      timestamp: new Date().toISOString(),
    };
  }

  async submitBusinessPartnership(
    payload: BusinessPartnershipFormValues
  ): Promise<ApiResponse<BusinessPartnershipResult>> {
    console.info('[MockApi] Submitting Business Partnership:', payload);

    if (this.latencyMs > 0) {
      await sleep(this.latencyMs);
    }

    const errors = validateBusinessForm(payload);
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Thông tin đối tác doanh nghiệp không hợp lệ.',
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Vui lòng kiểm tra lại thông tin đề xuất hợp tác.',
          details: errors,
        },
        timestamp: new Date().toISOString(),
      };
    }

    const inquiryId = generateId('AIC-BIZ');
    const result: BusinessPartnershipResult = {
      inquiryId,
      companyName: payload.companyName.trim(),
      receivedAt: new Date().toISOString(),
    };

    const storedRecord = {
      ...payload,
      ...result,
      referenceCode: inquiryId,
      submittedAt: result.receivedAt,
    };

    persistToStorage(
      STORAGE_KEYS.businesses,
      STORAGE_KEYS.businessesAlias,
      storedRecord
    );

    return {
      success: true,
      message: 'Cảm ơn quý Doanh nghiệp đã đăng ký đồng hành cùng chương trình!',
      data: result,
      trackingId: inquiryId,
      timestamp: new Date().toISOString(),
    };
  }

  async submitEducationPartnership(
    payload: EducationPartnershipFormValues
  ): Promise<ApiResponse<EducationPartnershipResult>> {
    console.info('[MockApi] Submitting Education Partnership:', payload);

    if (this.latencyMs > 0) {
      await sleep(this.latencyMs);
    }

    const errors = validateEducationForm(payload);
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Thông tin đề xuất hợp tác nhà trường chưa hợp lệ.',
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Vui lòng kiểm tra lại thông tin phối hợp đào tạo.',
          details: errors,
        },
        timestamp: new Date().toISOString(),
      };
    }

    const partnershipId = generateId('AIC-EDU');
    const result: EducationPartnershipResult = {
      partnershipId,
      institutionName: payload.institutionName.trim(),
      receivedAt: new Date().toISOString(),
    };

    const storedRecord = {
      ...payload,
      ...result,
      referenceCode: partnershipId,
      submittedAt: result.receivedAt,
    };

    persistToStorage(
      STORAGE_KEYS.education,
      null,
      storedRecord
    );

    return {
      success: true,
      message: 'Cảm ơn đơn vị Nhà trường đã liên hệ kết nối đồng hành!',
      data: result,
      trackingId: partnershipId,
      timestamp: new Date().toISOString(),
    };
  }
}

export const mockApiService = new MockRegistrationService();
