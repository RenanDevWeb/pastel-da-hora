import { getTranslations } from 'next-intl/server';
import { Clock } from 'lucide-react';

export default async function AboutSection() {
  const t = await getTranslations('home');

  return (
    <section
      className="py-14 px-4 bg-background-subtle border-y border-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* Texto sobre o estabelecimento */}
        <div>
          <h2
            id="about-heading"
            className="text-2xl md:text-3xl font-extrabold text-foreground mb-4"
          >
            {t('aboutTitle')}
          </h2>
          <p className="text-foreground-muted leading-relaxed text-base">
            {t('aboutText')}
          </p>
        </div>

        {/* Card de horários */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock
              size={18}
              className="text-brand-yellow shrink-0"
              aria-hidden="true"
            />
            <h3 className="font-bold text-foreground">{t('hoursTitle')}</h3>
          </div>

          <ul className="space-y-3" role="list">
            <li className="flex items-start gap-3 text-sm">
              <span
                className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-foreground-muted">{t('hoursWeekdays')}</span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span
                className="w-2 h-2 rounded-full bg-brand-red mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-foreground-muted">{t('hoursWeekends')}</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
