import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-surface border border-border rounded-2xl',
        // Light mode: sombra sutil; Dark mode: sem sombra (border já define profundidade)
        'shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none',
        // No dark mode, clareia levemente a borda no hover para dar feedback visual
        'dark:hover:border-[#3d3d3d]',
        'transition-all duration-200',
        'overflow-hidden',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
