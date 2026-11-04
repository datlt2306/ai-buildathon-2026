import {
  StudentRegistrationFormValues,
  BusinessPartnershipFormValues,
  EducationPartnershipFormValues,
} from './forms';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  trackingId?: string;
  timestamp: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
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
 * Clean Service Contract for Form Submissions
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
