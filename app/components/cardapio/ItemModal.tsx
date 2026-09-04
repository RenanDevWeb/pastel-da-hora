'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { X, UtensilsCrossed, ChefHat, Cookie, GlassWater } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CardapioItem, formatPrice } from '@/lib/data/cardapio';
import type { Categoria } from '@/lib/data/cardapio';
import { useCart } from '@/lib/cart/cartContext';
import Image from 'next/image';

const CATEGORY_ICON: Record<Categoria, LucideIcon> = {
  'Pastéis Tradicionais': UtensilsCrossed,
  'Monte seu pastel':     ChefHat,
  'Pastéis Doces':        Cookie,
  'Bebidas':              GlassWater,
};

interface ItemModalProps {
  item: CardapioItem | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const t = useTranslations('menu');
  const tA11y = useTranslations('accessibility');
  const tCat = useTranslations('menu.categories');
  const { addItem } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const categoryLabel: Record<string, string> = {
    'Pastéis Tradicionais': tCat('traditional'),
    'Monte seu pastel': tCat('custom'),
    'Pastéis Doces': tCat('sweet'),
    'Bebidas': tCat('drinks'),
  };

  // Fecha com ESC
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [item, handleKey]);

  // Bloqueia scroll do body quando aberto
  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  // Foco no botão de fechar ao abrir
  useEffect(() => {
    if (item) closeButtonRef.current?.focus();
  }, [item]);

  if (!item) return null;

  const CategoryIcon = CATEGORY_ICON[item.categoria];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm pdh-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteúdo — bottom sheet mobile / dialog desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-item-title"
        className="pdh-modal-content"
      >
        {/* Handle visual (mobile) */}
        <div
          className="md:hidden mx-auto mt-3 mb-1 w-10 h-1 rounded-full bg-border"
          aria-hidden="true"
        />

        {/* Header sticky */}
        <div className="sticky top-0 bg-surface z-10 px-5 pt-3 pb-3 flex items-center justify-between border-b border-border">
          <h2
            id="modal-item-title"
            className="font-bold text-foreground text-lg leading-tight pr-4"
          >
            {item.nome}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={tA11y('closeModal')}
            className="
              shrink-0 w-9 h-9 rounded-xl
              flex items-center justify-center
              text-foreground-muted hover:text-foreground hover:bg-surface
              transition-colors duration-150
            "
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 flex flex-col gap-4">
          {/* Imagem do item */}
          <div
            className="relative w-full h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 flex items-center justify-center"
            aria-hidden="true"
          >
            {item.img ? (
              <Image
                src={item.img}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 32rem"
                className="object-cover"
              />
            ) : (
              <CategoryIcon size={72} className="text-brand-yellow/60" />
            )}
          </div>

          {/* Badge de categoria */}
          <span className="self-start px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-foreground-muted">
            {categoryLabel[item.categoria]}
          </span>

          {/* Descrição completa */}
          <p className="text-foreground-muted leading-relaxed text-sm">
            {item.descricao}
          </p>

          {/* Preço */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-foreground-muted">{t('title')}</span>
            <span className="text-2xl font-extrabold text-brand-red">
              {formatPrice(item.preco)}
            </span>
          </div>

          {/* Adicionar ao carrinho */}
          <button
            type="button"
            onClick={() => {
              addItem({ nome: item.nome, preco: item.preco });
              onClose();
            }}
            className="w-full py-3 rounded-2xl font-bold text-base bg-brand-red text-white hover:brightness-110 transition-all duration-150"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </>
  );
}
