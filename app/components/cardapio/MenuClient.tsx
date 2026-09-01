'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChefHat, GlassWater, Search, X } from 'lucide-react';
import { CardapioItem, Categoria, BEBIDA_GRUPOS, formatPrice } from '@/lib/data/cardapio';
import type { BebidaGrupo } from '@/lib/data/cardapio';
import CategoryFilter, { FilterCategory } from './CategoryFilter';
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';
import PastelBuilder from './PastelBuilder';
import BebidaSelector from './BebidaSelector';
import CardapioHero from './CardapioHero';

function checkStoreOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= 10 && hour < (day === 0 || day === 6 ? 23 : 22);
}

const CATEGORIES: Categoria[] = [
  'Monte seu pastel',
  'Pastéis Tradicionais',
  'Pastéis Doces',
  'Bebidas',
];

interface MenuClientProps {
  items: CardapioItem[];
}

export default function MenuClient({ items }: MenuClientProps) {
  const [active, setActive] = useState<FilterCategory>(CATEGORIES[0]);
  const [selectedItem, setSelectedItem] = useState<CardapioItem | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [selectedBebida, setSelectedBebida] = useState<BebidaGrupo | null>(null);
  const [storeOpen, setStoreOpen] = useState(true);
  const [showClosedToast, setShowClosedToast] = useState(false);
  const [search, setSearch] = useState('');
  const closedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchActiveRef = useRef(false);
  const sectionRefs = useRef<Map<Categoria, HTMLElement | null>>(new Map());
  const filterRef = useRef<HTMLDivElement>(null);
  const isScrollingTo = useRef(false);

  const tradicionais = items.filter((i) => i.categoria === 'Pastéis Tradicionais');
  const doces = items.filter((i) => i.categoria === 'Pastéis Doces');

  useEffect(() => {
    setStoreOpen(checkStoreOpen());
    const interval = setInterval(() => setStoreOpen(checkStoreOpen()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    searchActiveRef.current = search.trim() !== '';
  }, [search]);

  function notifyClosedAttempt() {
    setShowClosedToast(true);
    if (closedTimer.current) clearTimeout(closedTimer.current);
    closedTimer.current = setTimeout(() => setShowClosedToast(false), 3000);
  }

  // Scroll-spy
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (isScrollingTo.current || ticking || searchActiveRef.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = (filterRef.current?.offsetHeight ?? 48) + 48 + 8;
        let current: Categoria = CATEGORIES[0];
        for (const cat of CATEGORIES) {
          const el = sectionRefs.current.get(cat);
          if (el && el.getBoundingClientRect().top <= offset) current = cat;
        }
        setActive(current);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToCategory(cat: FilterCategory) {
    if (cat === 'all') {
      isScrollingTo.current = true;
      setActive(CATEGORIES[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { isScrollingTo.current = false; }, 800);
      return;
    }
    const el = sectionRefs.current.get(cat);
    if (!el) return;
    const offset = (filterRef.current?.offsetHeight ?? 48) + 48 + 4;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    isScrollingTo.current = true;
    setActive(cat);
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => { isScrollingTo.current = false; }, 800);
  }

  const handleSelect = useCallback((item: CardapioItem) => {
    if (!storeOpen) { notifyClosedAttempt(); return; }
    setSelectedItem(item);
  }, [storeOpen]);

  const normalizedQuery = search.trim().toLowerCase();

  const filteredItems = normalizedQuery
    ? [
        ...items.filter(
          (i) =>
            i.nome.toLowerCase().includes(normalizedQuery) ||
            i.descricao.toLowerCase().includes(normalizedQuery) ||
            i.categoria.toLowerCase().includes(normalizedQuery),
        ),
        ...BEBIDA_GRUPOS.filter(
          (grupo) =>
            grupo.nome.toLowerCase().includes(normalizedQuery) ||
            grupo.opcoes.join(' ').toLowerCase().includes(normalizedQuery),
        ).map((grupo) => ({
          id: `bebida-${grupo.id}`,
          nome: grupo.nome,
          descricao: `Escolha a marca • ${grupo.opcoes.join(' / ')}`,
          preco: grupo.preco,
          categoria: 'Bebidas' as const,
          beverage: grupo,
        })),
      ]
    : null;

  return (
    <>
      <CardapioHero />

      {/* Barra sticky: filtros + busca */}
      <div ref={filterRef} className="sticky top-12 z-40 bg-background px-4">
        <CategoryFilter selected={active} onSelect={scrollToCategory} />
        <div className="pb-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar no cardápio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-8 py-2 text-sm rounded-xl bg-surface border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 focus:border-brand-yellow transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resultados de busca OU seções normais */}
      {filteredItems !== null ? (
        <section aria-label={`Resultados para "${search}"`}>
          <h2 className="px-4 pt-5 pb-2 text-xs font-bold text-foreground-muted uppercase tracking-widest">
            {filteredItems.length > 0
              ? `${filteredItems.length} resultado${filteredItems.length !== 1 ? 's' : ''}`
              : 'Nenhum resultado'}
          </h2>
          {filteredItems.length > 0 ? (
            <ul>
              {filteredItems.map((item, idx) => (
                <li key={item.id} className={idx < filteredItems.length - 1 ? 'border-b border-border' : ''}>
                  {'beverage' in item ? (
                    <button
                      type="button"
                      onClick={() => { if (!storeOpen) { notifyClosedAttempt(); return; } setSelectedBebida(item.beverage); }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-surface/60 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{item.nome}</p>
                        <p className="text-xs text-foreground-muted mt-0.5 leading-snug">{item.descricao}</p>
                        <p className="font-bold text-brand-red text-sm mt-1.5">{formatPrice(item.preco)}</p>
                      </div>
                      <div
                        className="w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <GlassWater size={26} className="text-brand-yellow" />
                      </div>
                    </button>
                  ) : (
                    <ItemCard item={item as CardapioItem} onSelect={handleSelect} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-12 text-center">
              <p className="text-foreground-muted text-sm">
                Nenhum item para <strong>&ldquo;{search}&rdquo;</strong>
              </p>
              <button
                type="button"
                onClick={() => setSearch('')}
                className="mt-3 text-xs text-brand-red font-semibold hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
        </section>
      ) : (
        <>

      {/* ── Monte seu Pastel — card promocional único ────────── */}
      <section ref={(el) => { sectionRefs.current.set('Monte seu pastel', el); }}>
        <h2 className="px-4 pt-5 pb-2 text-xs font-bold text-foreground-muted uppercase tracking-widest">
          Monte seu Pastel
        </h2>
        <ul>
          <li>
            <button
              type="button"
              onClick={() => { if (!storeOpen) { notifyClosedAttempt(); return; } setBuilderOpen(true); }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-surface/60 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">Monte seu Pastel</p>
                <p className="text-xs text-foreground-muted mt-0.5 leading-snug">
                  Escolha seus recheios favoritos
                </p>
                <p className="font-bold text-brand-red text-sm mt-1.5">a partir de R$ 12,00</p>
              </div>
              <div
                className="w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <ChefHat size={26} className="text-brand-yellow" />
              </div>
            </button>
          </li>
        </ul>
      </section>

      {/* ── Pastéis Tradicionais ─────────────────────────────── */}
      <section ref={(el) => { sectionRefs.current.set('Pastéis Tradicionais', el); }}>
        <h2 className="px-4 pt-5 pb-2 text-xs font-bold text-foreground-muted uppercase tracking-widest">
          Pastéis Tradicionais
        </h2>
        <ul>
          {tradicionais.map((item, idx) => (
            <li key={item.id} className={idx < tradicionais.length - 1 ? 'border-b border-border' : ''}>
              <ItemCard item={item} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Pastéis Doces ────────────────────────────────────── */}
      <section ref={(el) => { sectionRefs.current.set('Pastéis Doces', el); }}>
        <h2 className="px-4 pt-5 pb-2 text-xs font-bold text-foreground-muted uppercase tracking-widest">
          Pastéis Doces
        </h2>
        <ul>
          {doces.map((item, idx) => (
            <li key={item.id} className={idx < doces.length - 1 ? 'border-b border-border' : ''}>
              <ItemCard item={item} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Bebidas — 3 cards por grupo ──────────────────────── */}
      <section ref={(el) => { sectionRefs.current.set('Bebidas', el); }}>
        <h2 className="px-4 pt-5 pb-2 text-xs font-bold text-foreground-muted uppercase tracking-widest">
          Bebidas
        </h2>
        <ul>
          {BEBIDA_GRUPOS.map((grupo, idx) => (
            <li
              key={grupo.id}
              className={idx < BEBIDA_GRUPOS.length - 1 ? 'border-b border-border' : ''}
            >
              <button
                type="button"
                onClick={() => { if (!storeOpen) { notifyClosedAttempt(); return; } setSelectedBebida(grupo); }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-surface/60 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{grupo.nome}</p>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-snug">
                    Escolha a marca
                  </p>
                  <p className="font-bold text-brand-red text-sm mt-1.5">
                    {formatPrice(grupo.preco)}
                  </p>
                </div>
                <div
                  className="w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-brand-yellow/20 to-brand-red/20 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <GlassWater size={26} className="text-brand-yellow" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      </>
      )}

      {/* Toast: loja fechada */}
      {showClosedToast && (
        <div className="fixed bottom-[108px] md:bottom-8 inset-x-4 z-[200] pointer-events-none">
          <div className="max-w-sm mx-auto bg-neutral-900 text-white text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neutral-400 shrink-0" aria-hidden="true" />
            <span>Loja fechada. Voltamos às 10h! 🙏</span>
          </div>
        </div>
      )}

      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <PastelBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} />
      <BebidaSelector bebida={selectedBebida} onClose={() => setSelectedBebida(null)} />
    </>
  );
}
