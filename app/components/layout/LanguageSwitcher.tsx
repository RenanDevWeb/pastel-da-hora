'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={t('label')}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleChange(loc)}
          aria-current={loc === locale ? 'true' : undefined}
          className={[
            'px-2 py-1 rounded-lg text-xs font-semibold transition-colors duration-150',
            loc === locale
              ? 'bg-brand-yellow text-neutral-900'
              : 'text-foreground-muted hover:text-foreground',
          ].join(' ')}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
