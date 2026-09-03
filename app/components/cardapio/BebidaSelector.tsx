'use client';

import { useCart } from '@/lib/cart/cartContext';
import type { BebidaGrupo } from '@/lib/data/cardapio';
import { formatPrice } from '@/lib/data/cardapio';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface BebidaSelectorProps {
  bebida: BebidaGrupo | null;
  onClose: () => void;
}

export default function BebidaSelector({ bebida, onClose }: BebidaSelectorProps) {
  const { addItem } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!bebida) setSelected(null);
  }, [bebida]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (!bebida) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [bebida, handleKey]);

  useEffect(() => {
    document.body.style.overflow = bebida ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bebida]);

  useEffect(() => {
    if (bebida) closeButtonRef.current?.focus();
  }, [bebida]);

  if (!bebida) return null;

  function handleConfirm() {
    if (!selected || !bebida) return;
    addItem({
      nome: `${bebida.nome} — ${selected}`,
      preco: bebida.preco,
      detalhes: [selected],
    });
    onClose();
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
        aria-labelledby="bebida-title"
        className="pdh-modal-content"
      >
        <div
          className="md:hidden mx-auto mt-3 mb-1 w-10 h-1 rounded-full bg-border"
          aria-hidden="true"
        />

        <div className="sticky top-0 bg-surface z-10 px-5 pt-3 pb-3 flex items-center justify-between border-b border-border">
          <h2 id="bebida-title" className="font-bold text-foreground text-lg leading-tight">
            {bebida.nome}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-150"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <p className="text-sm text-foreground-muted">Escolha a marca</p>

          <ul className="flex flex-col gap-2">
            {bebida.opcoes.map((opcao) => {
              const optionImage = bebida.imagensOpcoes[opcao];

              return (
                <li key={opcao}>
                  <button
                    type="button"
                    onClick={() => setSelected(opcao)}
                    aria-pressed={selected === opcao}
                    className={[
                      'w-full rounded-2xl border px-3 py-2.5 text-left transition-all duration-150',
                      selected === opcao
                        ? 'border-brand-yellow bg-brand-yellow text-neutral-900'
                        : 'border-border bg-surface text-foreground hover:border-brand-yellow hover:bg-brand-yellow/5',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{opcao}</span>

                      {optionImage ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-black/10 bg-white/60 shadow-sm">
                          <Image
                            src={optionImage}
                            alt={opcao}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-xs font-bold text-foreground-muted">
                          {opcao.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sticky bottom-0 -mx-5 px-5 pt-4 pb-4 bg-surface border-t border-border mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground-muted">{bebida.nome}</span>
              <span className="text-xl font-extrabold text-brand-red">
                {formatPrice(bebida.preco)}
              </span>
            </div>
            <button
              type="button"
              disabled={!selected}
              onClick={handleConfirm}
              className={[
                'w-full py-3 rounded-2xl font-bold text-base bg-brand-red text-white transition-all duration-150',
                !selected ? 'opacity-40 cursor-not-allowed' : 'hover:brightness-110',
              ].join(' ')}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
