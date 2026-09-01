"use client";

import Image from "next/image";

export default function CardapioHero() {
  return (
    <section className="w-full overflow-hidden">
      <Image
        src="https://res.cloudinary.com/exercice-disp/image/upload/v1786051101/WhatsApp_Image_2026-08-06_at_6.12.53_PM_h4fahm.jpg"
        alt="Pastel da Hora"
        width={1200}
        height={300}
        priority
        sizes="100vw"
        className="block w-full h-auto"
      />
    </section>
  );
}
