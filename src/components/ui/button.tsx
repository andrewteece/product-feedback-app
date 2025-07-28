'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition',
          variant === 'primary'
            ? 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
