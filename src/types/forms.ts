export type ChallengeCategory =
  | 'customer-support'
  | 'marketing-assistant'
  | 'document-processing'
  | 'workflow-automation'
  | 'data-analytics'
  | 'other';

export type BusinessPartnershipType =
  | 'problem-provider'
  | 'mentor'
  | 'judge'
  | 'sponsor'
  | 'multiple';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface TeamMemberInfo {
  fullName: string;
  studentId: string;
  email?: string;
  phone?: string;
  majorClass?: string;
}

/**
 * Form 1: Student Registration Form Values
 * Supports both `phone` and `phoneNumber` for maximum compatibility
 */
export interface StudentRegistrationFormValues {
  fullName: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  studentId: string;
  majorClass: string;
  teamName: string;
  teamSize: '1' | '2' | '3' | '4' | '5';
  mentor?: string;
  domainInterest: ChallengeCategory;
  members?: TeamMemberInfo[];
}

/**
 * Form 2: Business Partnership Form Values
 * Supports both `phone` and `phoneNumber` for maximum compatibility
 */
export interface BusinessPartnershipFormValues {
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  partnershipType: BusinessPartnershipType;
  problemDescription: string;
}

/**
 * Form 3: Education Partnership Form Values
 * Supports both `phone` and `phoneNumber` for maximum compatibility
 */
export interface EducationPartnershipFormValues {
  institutionName: string;
  contactPerson: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  collaborationScope: string;
}

/**
 * Helper to normalize and retrieve phone number from any form values
 */
export function getFormPhone(form: { phone?: string; phoneNumber?: string }): string {
  return form.phoneNumber?.trim() || form.phone?.trim() || '';
}

/**
 * Validation errors mapping for each form
 */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Modal state for triggering forms from anywhere
 */
export interface FormModalState {
  isOpen: boolean;
  activeTab: 'student' | 'business' | 'education';
  defaultTrack?: ChallengeCategory;
}

/**
 * Form 4: Phase 1 Submission Form Values (Vòng 1: Solution Proposal)
 */
export interface Phase1SubmissionFormValues {
  studentId: string;
  email: string;
  teamName: string;
  leaderName: string;
  phone?: string;
  mentor?: string;
  registrationType?: 'team' | 'individual';
  registrationId?: string;
  projectTitle: string;
  pitchDeckUrl: string;
  videoUrl: string;
  summaryDescription: string;
  confirmedShareAccess: boolean;
}

export interface Phase1TeamVerificationResult {
  valid: boolean;
  message: string;
  isLeader?: boolean;
  teamData?: {
    teamName: string;
    leaderName: string;
    leaderStudentId: string;
    leaderEmail: string;
    leaderPhone: string;
    mentor: string;
    registrationId: string;
    registrationType: 'team' | 'individual';
    majorClass?: string;
  };
  alreadySubmitted?: boolean;
  existingSubmission?: {
    projectTitle?: string;
    pitchDeckUrl?: string;
    videoUrl?: string;
    summaryDescription?: string;
    submittedAt?: string;
    submissionCount?: number;
  };
}
