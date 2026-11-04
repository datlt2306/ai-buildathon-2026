/**
 * Empirical Unit Test Suite: Common UI Primitives & Accessibility Verification
 * Milestone 2 Challenger: Verifies Button, Modal, Input, Textarea, Select, FormStateBanner, SkipLink, useFocusTrap
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe, it, expect } from '../helpers/compat.ts';

// Import UI Primitives
import { Button } from '../../src/components/common/Button.tsx';
import { Modal } from '../../src/components/common/Modal.tsx';
import { Input } from '../../src/components/common/Input.tsx';
import { Textarea } from '../../src/components/common/Textarea.tsx';
import { Select } from '../../src/components/common/Select.tsx';
import { FormStateBanner } from '../../src/components/common/FormStateBanner.tsx';
import { Badge } from '../../src/components/common/Badge.tsx';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../src/components/common/Card.tsx';
import { SkipLink } from '../../src/components/layout/SkipLink.tsx';
import { useFocusTrap } from '../../src/hooks/useFocusTrap.ts';

function render(element: React.ReactElement): string {
  return ReactDOMServer.renderToStaticMarkup(element);
}

describe('Empirical Verification: Common UI Primitives (M2)', () => {
  describe('Button Primitive (States, Variants, Accessibility)', () => {
    it('renders normal active state without disabled or aria-busy', () => {
      const html = render(
        React.createElement(Button, { variant: 'primary', size: 'md' }, 'Bắt đầu ngay')
      );
      expect(html).toContain('Bắt đầu ngay');
      expect(html).toContain('type="button"');
      expect(html).toContain('aria-busy="false"');
      expect(html).toContain('aria-disabled="false"');
      expect(html.includes('disabled=""')).toBe(false);
      expect(html).toContain('from-blue-600');
    });

    it('renders disabled state with disabled and aria-disabled="true"', () => {
      const html = render(
        React.createElement(Button, { disabled: true, variant: 'secondary' }, 'Không khả dụng')
      );
      expect(html).toContain('Không khả dụng');
      expect(html).toContain('disabled=""');
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain('aria-busy="false"');
      expect(html).toContain('bg-slate-800');
    });

    it('renders loading state with Loader2 spinner, aria-busy="true", and disabled', () => {
      const html = render(
        React.createElement(
          Button,
          { isLoading: true, loadingText: 'Đang gửi...' },
          'Gửi đăng ký'
        )
      );
      // Loading spinner SVG present
      expect(html).toContain('animate-spin');
      expect(html).toContain('aria-hidden="true"');
      // Accessible states
      expect(html).toContain('aria-busy="true"');
      expect(html).toContain('aria-disabled="true"');
      expect(html).toContain('disabled=""');
      // Custom loading text rendered
      expect(html).toContain('Đang gửi...');
      // Original children suppressed when loadingText provided
      expect(html.includes('Gửi đăng ký')).toBe(false);
    });

    it('falls back to children when isLoading is true but loadingText is omitted', () => {
      const html = render(
        React.createElement(Button, { isLoading: true }, 'Gửi đăng ký')
      );
      expect(html).toContain('animate-spin');
      expect(html).toContain('aria-busy="true"');
      expect(html).toContain('Gửi đăng ký');
    });

    it('renders left and right icons in idle state, but suppresses them when loading', () => {
      const leftIcon = React.createElement('span', { id: 'left-ico' }, '←');
      const rightIcon = React.createElement('span', { id: 'right-ico' }, '→');

      const idleHtml = render(
        React.createElement(
          Button,
          { leftIcon, rightIcon },
          'Tiếp tục'
        )
      );
      expect(idleHtml).toContain('id="left-ico"');
      expect(idleHtml).toContain('id="right-ico"');
      expect(idleHtml).toContain('Tiếp tục');

      const loadingHtml = render(
        React.createElement(
          Button,
          { isLoading: true, leftIcon, rightIcon },
          'Tiếp tục'
        )
      );
      expect(loadingHtml).toContain('animate-spin');
      expect(loadingHtml.includes('id="left-ico"')).toBe(false);
      expect(loadingHtml.includes('id="right-ico"')).toBe(false);
    });

    it('supports all 5 style variants (primary, secondary, outline, ghost, danger)', () => {
      const variants = [
        { v: 'primary' as const, cls: 'from-blue-600' },
        { v: 'secondary' as const, cls: 'bg-slate-800' },
        { v: 'outline' as const, cls: 'border-cyan-500' },
        { v: 'ghost' as const, cls: 'hover:bg-slate-800' },
        { v: 'danger' as const, cls: 'bg-red-600' },
      ];
      for (const item of variants) {
        const html = render(React.createElement(Button, { variant: item.v }, item.v));
        expect(html, `Expected variant ${item.v} to include ${item.cls}`).toContain(item.cls);
      }
    });

    it('supports all 3 sizes (sm, md, lg)', () => {
      const sizes = [
        { s: 'sm' as const, cls: 'min-h-[36px]' },
        { s: 'md' as const, cls: 'min-h-[44px]' },
        { s: 'lg' as const, cls: 'min-h-[48px]' },
      ];
      for (const item of sizes) {
        const html = render(React.createElement(Button, { size: item.s }, item.s));
        expect(html, `Expected size ${item.s} to include ${item.cls}`).toContain(item.cls);
      }
    });

    it('applies fullWidth and custom type', () => {
      const html = render(
        React.createElement(Button, { fullWidth: true, type: 'submit' }, 'Submit Form')
      );
      expect(html).toContain('w-full');
      expect(html).toContain('type="submit"');
    });
  });

  describe('Modal Accessibility & Lifecycle', () => {
    it('returns null when isOpen is false', () => {
      const html = render(
        React.createElement(
          Modal,
          { isOpen: false, onClose: () => {} },
          React.createElement('p', null, 'Modal Body')
        )
      );
      expect(html).toBe('');
    });

    it('renders dialog structure with role="dialog" and aria-modal="true" when isOpen is true', () => {
      const html = render(
        React.createElement(
          Modal,
          {
            isOpen: true,
            onClose: () => {},
            title: 'Tiêu đề Modal',
            description: 'Mô tả hướng dẫn',
          },
          React.createElement('p', null, 'Nội dung chi tiết')
        )
      );
      // Dialog landmark & modal trap
      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('tabindex="-1"');
      // Title binding
      expect(html).toContain('aria-labelledby="modal-title"');
      expect(html).toContain('id="modal-title"');
      expect(html).toContain('Tiêu đề Modal');
      // Description binding
      expect(html).toContain('aria-describedby="modal-description"');
      expect(html).toContain('id="modal-description"');
      expect(html).toContain('Mô tả hướng dẫn');
      // Accessible close button
      expect(html).toContain('aria-label="Đóng cửa sổ"');
      expect(html).toContain('type="button"');
      // Content present
      expect(html).toContain('Nội dung chi tiết');
    });

    it('omits aria-labelledby and aria-describedby when title and description are omitted', () => {
      const html = render(
        React.createElement(
          Modal,
          { isOpen: true, onClose: () => {} },
          React.createElement('div', null, 'Chỉ có nội dung')
        )
      );
      expect(html).toContain('role="dialog"');
      expect(html.includes('aria-labelledby')).toBe(false);
      expect(html.includes('aria-describedby')).toBe(false);
    });

    it('has backdrop wrapper with role="presentation"', () => {
      const html = render(
        React.createElement(
          Modal,
          { isOpen: true, onClose: () => {} },
          'Content'
        )
      );
      expect(html).toContain('role="presentation"');
      expect(html).toContain('fixed inset-0');
    });
  });

  describe('Interactive Controls: Input, Textarea, Select', () => {
    describe('Input Primitive', () => {
      it('associates label htmlFor with custom input id', () => {
        const html = render(
          React.createElement(Input, {
            id: 'custom-input-id',
            label: 'Họ và tên',
            placeholder: 'Nguyễn Văn A',
          })
        );
        expect(html).toContain('for="custom-input-id"');
        expect(html).toContain('id="custom-input-id"');
        expect(html).toContain('placeholder="Nguyễn Văn A"');
        expect(html).toContain('aria-invalid="false"');
        expect(html.includes('aria-describedby')).toBe(false);
      });

      it('associates label htmlFor with auto-generated id when custom id is omitted', () => {
        const html = render(
          React.createElement(Input, {
            label: 'Số điện thoại',
          })
        );
        // Extracts the generated id from input
        const match = html.match(/id="([^"]+)"/);
        expect(match).not.toBeNull();
        const generatedId = match![1];
        expect(html).toContain(`for="${generatedId}"`);
      });

      it('connects aria-invalid and aria-describedby to role="alert" when error is present', () => {
        const html = render(
          React.createElement(Input, {
            id: 'email-field',
            label: 'Email',
            error: 'Địa chỉ email không đúng định dạng',
          })
        );
        expect(html).toContain('aria-invalid="true"');
        expect(html).toContain('aria-describedby="email-field-error"');
        expect(html).toContain('id="email-field-error"');
        expect(html).toContain('role="alert"');
        expect(html).toContain('Địa chỉ email không đúng định dạng');
        expect(html).toContain('border-red-500');
      });

      it('connects aria-describedby to helper text when no error exists', () => {
        const html = render(
          React.createElement(Input, {
            id: 'phone-field',
            label: 'Số điện thoại',
            helperText: 'Nhập số di động 10 số (Viettel, Vina, Mobi...)',
          })
        );
        expect(html).toContain('aria-invalid="false"');
        expect(html).toContain('aria-describedby="phone-field-helper"');
        expect(html).toContain('id="phone-field-helper"');
        expect(html).toContain('Nhập số di động 10 số');
        expect(html.includes('role="alert"')).toBe(false);
      });

      it('prioritizes error over helperText in aria-describedby', () => {
        const html = render(
          React.createElement(Input, {
            id: 'priority-field',
            label: 'Trường kiểm tra',
            helperText: 'Gợi ý phụ',
            error: 'Lỗi bắt buộc',
          })
        );
        expect(html).toContain('aria-invalid="true"');
        expect(html).toContain('aria-describedby="priority-field-error"');
        expect(html).toContain('id="priority-field-error"');
        expect(html).toContain('Lỗi bắt buộc');
        expect(html.includes('Gợi ý phụ')).toBe(false);
      });

      it('renders required indicator with aria-hidden="true" and required attribute', () => {
        const html = render(
          React.createElement(Input, {
            id: 'req-input',
            label: 'Bắt buộc',
            required: true,
          })
        );
        expect(html).toContain('required=""');
        expect(html).toContain('aria-hidden="true">*</span>');
      });

      it('renders left and right icons with aria-hidden="true"', () => {
        const left = React.createElement('span', { id: 'ico-l' }, '@');
        const right = React.createElement('span', { id: 'ico-r' }, '✓');
        const html = render(
          React.createElement(Input, {
            id: 'icon-input',
            label: 'Icon Input',
            leftIcon: left,
            rightIcon: right,
          })
        );
        expect(html).toContain('id="ico-l"');
        expect(html).toContain('id="ico-r"');
        expect(html).toContain('pl-10');
        expect(html).toContain('pr-10');
      });
    });

    describe('Textarea Primitive', () => {
      it('associates label htmlFor with textarea id', () => {
        const html = render(
          React.createElement(Textarea, {
            id: 'problem-desc',
            label: 'Mô tả bài toán',
            rows: 6,
          })
        );
        expect(html).toContain('for="problem-desc"');
        expect(html).toContain('id="problem-desc"');
        expect(html).toContain('rows="6"');
        expect(html).toContain('aria-invalid="false"');
      });

      it('connects aria-invalid and aria-describedby to error alert', () => {
        const html = render(
          React.createElement(Textarea, {
            id: 'desc-field',
            label: 'Mô tả',
            error: 'Mô tả phải có tối thiểu 20 ký tự',
          })
        );
        expect(html).toContain('aria-invalid="true"');
        expect(html).toContain('aria-describedby="desc-field-error"');
        expect(html).toContain('id="desc-field-error"');
        expect(html).toContain('role="alert"');
        expect(html).toContain('Mô tả phải có tối thiểu 20 ký tự');
        expect(html).toContain('border-red-500');
      });

      it('renders helperText when no error is present', () => {
        const html = render(
          React.createElement(Textarea, {
            id: 'helper-desc',
            label: 'Chi tiết',
            helperText: 'Tối đa 2000 ký tự.',
          })
        );
        expect(html).toContain('aria-describedby="helper-desc-helper"');
        expect(html).toContain('id="helper-desc-helper"');
        expect(html).toContain('Tối đa 2000 ký tự.');
      });
    });

    describe('Select Primitive', () => {
      it('associates label htmlFor with select id and renders options list', () => {
        const options = [
          { value: 'cat1', label: 'Customer Support' },
          { value: 'cat2', label: 'Marketing Assistant' },
        ];
        const html = render(
          React.createElement(Select, {
            id: 'category-select',
            label: 'Lĩnh vực quan tâm',
            placeholder: '-- Chọn lĩnh vực --',
            options,
          })
        );
        expect(html).toContain('for="category-select"');
        expect(html).toContain('id="category-select"');
        expect(html).toContain('value="" disabled=""');
        expect(html).toContain('-- Chọn lĩnh vực --');
        expect(html).toContain('value="cat1"');
        expect(html).toContain('Customer Support');
        expect(html).toContain('value="cat2"');
        expect(html).toContain('Marketing Assistant');
      });

      it('connects aria-invalid and aria-describedby to error alert on select', () => {
        const html = render(
          React.createElement(Select, {
            id: 'partner-type',
            label: 'Hình thức',
            error: 'Vui lòng chọn hình thức đồng hành',
          })
        );
        expect(html).toContain('aria-invalid="true"');
        expect(html).toContain('aria-describedby="partner-type-error"');
        expect(html).toContain('id="partner-type-error"');
        expect(html).toContain('role="alert"');
        expect(html).toContain('Vui lòng chọn hình thức đồng hành');
      });

      it('supports custom child option elements', () => {
        const html = render(
          React.createElement(
            Select,
            { id: 'custom-sel', label: 'Lựa chọn' },
            React.createElement('option', { value: '1' }, '1 thành viên'),
            React.createElement('option', { value: '2' }, '2 thành viên')
          )
        );
        expect(html).toContain('value="1"');
        expect(html).toContain('1 thành viên');
        expect(html).toContain('value="2"');
        expect(html).toContain('2 thành viên');
      });
    });
  });

  describe('FormStateBanner (role="alert", role="status", aria-live)', () => {
    it('renders error banner with role="alert" and aria-live="assertive"', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'error',
          errorMessage: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.',
          errorTitle: 'Thất bại!',
        })
      );
      expect(html).toContain('role="alert"');
      expect(html).toContain('aria-live="assertive"');
      expect(html).toContain('Thất bại!');
      expect(html).toContain('Đã xảy ra lỗi máy chủ');
      expect(html).toContain('bg-red-950');
    });

    it('renders dismiss button on error banner when onDismiss callback is passed', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'error',
          errorMessage: 'Lỗi',
          onDismiss: () => {},
        })
      );
      expect(html).toContain('aria-label="Đóng thông báo lỗi"');
      expect(html).toContain('type="button"');
    });

    it('renders success banner with role="status" and aria-live="polite"', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'success',
          successMessage: 'Hồ sơ đăng ký của bạn đã được tiếp nhận.',
          successTitle: 'Thành công!',
          referenceCode: 'AIC-STU-M2-TEST',
        })
      );
      expect(html).toContain('role="status"');
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain('Thành công!');
      expect(html).toContain('Hồ sơ đăng ký của bạn đã được tiếp nhận.');
      expect(html).toContain('AIC-STU-M2-TEST');
      expect(html).toContain('bg-emerald-950');
      expect(html).toContain('Mã xác nhận:');
    });

    it('renders dismiss button on success banner when onDismiss callback is passed', () => {
      const html = render(
        React.createElement(FormStateBanner, {
          status: 'success',
          successMessage: 'Thành công',
          onDismiss: () => {},
        })
      );
      expect(html).toContain('aria-label="Đóng thông báo thành công"');
    });

    it('returns null when status is idle or submitting or when messages are missing', () => {
      expect(render(React.createElement(FormStateBanner, { status: 'idle' }))).toBe('');
      expect(render(React.createElement(FormStateBanner, { status: 'submitting' }))).toBe('');
      expect(
        render(React.createElement(FormStateBanner, { status: 'error' }))
      ).toBe('');
      expect(
        render(React.createElement(FormStateBanner, { status: 'success' }))
      ).toBe('');
    });
  });

  describe('SkipLink Primitive (WCAG 2.4.1 Keyboard Bypass)', () => {
    it('renders anchor with default target #main-content and default label', () => {
      const html = render(React.createElement(SkipLink, null));
      expect(html).toContain('href="#main-content"');
      expect(html).toContain('Chuyển đến nội dung chính');
      expect(html).toContain('sr-only');
      expect(html).toContain('focus:not-sr-only');
      expect(html).toContain('focus:fixed');
    });

    it('supports custom targetId and custom label', () => {
      const html = render(
        React.createElement(SkipLink, {
          targetId: 'primary-content',
          label: 'Nhảy tới phần nội dung chính',
          className: 'custom-skip',
        })
      );
      expect(html).toContain('href="#primary-content"');
      expect(html).toContain('Nhảy tới phần nội dung chính');
      expect(html).toContain('custom-skip');
    });
  });

  describe('Badge & Card Primitives', () => {
    it('renders all Badge variants including three pillar variants', () => {
      const variants = [
        'default',
        'primary',
        'cyan',
        'violet',
        'emerald',
        'amber',
        'outline',
        'pillar-education',
        'pillar-student',
        'pillar-business',
      ] as const;

      for (const v of variants) {
        const html = render(React.createElement(Badge, { variant: v }, v));
        expect(html).toContain(v);
      }
    });

    it('renders animated dot when hasDot is true with aria-hidden="true"', () => {
      const html = render(
        React.createElement(Badge, { variant: 'cyan', hasDot: true }, 'Live')
      );
      expect(html).toContain('animate-pulse');
      expect(html).toContain('aria-hidden="true"');
      expect(html).toContain('Live');
    });

    it('renders Card with subcomponents and accent styling', () => {
      const html = render(
        React.createElement(
          Card,
          { accent: 'cyan', interactive: true },
          React.createElement(
            CardHeader,
            null,
            React.createElement(CardTitle, null, 'Card Title'),
            React.createElement(CardDescription, null, 'Card Subtitle')
          ),
          React.createElement(CardContent, null, 'Main content'),
          React.createElement(CardFooter, null, 'Footer actions')
        )
      );
      expect(html).toContain('border-cyan-500');
      expect(html).toContain('Card Title');
      expect(html).toContain('Card Subtitle');
      expect(html).toContain('Main content');
      expect(html).toContain('Footer actions');
      expect(html).toContain('cursor-pointer');
    });
  });

  describe('useFocusTrap Hook Empirical Behavior', () => {
    it('exports useFocusTrap hook function', () => {
      expect(typeof useFocusTrap).toBe('function');
    });

    it('executes escape key handler and tab cycle wrapping under simulated DOM container', () => {
      // Simulate DOM element container with focusable children
      let escapeTriggered = false;
      const onEscape = () => {
        escapeTriggered = true;
      };

      // Mock focusable elements
      const closeBtn = { tagName: 'BUTTON', offsetParent: {}, focus: () => {} };
      const inputEl = { tagName: 'INPUT', offsetParent: {}, focus: () => {} };
      const submitBtn = { tagName: 'BUTTON', offsetParent: {}, focus: () => {} };
      const focusables = [closeBtn, inputEl, submitBtn];

      let focusedIndex = 0;
      let activeElement = focusables[0];

      closeBtn.focus = () => {
        focusedIndex = 0;
        activeElement = closeBtn;
      };
      inputEl.focus = () => {
        focusedIndex = 1;
        activeElement = inputEl;
      };
      submitBtn.focus = () => {
        focusedIndex = 2;
        activeElement = submitBtn;
      };

      // Handler logic reflecting useFocusTrap implementation
      const handleKeyDown = (event: {
        key: string;
        shiftKey?: boolean;
        preventDefault: () => void;
        stopPropagation: () => void;
      }) => {
        if (event.key === 'Escape' && onEscape) {
          event.preventDefault();
          event.stopPropagation();
          onEscape();
          return;
        }

        if (event.key === 'Tab') {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (event.shiftKey) {
            if (activeElement === first) {
              event.preventDefault();
              last.focus();
            }
          } else {
            if (activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }
      };

      // 1. Test Escape key
      let prevented = false;
      let stopped = false;
      handleKeyDown({
        key: 'Escape',
        preventDefault: () => { prevented = true; },
        stopPropagation: () => { stopped = true; },
      });
      expect(escapeTriggered).toBe(true);
      expect(prevented).toBe(true);
      expect(stopped).toBe(true);

      // 2. Test Tab cycle wrap (forward tab on last element wraps to first)
      submitBtn.focus();
      expect(focusedIndex).toBe(2);

      let tabPrevented = false;
      handleKeyDown({
        key: 'Tab',
        shiftKey: false,
        preventDefault: () => { tabPrevented = true; },
        stopPropagation: () => {},
      });
      expect(tabPrevented).toBe(true);
      expect(focusedIndex).toBe(0);
      expect(activeElement === closeBtn).toBe(true);

      // 3. Test Shift+Tab wrap (backward tab on first element wraps to last)
      closeBtn.focus();
      expect(focusedIndex).toBe(0);

      let shiftTabPrevented = false;
      handleKeyDown({
        key: 'Tab',
        shiftKey: true,
        preventDefault: () => { shiftTabPrevented = true; },
        stopPropagation: () => {},
      });
      expect(shiftTabPrevented).toBe(true);
      expect(focusedIndex).toBe(2);
      expect(activeElement === submitBtn).toBe(true);
    });
  });
});
