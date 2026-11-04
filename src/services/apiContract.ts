import type {
  StudentRegistrationFormValues,
  BusinessPartnershipFormValues,
  EducationPartnershipFormValues,
  FormStatus,
} from '../types/forms';

export type {
  StudentRegistrationFormValues,
  BusinessPartnershipFormValues,
  EducationPartnershipFormValues,
  FormStatus,
};

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  trackingId?: string;
  timestamp: string;
  error?: ApiError;
}

export interface StudentRegistrationResult {
  registrationId: string;
  fullName: string;
  teamName: string;
  registeredAt: string;
}

export interface BusinessPartnershipResult {
  inquiryId: string;
  companyName: string;
  receivedAt: string;
}

export interface EducationPartnershipResult {
  partnershipId: string;
  institutionName: string;
  receivedAt: string;
}

/**
 * Pure Decoupled Service Contract for Form Submissions
 * Independent of UI and transport layer
 */
export interface IRegistrationService {
  registerStudent(
    payload: StudentRegistrationFormValues
  ): Promise<ApiResponse<StudentRegistrationResult>>;

  submitBusinessPartnership(
    payload: BusinessPartnershipFormValues
  ): Promise<ApiResponse<BusinessPartnershipResult>>;

  submitEducationPartnership(
    payload: EducationPartnershipFormValues
  ): Promise<ApiResponse<EducationPartnershipResult>>;
}
