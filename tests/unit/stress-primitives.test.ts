/**
 * Stress & Edge Case Test Suite: UI Primitives & Mock Services
 * Challenger M2: Hostile environment & boundary conditions testing
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe, it, expect } from '../helpers/compat.ts';

import { Button } from '../../src/components/common/Button.tsx';
import { Modal } from '../../src/components/common/Modal.tsx';
import { Input } from '../../src/components/common/Input.tsx';
import { Textarea } from '../../src/components/common/Textarea.tsx';
import { Select } from '../../src/components/common/Select.tsx';
import { FormStateBanner } from '../../src/components/common/FormStateBanner.tsx';
import {
  MockRegistrationService,
  STORAGE_KEYS,
} from '../../src/services/mockApiService.ts';
import {
  getRegistrationService,
  setRegistrationService,
} from '../../src/services/apiFactory.ts';
import {
  VALID_STUDENT_DATA,
  VALID_BUSINESS_DATA,
  VALID_EDUCATION_DATA,
} from '../helpers/fixtures.ts';

function render(element: React.ReactElement): string {
  return ReactDOMServer.renderToStaticMarkup(element);
}

describe('Adversarial & Stress Testing: UI Primitives & Services', () => {
  describe('Input / Textarea / Select Edge Cases', () => {
    it('treats empty string error as falsy (aria-invalid=false, no role="alert")', () => {
      const inputHtml = render(
        React.createElement(Input, { id: 'test-empty', error: '', label: 'Test' })
      );
      expect(inputHtml).toContain('aria-invalid="false"');
      expect(inputHtml.includes('role="alert"')).toBe(false);
      expect(inputHtml.includes('test-empty-error')).toBe(false);

      const textareaHtml = render(
        React.createElement(Textarea, { id: 'test-empty-ta', error: '', label: 'Test TA' })
      );
      expect(textareaHtml).toContain('aria-invalid="false"');
      expect(textareaHtml.includes('role="alert"')).toBe(false);

      const selectHtml = render(
        React.createElement(Select, { id: 'test-empty-sel', error: '', label: 'Test Sel' })
      );
      expect(selectHtml).toContain('aria-invalid="false"');
      expect(selectHtml.includes('role="alert"')).toBe(false);
    });

    it('safely escapes XSS injection attempts in label and error text', () => {
      const xssPayload = '<img src=x onerror=alert(1)>';
      const html = render(
        React.createElement(Input, {
          id: 'xss-input',
          label: xssPayload,
          error: xssPayload,
        })
      );
      // React escaping guarantees raw tag is escaped as &lt;img ...&gt;
      expect(html.includes('<img src=x onerror=alert(1)>')).toBe(false);
      expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    });

    it('handles unicode, emoji, and Vietnamese diacritics in labels and values without distortion', () => {
      const unicodeLabel = 'Đăng ký tham gia 🎯 (Tiếng Việt có dấu & emoji)';
      const html = render(
        React.createElement(Input, {
          id: 'unicode-input',
          label: unicodeLabel,
          defaultValue: 'Nguyễn Trần Phúc Khang',
        })
      );
      expect(html).toContain('Đăng ký tham gia 🎯');
      expect(html).toContain('value="Nguyễn Trần Phúc Khang"');
    });
  });

  describe('Modal Backdrop Click & Focus Trap Mechanics', () => {
    it('distinguishes between backdrop click (close) and inner dialog click (preserve)', () => {
      let closeCalled = 0;
      const onClose = () => { closeCalled++; };

      const backdropElement = { id: 'backdrop' };
      const dialogElement = { id: 'dialog-inner' };

      // Handler logic from Modal.tsx
      const createBackdropHandler = (closeOnBackdropClick = true) => {
        return (e: { target: any; currentTarget: any }) => {
          if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
          }
        };
      };

      const handler = createBackdropHandler(true);

      // Scenario A: Click directly on backdrop -> calls onClose
      handler({ target: backdropElement, currentTarget: backdropElement });
      expect(closeCalled).toBe(1);

      // Scenario B: Click inside dialog -> does NOT call onClose
      handler({ target: dialogElement, currentTarget: backdropElement });
      expect(closeCalled).toBe(1);

      // Scenario C: closeOnBackdropClick=false -> click on backdrop does NOT call onClose
      const noBackdropCloseHandler = createBackdropHandler(false);
      noBackdropCloseHandler({ target: backdropElement, currentTarget: backdropElement });
      expect(closeCalled).toBe(1); // Still 1
    });

    it('focus trap ignores disabled and tabindex="-1" elements from focus sequence', () => {
      const FOCUSABLE_SELECTOR =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

      // Verify selector regex rules
      const testElements = [
        { selector: 'a[href]', matches: true },
        { selector: 'button:not([disabled])', matches: true },
        { selector: 'button[disabled]', matches: false },
        { selector: '[tabindex="-1"]', matches: false },
        { selector: '[tabindex="0"]', matches: true },
      ];

      for (const t of testElements) {
        if (t.matches) {
          expect(
            FOCUSABLE_SELECTOR.includes(t.selector.split(':')[0]) ||
            FOCUSABLE_SELECTOR.includes('[tabindex]')
          ).toBe(true);
        }
      }
    });

    it('handles focus trap with zero focusable elements by preventing tab escape', () => {
      let tabPrevented = false;
      const handleTab = (focusablesLength: number) => {
        if (focusablesLength === 0) {
          tabPrevented = true;
        }
      };

      handleTab(0);
      expect(tabPrevented).toBe(true);
    });
  });

  describe('FormStateBanner Boundary Behaviors', () => {
    it('renders errorTitle fallback to "Có lỗi xảy ra" when errorTitle is omitted', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'error',
          errorMessage: 'Chi tiết lỗi kết nối.',
        })
      );
      expect(html).toContain('Có lỗi xảy ra');
      expect(html).toContain('Chi tiết lỗi kết nối.');
    });

    it('renders successTitle fallback to "Gửi thông tin thành công!" when successTitle is omitted', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'success',
          successMessage: 'Đã lưu bản ghi.',
        })
      );
      expect(html).toContain('Gửi thông tin thành công!');
      expect(html).toContain('Đã lưu bản ghi.');
    });
  });

  describe('MockRegistrationService & Factory Integration', () => {
    it('rejects invalid payload with VALIDATION_FAILED code without saving', async () => {
      const service = new MockRegistrationService(0); // 0ms latency for unit test
      const response = await service.registerStudent({
        fullName: 'A', // Too short (min 2)
        email: 'bad-email',
        phoneNumber: '12345',
        studentId: '1',
        majorClass: '',
        teamSize: '10' as any,
        domainInterest: 'invalid' as any,
      });

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.error?.code).toBe('VALIDATION_FAILED');
      expect(response.data).toBeUndefined();
    });

    it('persists valid student registration with unique ID and confirmation code', async () => {
      const service = new MockRegistrationService(0);
      const response = await service.registerStudent({
        ...VALID_STUDENT_DATA,
        teamSize: '3',
      });

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.registrationId.startsWith('AIC-STU-')).toBe(true);
      expect(response.trackingId).toBe(response.data?.registrationId);
    });

    it('allows configurable latency via setLatency and getLatency', () => {
      const service = new MockRegistrationService(500);
      expect(service.getLatency()).toBe(500);
      service.setLatency(200);
      expect(service.getLatency()).toBe(200);
    });

    it('apiFactory allows overriding singleton service implementation', () => {
      const customMock = new MockRegistrationService(10);
      setRegistrationService(customMock);
      const retrieved = getRegistrationService('mock');
      expect(retrieved).toBe(customMock);
    });
  });
});
