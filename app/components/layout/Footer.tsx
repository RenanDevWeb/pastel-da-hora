import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import BusinessHours from "../ui/BusinessHours";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    /* pb-16 md:pb-0 garante visibilidade acima do BottomNav fixo no mobile */
    <footer className="mt-auto border-t border-border bg-background-subtle pb-24 md:pb-0">
      <div className="mx-auto max-w-5xl px-3 py-4">
        <div className="grid gap-2.5 min-[720px]:grid-cols-2 min-[720px]:gap-3">
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-background/70 p-3 shadow-sm shadow-black/5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-extrabold text-brand-red">
                Pastel da Hora
              </p>
              <span className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-brand-yellow-dark">
                Delivery
              </span>
            </div>

            <div className="rounded-xl border border-border bg-background-subtle/80 p-2.5">
              <BusinessHours />
            </div>

            <a
              href="https://www.instagram.com/pasteldahora/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagramAria")}
              className="group relative mt-auto flex h-36 w-full items-center justify-center overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[720px]:flex-1 min-[720px]:h-auto"
            >
              <Image
                src="https://res.cloudinary.com/exercice-disp/image/upload/v1786052556/WhatsApp_Image_2026-08-06_at_6.12.53_PM_1_qysqkm.jpg"
                alt="Logo_Instagram"
                fill
                sizes="(max-width: 760px) 100vw, 24rem"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-linear-to-br from-pink-500/70 via-purple-600/50 to-yellow-400/40"
                aria-hidden="true"
              />

              <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

              <FaInstagram
                className="relative z-10 text-4xl text-white drop-shadow"
                aria-hidden="true"
              />

              <span className="absolute bottom-3 right-3 z-10 inline-flex items-center rounded-full bg-white/12 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                {t("instagram")}
              </span>
            </a>
          </div>

          <address className="not-italic rounded-2xl border border-border bg-background/70 p-3 shadow-sm shadow-black/5">
            <div className="mb-2 flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground-muted">
                Nossa localização
              </p>
              <div className="flex items-start gap-2 rounded-xl border border-border bg-background-subtle/70 px-2.5 py-1.5 text-[11px] leading-snug text-foreground-muted">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-brand-yellow"
                  aria-hidden="true"
                />
                <span>Rua Barão de Moreno, 486 — Jaboatão Centro, PE</span>
              </div>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[5/3] min-[720px]:aspect-[3/2]">
              <iframe
                src="https://maps.google.com/maps?q=Rua+Bar%C3%A3o+de+Moreno%2C+486%2C+Jaboat%C3%A3o+dos+Guararapes%2C+PE%2C+Brazil&output=embed&z=16"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Pastel da Hora"
                className="block h-full w-full"
                style={{ border: 0 }}
              />
            </div>
          </address>
        </div>
      </div>
    </footer>
  );
}
