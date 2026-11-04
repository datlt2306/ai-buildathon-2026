import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FormStateBannerProps {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
  errorTitle?: string;
  successMessage?: string;
  successTitle?: string;
  referenceCode?: string;
  onDismiss?: () => void;
  className?: string;
}

export const FormStateBanner: React.FC<FormStateBannerProps> = ({
  status,
  errorMessage,
  errorTitle = 'Có lỗi xảy ra',
  successMessage,
  successTitle = 'Gửi thông tin thành công!',
  referenceCode,
  onDismiss,
  className,
}) => {
  if (status === 'error' && errorMessage) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={cn(
          'p-4 mb-5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 flex items-start gap-3 shadow-lg animate-in fade-in duration-200',
          className
        )}
      >
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-red-100">{errorTitle}</h4>
          <p className="text-xs text-red-300 mt-1 leading-relaxed break-words">{errorMessage}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Đóng thông báo lỗi"
            className="text-red-400 hover:text-red-200 p-1 -mr-1 -mt-1 rounded transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }

  if (status === 'success' && successMessage) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'p-5 mb-5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 flex items-start gap-3 shadow-lg animate-in fade-in duration-200',
          className
        )}
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <h4 className="font-semibold text-sm text-emerald-100">{successTitle}</h4>
          <p className="text-xs text-emerald-300 leading-relaxed">{successMessage}</p>
          {referenceCode && (
            <div className="pt-1">
              <span className="text-xs text-emerald-300 font-mono bg-emerald-900/40 border border-emerald-500/30 px-2.5 py-1 rounded-md inline-block">
                Mã xác nhận: <strong className="font-bold text-white tracking-wider">{referenceCode}</strong>
              </span>
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Đóng thông báo thành công"
            className="text-emerald-400 hover:text-emerald-200 p-1 -mr-1 -mt-1 rounded transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }

  return null;
};
