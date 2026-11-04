import React from 'react';

export interface SkipLinkProps {
  targetId?: string;
  label?: string;
  className?: string;
}

/**
 * WCAG 2.4.1 Skip to main content link for keyboard navigation accessibility
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  label = 'Chuyển đến nội dung chính',
  className = '',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white ${className}`}
    >
      {label}
    </a>
  );
};
