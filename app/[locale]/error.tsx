'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { RotateCcw, UtensilsCrossed } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative icon */}
      <div className="relative mb-6">
        <div className="absolute -inset-8 rounded-full bg-brand-red/10 blur-2xl" aria-hidden="true" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-red/20 to-brand-red/5 border border-brand-red/20 flex items-center justify-center">
          <span className="text-4xl select-none" aria-hidden="true">😵</span>
        </div>
      </div>

      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        {t('generic')}
      </p>
      <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
        Algo deu errado
      </h1>
      <p className="text-foreground-muted text-sm max-w-xs mb-8 leading-relaxed">
        Um problema inesperado aconteceu. Tente novamente ou volte ao cardápio.
      </p>

      {process.env.NODE_ENV === 'development' && error.message && (
        <p className="text-xs text-foreground-muted bg-surface border border-border rounded-xl px-4 py-2.5 mb-6 font-mono max-w-sm break-all">
          {error.message}
        </p>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-brand-yellow text-neutral-900 hover:bg-brand-yellow-dark active:scale-95 transition-all duration-150"
        >
          <RotateCcw size={16} aria-hidden="true" />
          {t('tryAgain')}
        </button>
        <Link
          href="/cardapio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-surface border border-border text-foreground hover:border-brand-yellow active:scale-95 transition-all duration-150"
        >
          <UtensilsCrossed size={16} aria-hidden="true" />
          {t('backHome')}
        </Link>
      </div>

      <p className="mt-12 text-xs">
        <span className="font-extrabold text-brand-red">Pastel da Hora</span>
      </p>
    </div>
  );
}
