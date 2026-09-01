'use client';

import { useState, useEffect, useRef } from 'react';

function isStoreOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= 10 && hour < (day === 0 || day === 6 ? 23 : 22);
}

export default function CardapioHero() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    setOpen(isStoreOpen());
    setHeight(innerRef.current?.offsetHeight);
  }, []);

  useEffect(() => {
    function onScroll() {
      setHidden(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeHour = typeof window !== 'undefined'
    ? (new Date().getDay() === 0 || new Date().getDay() === 6 ? '23h' : '22h')
    : '22h';

  return (
    <div
      style={{ height: hidden ? 0 : height, opacity: hidden ? 0 : 1, overflow: 'hidden' }}
      className="transition-all duration-300 ease-in-out"
      aria-hidden={hidden}
    >
      <div ref={innerRef} className="relative bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-800 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -right-6 -bottom-6 w-44 h-44 rounded-full bg-brand-yellow/10" aria-hidden="true" />
        <div className="absolute right-16 -top-10 w-28 h-28 rounded-full bg-brand-red/10" aria-hidden="true" />

        <div className="relative z-10 px-5 py-6">
          <p className="text-brand-yellow font-extrabold text-2xl tracking-tight leading-none">
            Pastel da Hora
          </p>
          <p className="text-white/60 text-sm mt-1.5 leading-snug">
            Fresquinho, crocante e feito na hora para você
          </p>

          {open !== null && (
            <div className="flex items-center gap-2 mt-3">
              <span
                className={[
                  'w-2 h-2 rounded-full shrink-0',
                  open ? 'bg-green-400 animate-pulse' : 'bg-neutral-500',
                ].join(' ')}
                aria-hidden="true"
              />
              <span className="text-xs text-white/50">
                {open
                  ? `Aberto agora · Fecha às ${closeHour}`
                  : 'Fechado no momento · Abre às 10h'}
              </span>
            </div>
          )}
        </div>

        {/* Large decorative emoji */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-7xl select-none pointer-events-none opacity-[0.12]" aria-hidden="true">
          🥟
        </div>
      </div>
    </div>
  );
}
