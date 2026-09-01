import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { Link } from '@/i18n/navigation';
import { UtensilsCrossed } from 'lucide-react';

export default async function NotFound() {
  const headersList = await headers();
  const locale = headersList.get('x-next-intl-locale') ?? 'pt-BR';
  const t = await getTranslations({ locale, namespace: 'errors' });

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* 404 com brilho da marca */}
      <div className="relative mb-2">
        <div className="absolute -inset-8 rounded-full bg-brand-yellow/15 blur-2xl" aria-hidden="true" />
        <p
          className="relative text-[96px] md:text-[120px] font-extrabold text-brand-yellow leading-none select-none"
          aria-hidden="true"
        >
          404
        </p>
      </div>

      <span className="text-5xl select-none mb-5" aria-hidden="true">🥟</span>

      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        {t('notFound')}
      </p>
      <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
        Ops! Essa página sumiu
      </h1>
      <p className="text-foreground-muted text-sm max-w-xs mb-8 leading-relaxed">
        {t('notFoundDescription')}
      </p>

      <Link
        href="/cardapio"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-brand-yellow text-neutral-900 hover:bg-brand-yellow-dark active:scale-95 transition-all duration-150"
      >
        <UtensilsCrossed size={16} aria-hidden="true" />
        {t('backHome')}
      </Link>

      <p className="mt-12 text-xs">
        <span className="font-extrabold text-brand-red">Pastel da Hora</span>
      </p>
    </div>
  );
}
