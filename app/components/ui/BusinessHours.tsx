'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

function getStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=Dom, 6=Sáb
  const hour = now.getHours() + now.getMinutes() / 60;
  const isWeekend = day === 0 || day === 6;
  const closeHour = isWeekend ? 23 : 22;
  return { open: hour >= 10 && hour < closeHour };
}

interface BusinessHoursProps {
  compact?: boolean;
}

export default function BusinessHours({ compact = false }: BusinessHoursProps) {
  const [status, setStatus] = useState<{ open: boolean } | null>(null);

  useEffect(() => {
    setStatus(getStatus());
  }, []);

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-1.5 px-4 py-1.5 text-[10px] text-foreground-muted">
        <span
          className={[
            'w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300',
            status === null
              ? 'bg-border'
              : status.open
              ? 'bg-green-500'
              : 'bg-neutral-400',
          ].join(' ')}
          aria-hidden="true"
        />
        <span className="font-medium">
          {status === null ? '\u00a0' : status.open ? 'Aberto agora' : 'Fechado'}
        </span>
        <span aria-hidden="true" className="opacity-30">·</span>
        <span>Seg–Sex 10h–22h&nbsp;&nbsp;Sáb–Dom 10h–23h</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Clock size={11} className="text-brand-yellow shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold text-foreground">Horário de funcionamento</span>
        {status !== null && (
          <span
            className={[
              'ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full',
              status.open
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400',
            ].join(' ')}
          >
            {status.open ? 'Aberto' : 'Fechado'}
          </span>
        )}
      </div>
      <p className="text-xs text-foreground-muted flex justify-between gap-4">
        <span>Seg — Sex</span>
        <span>10h às 22h</span>
      </p>
      <p className="text-xs text-foreground-muted flex justify-between gap-4">
        <span>Sáb — Dom</span>
        <span>10h às 23h</span>
      </p>
    </div>
  );
}
