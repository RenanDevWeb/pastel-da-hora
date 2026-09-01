import { forwardRef, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-yellow text-neutral-900 hover:bg-brand-yellow-dark active:scale-95',
  secondary:
    'bg-brand-red text-white hover:bg-brand-red-dark active:scale-95',
  ghost:
    'border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-neutral-900 active:scale-95',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', type = 'button', children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-xl font-semibold',
        'min-h-11 min-w-11',
        'transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
export default Button;
