import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'outline'
  | 'pillar-education'
  | 'pillar-student'
  | 'pillar-business';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  hasDot?: boolean;
}

const variantStyles: Record<BadgeVariant, { badge: string; dot: string }> = {
  default: {
    badge: 'bg-slate-800/90 text-slate-300 border-slate-700/80',
    dot: 'bg-slate-400',
  },
  primary: {
    badge: 'bg-blue-950/60 text-blue-300 border-blue-500/40 shadow-sm',
    dot: 'bg-blue-400',
  },
  cyan: {
    badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-sm',
    dot: 'bg-cyan-400',
  },
  violet: {
    badge: 'bg-violet-950/60 text-violet-300 border-violet-500/40 shadow-sm',
    dot: 'bg-violet-400',
  },
  emerald: {
    badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-sm',
    dot: 'bg-emerald-400',
  },
  amber: {
    badge: 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-sm',
    dot: 'bg-amber-400',
  },
  outline: {
    badge: 'bg-transparent text-slate-300 border-slate-700 hover:border-slate-600',
    dot: 'bg-slate-400',
  },
  'pillar-education': {
    badge: 'bg-amber-950/50 text-amber-300 border-amber-500/40',
    dot: 'bg-amber-400',
  },
  'pillar-student': {
    badge: 'bg-cyan-950/50 text-cyan-300 border-cyan-500/40',
    dot: 'bg-cyan-400',
  },
  'pillar-business': {
    badge: 'bg-blue-950/50 text-blue-300 border-blue-500/40',
    dot: 'bg-blue-400',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs font-medium rounded-md gap-1.5',
  md: 'px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'sm',
  hasDot = false,
  children,
  ...props
}) => {
  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={cn(
        'inline-flex items-center border tracking-wide uppercase select-none transition-colors',
        currentVariant.badge,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {hasDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', currentVariant.dot)}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
