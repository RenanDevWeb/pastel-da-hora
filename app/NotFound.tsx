import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Brand accent */}
      <div className="relative mb-4">
        <div className="absolute -inset-8 rounded-full bg-brand-yellow/10 blur-2xl" aria-hidden="true" />
        <p
          className="relative text-[100px] font-extrabold text-brand-yellow leading-none select-none"
          aria-hidden="true"
        >
          404
        </p>
      </div>

      <span className="text-4xl select-none mb-4" aria-hidden="true">🥟</span>

      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        Página não encontrada
      </p>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">
        Ops! Essa página sumiu
      </h1>
      <p className="text-foreground-muted text-sm max-w-xs mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-brand-yellow text-neutral-900 hover:bg-brand-yellow-dark active:scale-95 transition-all duration-150"
      >
        ← Voltar ao cardápio
      </Link>

      <p className="mt-12 text-xs text-foreground-muted">
        <span className="font-extrabold text-brand-red">Pastel da Hora</span>
      </p>
    </div>
  );
}