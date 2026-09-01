'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative blobs */}
      <div className="relative mb-6">
        <div className="absolute -inset-6 rounded-full bg-brand-red/10 blur-xl" aria-hidden="true" />
        <span className="relative text-8xl select-none" aria-hidden="true">😵</span>
      </div>

      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        Erro inesperado
      </p>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">
        Algo deu errado
      </h1>
      <p className="text-foreground-muted text-sm max-w-xs mb-8">
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
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-brand-yellow text-neutral-900 hover:bg-brand-yellow-dark active:scale-95 transition-all duration-150"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-surface border border-border text-foreground hover:border-brand-yellow active:scale-95 transition-all duration-150"
        >
          Ir para o cardápio
        </a>
      </div>

      <p className="mt-12 text-xs text-foreground-muted">
        <span className="font-extrabold text-brand-red">Pastel da Hora</span>
      </p>
    </div>
  );
}