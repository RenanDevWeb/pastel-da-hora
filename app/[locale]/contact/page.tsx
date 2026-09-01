import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Clock, AtSign } from 'lucide-react';
import Card from '@/app/components/ui/Card';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');
  const phoneRaw = t('phoneValue').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${phoneRaw}`;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(t('addressValue'))}`;

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-red via-red-900 to-neutral-950 px-4 py-14 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          {t('title')}
        </h1>
        <p className="text-white/75 text-lg max-w-sm mx-auto">{t('subtitle')}</p>
      </section>

      {/* Cards de contato */}
      <div className="max-w-3xl mx-auto px-4 py-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">

        {/* Endereço */}
        <Card className="p-6 flex flex-col gap-3">
          <MapPin size={24} className="text-brand-yellow" aria-hidden="true" />
          <div>
            <h2 className="font-bold text-foreground mb-1">{t('addressTitle')}</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {t('addressValue')}
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors mt-auto"
          >
            {t('mapLink')} →
          </a>
        </Card>

        {/* Telefone & WhatsApp */}
        <Card className="p-6 flex flex-col gap-3">
          <Phone size={24} className="text-brand-yellow" aria-hidden="true" />
          <div>
            <h2 className="font-bold text-foreground mb-1">{t('phoneTitle')}</h2>
            <a
              href={`tel:+55${phoneRaw}`}
              className="text-sm text-foreground-muted hover:text-brand-red transition-colors"
            >
              {t('phoneValue')}
            </a>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors mt-auto"
          >
            {t('whatsapp')} →
          </a>
        </Card>

        {/* Horários */}
        <Card className="p-6 flex flex-col gap-3 sm:col-span-2 md:col-span-1">
          <Clock size={24} className="text-brand-yellow" aria-hidden="true" />
          <div>
            <h2 className="font-bold text-foreground mb-3">{t('hoursTitle')}</h2>
            <ul className="space-y-2" role="list">
              <li className="flex items-start gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 shrink-0" aria-hidden="true" />
                <span className="text-foreground-muted">{t('weekdays')}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-brand-red mt-1.5 shrink-0" aria-hidden="true" />
                <span className="text-foreground-muted">{t('weekends')}</span>
              </li>
            </ul>
          </div>
        </Card>

      </div>

      {/* Redes sociais */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Card className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AtSign size={22} className="text-brand-yellow shrink-0" aria-hidden="true" />
            <div>
              <p className="font-bold text-foreground text-sm">{t('socialTitle')}</p>
              <p className="text-foreground-muted text-sm">{t('instagram')}</p>
            </div>
          </div>
          <a
            href={`https://instagram.com/${t('instagram').replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors shrink-0"
          >
            Seguir →
          </a>
        </Card>
      </div>
    </>
  );
}
