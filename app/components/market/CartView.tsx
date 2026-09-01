'use client';

import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart/cartContext';
import { formatPrice } from '@/lib/data/cardapio';

const WHATSAPP = '5581983657715';

export default function CartView() {
  const { items, removeItem, updateQty, total, count, clear } = useCart();

  const whatsappMsg = encodeURIComponent(
    '🥟 *Pedido — Pastel da Hora*\n\n' +
    items
      .map(
        (i) =>
          `• ${i.quantidade}x ${i.nome}` +
          (i.detalhes?.length ? `\n  _${i.detalhes.join(', ')}_` : '') +
          ` — ${formatPrice(i.preco * i.quantidade)}`,
      )
      .join('\n') +
    `\n\n*Total: ${formatPrice(total)}*`,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <ShoppingCart size={20} aria-hidden="true" />
          Carrinho
          {count > 0 && (
            <span className="text-sm font-semibold text-foreground-muted">
              ({count} {count === 1 ? 'item' : 'itens'})
            </span>
          )}
        </h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-foreground-muted hover:text-brand-red transition-colors"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <ShoppingCart size={48} className="text-foreground-muted/30" aria-hidden="true" />
          <p className="font-semibold text-foreground-muted">Carrinho vazio</p>
          <p className="text-xs text-foreground-muted">
            Adicione itens do cardápio para começar seu pedido
          </p>
        </div>
      ) : (
        <>
          {/* Lista de itens */}
          <ul className="flex flex-col gap-3 mb-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-surface border border-border rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-snug">
                      {item.nome}
                    </p>
                    {item.detalhes && item.detalhes.length > 0 && (
                      <p className="text-xs text-foreground-muted mt-0.5 line-clamp-2">
                        {item.detalhes.join(', ')}
                      </p>
                    )}
                    <p className="font-bold text-brand-red text-sm mt-1.5">
                      {formatPrice(item.preco * item.quantidade)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remover ${item.nome}`}
                    className="text-foreground-muted hover:text-brand-red transition-colors shrink-0 mt-0.5"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>

                {/* Controles de quantidade */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantidade - 1)}
                    aria-label="Diminuir quantidade"
                    className="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-foreground-muted hover:border-brand-yellow hover:text-foreground transition-colors"
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span className="text-sm font-semibold text-foreground min-w-[20px] text-center">
                    {item.quantidade}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantidade + 1)}
                    aria-label="Aumentar quantidade"
                    className="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-foreground-muted hover:border-brand-yellow hover:text-foreground transition-colors"
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total + CTA */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-foreground-muted font-medium">Total do pedido</span>
              <span className="text-2xl font-extrabold text-brand-red">
                {formatPrice(total)}
              </span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-base bg-brand-red text-white hover:brightness-110 transition-all duration-150"
            >
              Fazer pedido no WhatsApp
            </a>
          </div>
        </>
      )}
    </div>
  );
}
