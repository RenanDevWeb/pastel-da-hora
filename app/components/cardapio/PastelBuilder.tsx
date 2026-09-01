'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft } from 'lucide-react';
import {
  RECHEIOS,
  RECHEIO_EMOJIS,
  MONTE_SEU_PASTEL_PRECOS,
  MONTE_SEU_PASTEL_LIMITES,
  formatPrice,
} from '@/lib/data/cardapio';
import type { MonteSeuPastelTamanho, Recheio } from '@/lib/data/cardapio';
import { useCart } from '@/lib/cart/cartContext';

interface PastelBuilderProps {
  open: boolean;
  onClose: () => void;
}

/** Tries to load a real photo; falls back to emoji while photos aren't in /public/images/recheios/ */
function RecheioThumb({ nome }: { nome: Recheio }) {
  const [err, setErr] = useState(false);
  const slug = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return err ? (
    <span className="text-base leading-none shrink-0" role="img" aria-hidden="true">
      {RECHEIO_EMOJIS[nome]}
    </span>
  ) : (
    <img
      src={`/images/recheios/${slug}.jpg`}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className="w-6 h-6 rounded-md object-cover shrink-0"
      onError={() => setErr(true)}
    />
  );
}

export default function PastelBuilder({ open, onClose }: PastelBuilderProps) {
  const t = useTranslations('builder');
  const tA11y = useTranslations('accessibility');
  const { addItem } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [tamanho, setTamanho] = useState<MonteSeuPastelTamanho | null>(null);
  const [recheios, setRecheios] = useState<Recheio[]>([]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setTamanho(null);
      setRecheios([]);
    }
  }, [open]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const limite = tamanho ? MONTE_SEU_PASTEL_LIMITES[tamanho] : 0;

  function toggleRecheio(r: Recheio) {
    setRecheios((prev) =>
      prev.includes(r)
        ? prev.filter((x) => x !== r)
        : prev.length < limite
        ? [...prev, r]
        : prev,
    );
  }

  function handleSelectTamanho(size: MonteSeuPastelTamanho) {
    setTamanho(size);
    setRecheios([]);
    setStep(2);
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm pdh-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="builder-title"
        className="pdh-modal-content"
      >
        {/* Handle visual (mobile) */}
        <div
          className="md:hidden mx-auto mt-3 mb-1 w-10 h-1 rounded-full bg-border"
          aria-hidden="true"
        />

        {/* Header sticky */}
        <div className="sticky top-0 bg-surface z-10 px-5 pt-3 pb-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                type="button"
                onClick={() => { setStep(1); setRecheios([]); }}
                aria-label={t('back')}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground transition-colors"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
            )}
            <h2 id="builder-title" className="font-bold text-foreground text-lg leading-tight">
              {t('title')}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={tA11y('closeModal')}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-150"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Passo 1 — seleção de tamanho */}
          {step === 1 && (
            <>
              <p className="text-sm text-foreground-muted">{t('stepSize')}</p>
              <div className="flex flex-col gap-3">
                {(['5-sabores', '8-sabores'] as MonteSeuPastelTamanho[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSelectTamanho(s)}
                    className="
                      flex items-center justify-between
                      px-5 py-4 rounded-2xl
                      border border-border bg-surface
                      hover:border-brand-yellow hover:bg-brand-yellow/5
                      transition-all duration-150 text-left
                    "
                  >
                    <div>
                      <p className="font-semibold text-foreground">
                        {s === '5-sabores' ? t('size5') : t('size8')}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {s === '5-sabores' ? t('size5Hint') : t('size8Hint')}
                      </p>
                    </div>
                    <span className="text-xl font-extrabold text-brand-red ml-4 shrink-0">
                      {formatPrice(MONTE_SEU_PASTEL_PRECOS[s])}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Passo 2 — seleção de recheios */}
          {step === 2 && tamanho && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground-muted">{t('stepFillings')}</p>
                <span className="text-sm font-semibold text-brand-red">
                  {recheios.length}/{limite}
                </span>
              </div>

              <ul
                className="grid grid-cols-2 gap-2"
                role="group"
                aria-label={t('stepFillings')}
              >
                {RECHEIOS.map((r) => {
                  const selected = recheios.includes(r);
                  const disabled = !selected && recheios.length >= limite;
                  return (
                    <li key={r}>
                      <button
                        type="button"
                        onClick={() => toggleRecheio(r)}
                        disabled={disabled}
                        aria-pressed={selected}
                        className={[
                          'w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-150',
                          selected
                            ? 'bg-brand-yellow text-neutral-900 border border-brand-yellow'
                            : disabled
                            ? 'bg-surface border border-border text-foreground-muted opacity-40 cursor-not-allowed'
                            : 'bg-surface border border-border text-foreground hover:border-brand-yellow hover:bg-brand-yellow/5',
                        ].join(' ')}
                      >
                        <span className="flex items-center gap-2">
                          <RecheioThumb nome={r} />
                          <span>{r}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Rodapé sticky com resumo e botão de confirmar */}
              <div className="sticky bottom-0 -mx-5 px-5 pt-4 pb-4 bg-surface border-t border-border mt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-foreground-muted">
                    {t('summarySize')}:{' '}
                    <span className="font-medium text-foreground">
                      {tamanho === '5-sabores' ? t('size5') : t('size8')}
                    </span>
                  </span>
                  <span className="text-xl font-extrabold text-brand-red">
                    {formatPrice(MONTE_SEU_PASTEL_PRECOS[tamanho])}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={recheios.length === 0}
                  onClick={() => {
                    if (!tamanho || recheios.length === 0) return;
                    addItem({
                      nome: `Pastel Personalizado — ${tamanho === '5-sabores' ? 'até 5 sabores' : 'até 8 sabores'}`,
                      preco: MONTE_SEU_PASTEL_PRECOS[tamanho],
                      detalhes: [...recheios],
                    });
                    onClose();
                  }}
                  className={[
                    'w-full py-3 rounded-2xl font-bold text-base bg-brand-red text-white transition-all duration-150',
                    recheios.length === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:brightness-110',
                  ].join(' ')}
                >
                  {t('confirm')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
