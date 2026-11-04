import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  interactive?: boolean;
  accent?: 'none' | 'cyan' | 'blue' | 'violet';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      glowOnHover = true,
      interactive = false,
      accent = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const accentStyles = {
      none: 'border-slate-800/80',
      cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-glow-cyan/10',
      blue: 'border-blue-500/30 hover:border-blue-400/60 shadow-glow-blue/10',
      violet: 'border-violet-500/30 hover:border-violet-400/60',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl bg-slate-900/80 backdrop-blur-md border p-6 transition-all duration-300',
          accentStyles[accent],
          glowOnHover &&
            'hover:border-slate-700/80 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-cyan-950/20',
          interactive &&
            'cursor-pointer hover:-translate-y-1 active:translate-y-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg sm:text-xl font-bold tracking-tight text-white', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-400 leading-relaxed', className)} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4 mt-auto border-t border-slate-800/60', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';
