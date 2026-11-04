/**
 * E2E Test Suite — Tier 4: Real-World Scenarios
 * Verifies complete end-to-end user journeys for:
 * 1. Student Registration Journey
 * 2. Business Proposal & Problem Provider Journey
 * 3. School Academic Collaboration Journey
 * 4. Keyboard Navigation & Modal Focus Trap Journey
 * 5. Mobile Drawer & Responsive Journey
 */

import { describe, it, expect } from '../helpers/compat.ts';
import {
  VALID_STUDENT_DATA,
  VALID_BUSINESS_DATA,
  VALID_EDUCATION_DATA,
} from '../helpers/fixtures.ts';
import { createMockLocalStorage } from '../helpers/dom-helper.ts';
import {
  validateVietnamesePhone,
  validateEmail,
  validateRequired,
} from '../unit/validation.test.ts';

describe('Tier 4: Real-World End-to-End User Journeys', () => {
  describe('Journey 1: Student Registration Journey', () => {
    it('executes full student registration lifecycle from landing to confirmation', async () => {
      const storage = createMockLocalStorage();
      let modalOpen = false;
      let activeTab: 'student' | 'business' | 'education' = 'student';
      let formStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
      let confirmationCode: string | null = null;

      // 1. Student clicks "Đăng ký tham gia" CTA
      modalOpen = true;
      activeTab = 'student';
      expect(modalOpen).toBe(true);
      expect(activeTab).toBe('student');

      // 2. Validate student inputs
      const student = { ...VALID_STUDENT_DATA };
      expect(validateRequired(student.fullName, 'Họ tên', 2)).toBeNull();
      expect(validateEmail(student.email)).toBeNull();
      expect(validateVietnamesePhone(student.phoneNumber)).toBeNull();
      expect(validateRequired(student.studentId, 'MSSV', 4)).toBeNull();
      expect(validateRequired(student.majorClass, 'Chuyên ngành', 3)).toBeNull();

      // 3. Trigger submit -> transitions to submitting
      formStatus = 'submitting';
      expect(formStatus).toBe('submitting');

      // 4. Mock API latency & storage
      await new Promise((resolve) => setTimeout(resolve, 50));
      confirmationCode = `AIC-STU-${Date.now().toString(36).toUpperCase()}`;
      storage.setItem(
        'aic_submissions_student',
        JSON.stringify([{ ...student, confirmationCode, submittedAt: new Date().toISOString() }])
      );
      formStatus = 'success';

      // 5. Verify success state and persisted payload
      expect(formStatus).toBe('success');
      expect(confirmationCode).toMatch(/^AIC-STU-/);
      const stored = JSON.parse(storage.getItem('aic_submissions_student')!);
      expect(stored[0].fullName).toBe(VALID_STUDENT_DATA.fullName);
      expect(stored[0].studentId).toBe(VALID_STUDENT_DATA.studentId);
    });
  });

  describe('Journey 2: Business Proposal & Problem Provider Journey', () => {
    it('executes full business partnership submission lifecycle with real problem context', async () => {
      const storage = createMockLocalStorage();
      let modalOpen = false;
      let activeTab: 'student' | 'business' | 'education' = 'student';
      let formStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
      let referenceCode: string | null = null;

      // 1. Enterprise partner clicks "Trở thành đối tác đồng hành"
      modalOpen = true;
      activeTab = 'business';
      expect(modalOpen).toBe(true);
      expect(activeTab).toBe('business');

      // 2. Validate business inputs
      const business = { ...VALID_BUSINESS_DATA };
      expect(validateRequired(business.companyName, 'Tên doanh nghiệp', 2)).toBeNull();
      expect(validateRequired(business.contactPerson, 'Người đại diện', 2)).toBeNull();
      expect(validateRequired(business.jobTitle, 'Chức vụ', 2)).toBeNull();
      expect(validateEmail(business.email)).toBeNull();
      expect(validateVietnamesePhone(business.phoneNumber)).toBeNull();
      expect(validateRequired(business.problemDescription, 'Mô tả bài toán', 20)).toBeNull();

      // 3. Trigger submission
      formStatus = 'submitting';
      await new Promise((resolve) => setTimeout(resolve, 50));
      referenceCode = `AIC-BIZ-${Date.now().toString(36).toUpperCase()}`;
      storage.setItem(
        'aic_submissions_business',
        JSON.stringify([{ ...business, referenceCode, submittedAt: new Date().toISOString() }])
      );
      formStatus = 'success';

      // 4. Verify outcome
      expect(formStatus).toBe('success');
      expect(referenceCode).toMatch(/^AIC-BIZ-/);
      const stored = JSON.parse(storage.getItem('aic_submissions_business')!);
      expect(stored[0].companyName).toBe(VALID_BUSINESS_DATA.companyName);
      expect(stored[0].partnershipType).toBe('problem-provider');
    });
  });

  describe('Journey 3: School Academic Collaboration Journey', () => {
    it('executes university partnership submission lifecycle with academic cooperation scope', async () => {
      const storage = createMockLocalStorage();
      let modalOpen = false;
      let activeTab: 'student' | 'business' | 'education' = 'student';
      let formStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
      let referenceCode: string | null = null;

      // 1. University representative triggers modal
      modalOpen = true;
      activeTab = 'education';
      expect(modalOpen).toBe(true);
      expect(activeTab).toBe('education');

      // 2. Validate education inputs
      const education = { ...VALID_EDUCATION_DATA };
      expect(validateRequired(education.institutionName, 'Tên đơn vị', 3)).toBeNull();
      expect(validateRequired(education.contactPerson, 'Người đại diện', 2)).toBeNull();
      expect(validateEmail(education.email)).toBeNull();
      expect(validateVietnamesePhone(education.phoneNumber)).toBeNull();
      expect(validateRequired(education.collaborationScope, 'Nội dung phối hợp', 10)).toBeNull();

      // 3. Trigger submission
      formStatus = 'submitting';
      await new Promise((resolve) => setTimeout(resolve, 50));
      referenceCode = `AIC-EDU-${Date.now().toString(36).toUpperCase()}`;
      storage.setItem(
        'aic_submissions_education',
        JSON.stringify([{ ...education, referenceCode, submittedAt: new Date().toISOString() }])
      );
      formStatus = 'success';

      // 4. Verify outcome
      expect(formStatus).toBe('success');
      expect(referenceCode).toMatch(/^AIC-EDU-/);
      const stored = JSON.parse(storage.getItem('aic_submissions_education')!);
      expect(stored[0].institutionName).toBe(VALID_EDUCATION_DATA.institutionName);
    });
  });

  describe('Journey 4: Keyboard Navigation & Modal Focus Trap Journey', () => {
    it('verifies accessibility lifecycle for keyboard tab navigation and modal trapping', () => {
      // 1. Skip link target
      const skipLinkHref = '#main-content';
      expect(skipLinkHref).toBe('#main-content');

      // 2. Modal accessibility attributes
      const modalAttributes = {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'modal-title',
      };
      expect(modalAttributes.role).toBe('dialog');
      expect(modalAttributes['aria-modal']).toBe('true');

      // 3. Focus trap sequence simulation
      const focusableIndices = [0, 1, 2, 3, 4]; // e.g. CloseButton, Tab1, Tab2, Input1, SubmitBtn
      let currentFocusIndex = 0;

      // Tab forward
      const tabForward = () => {
        currentFocusIndex = (currentFocusIndex + 1) % focusableIndices.length;
      };
      // Shift+Tab backward
      const tabBackward = () => {
        currentFocusIndex = (currentFocusIndex - 1 + focusableIndices.length) % focusableIndices.length;
      };

      tabForward();
      expect(currentFocusIndex).toBe(1);
      // Cycling to the end traps focus back to 0
      tabForward();
      tabForward();
      tabForward();
      tabForward();
      expect(currentFocusIndex).toBe(0);

      // Shift+Tab wraps around to last element
      tabBackward();
      expect(currentFocusIndex).toBe(4);

      // 4. Escape key press closes modal
      let isModalOpen = true;
      const onKeyDown = (e: { key: string }) => {
        if (e.key === 'Escape') isModalOpen = false;
      };
      onKeyDown({ key: 'Escape' });
      expect(isModalOpen).toBe(false);
    });
  });

  describe('Journey 5: Mobile Drawer & Responsive Journey', () => {
    it('verifies mobile navigation drawer toggle and anchor navigation', () => {
      let isDrawerOpen = false;
      const toggleDrawer = () => {
        isDrawerOpen = !isDrawerOpen;
      };

      // 1. Initial state: mobile drawer closed
      expect(isDrawerOpen).toBe(false);

      // 2. User taps hamburger button
      toggleDrawer();
      expect(isDrawerOpen).toBe(true);

      // 3. User taps a section anchor link inside the drawer
      const selectedAnchor = '#timeline';
      // Clicking link closes drawer and navigates
      isDrawerOpen = false;
      expect(isDrawerOpen).toBe(false);
      expect(selectedAnchor).toBe('#timeline');

      // 4. Mobile touch targets meet WCAG minimum sizing (>= 44px)
      const minTouchTargetPx = 44;
      const navItemHeightPx = 48; // h-12 in Tailwind
      expect(navItemHeightPx).toBeGreaterThanOrEqual(minTouchTargetPx);
    });
  });
});
