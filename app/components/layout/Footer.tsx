import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';
import SocialMedia from '../ui/SocialMedia';
import BusinessHours from '../ui/BusinessHours';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    /* pb-16 md:pb-0 garante visibilidade acima do BottomNav fixo no mobile */
    <footer className="bg-background-subtle border-t border-border mt-auto pb-24 md:pb-0">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-5">



        {/* Marca + contato */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <p className="font-extrabold text-base text-brand-red">Pastel da Hora</p>
            <div className="mt-2 mb-2">
              <BusinessHours />
            </div>
            <p className="text-xs text-foreground-muted mt-1">
              {t('rights', { year })}
            </p>
          </div>

          <address className="not-italic flex flex-col gap-1.5">
            <p className="flex items-center gap-2 text-sm text-foreground-muted">
              <MapPin size={14} className="text-brand-yellow shrink-0" aria-hidden="true" />
              Rua Barão de Moreno, 486 — Jaboatão Centro, PE
            </p>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden border border-border h-48 w-full">
              <iframe
                src="https://maps.google.com/maps?q=Rua+Bar%C3%A3o+de+Moreno%2C+486%2C+Jaboat%C3%A3o+dos+Guararapes%2C+PE%2C+Brazil&output=embed&z=16"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Pastel da Hora"
                className="block"
                style={{ border: 0 }}
              />
            </div>

            <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div>
                {/* Redes Sociais*/}
                <SocialMedia />
              </div>
            </div>
          </address>
        </div>
      </div>
    </footer>
  );
}