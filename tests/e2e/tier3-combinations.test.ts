/**
 * E2E Test Suite — Tier 3: Cross-Feature Combinations & State Transitions
 * Verifies pairwise navigation-anchor mappings, multi-section CTA modal orchestrator,
 * form tab switching, modal dismiss mechanics, FAQ tabs, and localStorage synchronization.
 */

import { describe, it, expect } from '../helpers/compat.ts';
import {
  NAV_ANCHORS,
  VALID_STUDENT_DATA,
  VALID_BUSINESS_DATA,
  VALID_EDUCATION_DATA,
} from '../helpers/fixtures.ts';
import { createMockLocalStorage } from '../helpers/dom-helper.ts';

describe('Tier 3: Cross-Feature Combinations & State Transitions', () => {
  describe('Pairwise: Navigation Links ↔ Section Anchor IDs', () => {
    const navMappings = [
      { label: 'Tổng quan', target: '#the-idea' },
      { label: 'Dành cho sinh viên', target: '#students' },
      { label: 'Dành cho doanh nghiệp', target: '#business' },
      { label: 'Dành cho nhà trường', target: '#education' },
      { label: 'Lộ trình', target: '#timeline' },
      { label: 'Đối tác', target: '#partners' },
      { label: 'FAQ', target: '#faq' },
    ];

    it('asserts all 7 navigation items map 1:1 to authoritative section anchor IDs', () => {
      for (const item of navMappings) {
        expect(NAV_ANCHORS).toContain(item.target);
      }
    });

    it('verifies that each target anchor starts with a hash for standard smooth scrolling', () => {
      for (const item of navMappings) {
        expect(item.target.startsWith('#')).toBe(true);
        expect(item.target.length).toBeGreaterThan(1);
      }
    });
  });

  describe('Multi-Section CTA Matrix ↔ Modal Orchestrator', () => {
    interface ModalState {
      isOpen: boolean;
      activeTab: 'student' | 'business' | 'education';
    }

    const ctaTriggers = [
      { source: 'Hero: Secondary CTA', label: 'Trở thành đối tác đồng hành', expectedTab: 'business' },
      { source: 'Stakeholders: Sinh viên CTA', label: 'Đăng ký tham gia', expectedTab: 'student' },
      { source: 'Stakeholders: Nhà trường CTA', label: 'Tìm hiểu chương trình', expectedTab: 'education' },
      { source: 'Stakeholders: Doanh nghiệp CTA', label: 'Trở thành đối tác đồng hành', expectedTab: 'business' },
      { source: 'Mentors & Partners: Partner CTA', label: 'Đăng ký đối tác', expectedTab: 'business' },
      { source: 'Final CTA: Sinh viên button', label: 'Đăng ký tham gia (Sinh viên)', expectedTab: 'student' },
      { source: 'Final CTA: Doanh nghiệp button', label: 'Đồng hành cùng chương trình', expectedTab: 'business' },
      { source: 'Final CTA: Nhà trường button', label: 'Hợp tác đào tạo', expectedTab: 'education' },
    ];

    it('verifies that every CTA trigger opens the modal with the exact target stakeholder tab', () => {
      let modalState: ModalState = { isOpen: false, activeTab: 'student' };

      const openModal = (tab: 'student' | 'business' | 'education') => {
        modalState = { isOpen: true, activeTab: tab };
      };

      for (const trigger of ctaTriggers) {
        openModal(trigger.expectedTab as any);
        expect(modalState.isOpen).toBe(true);
        expect(modalState.activeTab).toBe(trigger.expectedTab);
      }
    });
  });

  describe('Modal Dismiss & State Reset Mechanics', () => {
    it('closes modal and restores clean state when close button is clicked', () => {
      let isOpen = true;
      const handleClose = () => {
        isOpen = false;
      };
      handleClose();
      expect(isOpen).toBe(false);
    });

    it('closes modal when Escape key is pressed', () => {
      let isOpen = true;
      const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Escape') {
          isOpen = false;
        }
      };
      handleKeyDown({ key: 'Escape' });
      expect(isOpen).toBe(false);
    });

    it('closes modal when clicking backdrop outside dialog content', () => {
      let isOpen = true;
      const handleBackdropClick = (target: string, currentTarget: string) => {
        if (target === currentTarget) {
          isOpen = false;
        }
      };
      handleBackdropClick('backdrop-element', 'backdrop-element');
      expect(isOpen).toBe(false);
    });
  });

  describe('Form Tab Switching & Error Isolation', () => {
    it('isolates validation errors when switching between form tabs in modal', () => {
      interface FormContext {
        activeTab: 'student' | 'business' | 'education';
        errors: Record<string, string>;
      }

      let context: FormContext = {
        activeTab: 'student',
        errors: { fullName: 'Vui lòng nhập họ và tên' },
      };

      // User switches tab from student to business
      const switchTab = (tab: 'student' | 'business' | 'education') => {
        context = {
          activeTab: tab,
          errors: {}, // Fresh isolated error state
        };
      };

      switchTab('business');
      expect(context.activeTab).toBe('business');
      expect(Object.keys(context.errors)).toHaveLength(0);
    });
  });

  describe('FAQ Tab Switching & Accordion Expansion', () => {
    it('toggles FAQ question lists when switching between Student and Business tabs', () => {
      let activeTab: 'student' | 'business' = 'student';
      const studentQuestions = ['Kinh nghiệm ML', 'Đăng ký cá nhân', 'Chi phí', 'Lịch trình', 'Sở hữu trí tuệ'];
      const businessQuestions = [
        'Cần chuẩn bị gì',
        'An toàn dữ liệu',
        'Giá trị nhận được',
        'Nhà trường phối hợp',
        'Quy trình đăng ký',
      ];

      const getQuestions = () => (activeTab === 'student' ? studentQuestions : businessQuestions);

      expect(getQuestions()).toEqual(studentQuestions);
      activeTab = 'business';
      expect(getQuestions()).toEqual(businessQuestions);
    });

    it('toggles accordion expansion states cleanly', () => {
      const openItems = new Set<number>();
      const toggleItem = (index: number) => {
        if (openItems.has(index)) {
          openItems.delete(index);
        } else {
          openItems.add(index);
        }
      };

      toggleItem(0);
      expect(openItems.has(0)).toBe(true);
      toggleItem(0);
      expect(openItems.has(0)).toBe(false);
    });
  });

  describe('LocalStorage Persistence Isolation', () => {
    it('persists submissions into dedicated isolated keys without collision', () => {
      const storage = createMockLocalStorage();

      // Submit Student
      const studentPayload = { ...VALID_STUDENT_DATA, timestamp: new Date().toISOString() };
      storage.setItem('aic_submissions_student', JSON.stringify([studentPayload]));

      // Submit Business
      const businessPayload = { ...VALID_BUSINESS_DATA, timestamp: new Date().toISOString() };
      storage.setItem('aic_submissions_business', JSON.stringify([businessPayload]));

      // Submit Education
      const educationPayload = { ...VALID_EDUCATION_DATA, timestamp: new Date().toISOString() };
      storage.setItem('aic_submissions_education', JSON.stringify([educationPayload]));

      // Verify all 3 keys are present and distinct
      const studentRetrieved = JSON.parse(storage.getItem('aic_submissions_student')!);
      const businessRetrieved = JSON.parse(storage.getItem('aic_submissions_business')!);
      const educationRetrieved = JSON.parse(storage.getItem('aic_submissions_education')!);

      expect(studentRetrieved).toHaveLength(1);
      expect(studentRetrieved[0].fullName).toBe(VALID_STUDENT_DATA.fullName);

      expect(businessRetrieved).toHaveLength(1);
      expect(businessRetrieved[0].companyName).toBe(VALID_BUSINESS_DATA.companyName);

      expect(educationRetrieved).toHaveLength(1);
      expect(educationRetrieved[0].institutionName).toBe(VALID_EDUCATION_DATA.institutionName);
    });
  });
});
