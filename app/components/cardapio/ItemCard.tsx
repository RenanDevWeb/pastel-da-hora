'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UtensilsCrossed, ChefHat, Cookie, GlassWater } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CardapioItem, formatPrice } from '@/lib/data/cardapio';
import type { Categoria } from '@/lib/data/cardapio';

const ICON: Record<Categoria, LucideIcon> = {
  'Pastéis Tradicionais': UtensilsCrossed,
  'Monte seu pastel':     ChefHat,
  'Pastéis Doces':        Cookie,
  'Bebidas':              GlassWater,
};

interface ItemCardProps {
  item: CardapioItem;
  onSelect?: (item: CardapioItem) => void;
}

export default function ItemCard({ item, onSelect }: ItemCardProps) {
  const CategoryIcon = ICON[item.categoria];
  const [imgError, setImgError] = useState(false);
  const showImage = !!item.img && !imgError;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className="w-full flex items-start gap-3 px-4 py-3.5 text-left active:bg-surface/60 transition-colors duration-100"
      aria-label={item.nome}
    >
      {/* Texto */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm leading-snug">{item.nome}</p>
        <p className="text-xs text-foreground-muted mt-0.5 line-clamp-2 leading-relaxed">
          {item.descricao}
        </p>
        <p className="font-bold text-brand-red text-sm mt-1.5">{formatPrice(item.preco)}</p>
      </div>

      {/* Thumbnail */}
      <div
        className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        {showImage ? (
          <Image
            src={item.img}
            alt=""
            width={72}
            height={72}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <CategoryIcon size={26} className="text-brand-yellow" />
        )}
      </div>
    </button>
  );
}
