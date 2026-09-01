'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch — renderiza apenas após mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  // Usa resolvedTheme para resolver corretamente o tema "system"
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('toggleLight') : t('toggleDark')}
      className="
        w-10 h-10 rounded-xl
        flex items-center justify-center
        text-foreground hover:text-brand-yellow
        hover:bg-surface
        transition-colors duration-150
      "
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
