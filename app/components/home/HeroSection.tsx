import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function HeroSection() {
  const t = await getTranslations('home');

  return (
    <section
      className="
        relative overflow-hidden
        min-h-[85dvh] md:min-h-[70vh]
        flex flex-col items-center justify-center
        bg-gradient-to-br from-brand-red via-red-900 to-neutral-950
        px-4 py-20 text-center
      "
      aria-label={t('heroTitle')}
    >
      {/* Círculos decorativos */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo central */}
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl mx-auto">
        <Image
          src="https://res.cloudinary.com/exercice-disp/image/upload/v1786051101/WhatsApp_Image_2026-08-06_at_6.12.53_PM_h4fahm.jpg"
          alt={t('heroTitle')}
          width={208}
          height={208}
          className="rounded-4xl object-cover border border-white/15 bg-white/5 shadow-2xl md:h-52 md:w-52"
          priority
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          {t('heroTitle')}
        </h1>

        <p className="text-lg md:text-xl text-white/75 max-w-sm leading-relaxed">
          {t('heroSubtitle')}
        </p>

        <Link
          href="/cardapio"
          className="
            mt-2 inline-flex items-center justify-center gap-2
            px-8 py-4 rounded-xl text-lg font-bold
            bg-brand-yellow text-neutral-900
            hover:bg-brand-yellow-dark
            active:scale-95 transition-all duration-150
            min-h-[52px] shadow-lg shadow-black/20
          "
        >
          {t('ctaMenu')}
        </Link>
      </div>

      {/* Separador curvo entre hero e conteúdo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14 bg-background"
        style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
        aria-hidden="true"
      />
    </section>
  );
}
