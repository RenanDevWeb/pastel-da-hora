'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { UtensilsCrossed, ChefHat, Cookie, GlassWater, LayoutList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Categoria } from '@/lib/data/cardapio';

export type FilterCategory = Categoria | 'all';

interface CategoryFilterProps {
  selected: FilterCategory;
  onSelect: (cat: FilterCategory) => void;
}

const ITEMS: { key: FilterCategory; tKey: string; Icon: LucideIcon }[] = [
  { key: 'all',                  tKey: 'all',         Icon: LayoutList },
  { key: 'Monte seu pastel',     tKey: 'custom',      Icon: ChefHat },
  { key: 'Pastéis Tradicionais', tKey: 'traditional', Icon: UtensilsCrossed },
  { key: 'Pastéis Doces',        tKey: 'sweet',       Icon: Cookie },
  { key: 'Bebidas',              tKey: 'drinks',      Icon: GlassWater },
];

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const t = useTranslations('menu.categories');
  const pillRefs = useRef<Partial<Record<FilterCategory, HTMLButtonElement>>>({});

  // Scroll the active pill into view within the horizontal list
  useEffect(() => {
    pillRefs.current[selected]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [selected]);

  return (
    <div
      className="flex gap-1.5 mt-3 pb-3 overflow-x-auto scrollbar-hide"
      role="group"
      aria-label="Filtrar por categoria"
    >
      {ITEMS.map(({ key, tKey, Icon }) => {
        const isActive = selected === key;
        return (
          <button
            key={key}
            ref={(el) => { pillRefs.current[key] = el ?? undefined; }}
            type="button"
            onClick={() => onSelect(key)}
            aria-pressed={isActive}
            className={[
              'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0',
              isActive
                ? 'bg-brand-yellow text-neutral-900'
                : 'bg-surface text-foreground-muted border border-border hover:border-brand-yellow hover:text-foreground',
            ].join(' ')}
          >
            <Icon size={12} aria-hidden="true" />
            {t(tKey)}
          </button>
        );
      })}
    </div>
  );
}
