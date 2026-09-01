interface BadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Badge({ label, active = false, onClick }: BadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'px-4 py-2 rounded-full text-sm font-medium',
        'min-h-10 min-w-10 whitespace-nowrap',
        'transition-all duration-150',
        active
          ? 'bg-brand-yellow text-neutral-900 shadow-sm'
          : 'bg-surface text-foreground-muted border border-border hover:border-brand-yellow hover:text-foreground',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
