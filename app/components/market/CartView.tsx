'use client';

import { ShoppingCart, Trash2, Minus, Plus, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCart } from '@/lib/cart/cartContext';
import { formatPrice } from '@/lib/data/cardapio';

const WHATSAPP = '5581983657715';
type PedidoTipo = 'delivery' | 'retirada' | 'mesa';

const DELIVERY_FEES: Record<string, number> = {
  'vila rica': 8.5,
  'santo antonio': 7.5,
  'bulhoes': 9.5,
  'cohab': 8.0,
  'colonia': 10.0,
  'santa aleixo': 11.0,
  'padre roma': 9.0,
  'quadros': 12.5,
  'alto da fabrica': 13.0,
  'engenho velho': 14.0,
  'lote 56': 15.5,
  'lote 92': 16.0,
  'vista alegre': 10.5,
  'malvinas': 11.5,
};

const normalizeAddressText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function CartView() {
  const { items, removeItem, updateQty, total, count, clear } = useCart();
  const [tipoPedido, setTipoPedido] = useState<PedidoTipo>('delivery');
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [mesa, setMesa] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

  const tipoPedidoLabel: Record<PedidoTipo, string> = {
    delivery: 'Delivery',
    retirada: 'Retirada',
    mesa: 'Mesa',
  };

  const localizacaoEntrega = [rua, numero, bairro].filter(Boolean).join(', ');
  const totalComEntrega = tipoPedido === 'delivery' ? total + deliveryFee : total;

  const pedidoExtra =
    tipoPedido === 'delivery'
      ? `\n\n*Tipo: ${tipoPedidoLabel[tipoPedido]}*\n*Endereço: ${localizacaoEntrega || 'Não informado'}*\n*Bairro: ${bairro || 'Não informado'}*\n*Valor do delivery: ${formatPrice(deliveryFee)}*`
      : tipoPedido === 'mesa'
        ? `\n\n*Tipo: ${tipoPedidoLabel[tipoPedido]}*\n*Mesa: ${mesa || 'Não informada'}*`
        : `\n\n*Tipo: ${tipoPedidoLabel[tipoPedido]}*`;

  const whatsappMsg = encodeURIComponent(
    '🥟 *Pedido — Pastel da Hora*' +
    pedidoExtra +
    '\n\n' +
    items
      .map(
        (i) =>
          `• ${i.quantidade}x ${i.nome}` +
          (i.detalhes?.length ? `\n  _${i.detalhes.join(', ')}_` : '') +
          ` — ${formatPrice(i.preco * i.quantidade)}`,
      )
      .join('\n') +
    `\n\n*Total: ${formatPrice(totalComEntrega)}*`,
  );

  const deliveryFeeLabel = useMemo(
    () => (tipoPedido === 'delivery' ? `+ ${formatPrice(deliveryFee)}` : ''),
    [deliveryFee, tipoPedido],
  );

  const pedidoSelecionado =
    tipoPedido === 'delivery'
      ? Boolean(bairro && rua && numero && deliveryFee > 0)
      : tipoPedido === 'mesa'
        ? Boolean(mesa.trim())
        : tipoPedido === 'retirada';

  const validateDeliveryAddress = (inputBairro: string) => {
    const normalized = normalizeAddressText(inputBairro);
    const bairroValido = Object.keys(DELIVERY_FEES).find(
      (bairroPermitido) => normalizeAddressText(bairroPermitido) === normalized,
    );

    if (!bairroValido) {
      setIsBlockedModalOpen(true);
      return false;
    }

    setDeliveryFee(DELIVERY_FEES[bairroValido]);
    return true;
  };

  const handleBuscarCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setIsBlockedModalOpen(true);
      return;
    }

    setIsLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setIsBlockedModalOpen(true);
        return;
      }

      if (data.logradouro) setRua(data.logradouro);
      if (data.bairro) setBairro(data.bairro);

      const bairroValido = data.bairro ? validateDeliveryAddress(data.bairro) : false;
      if (!bairroValido && data.bairro) {
        setIsBlockedModalOpen(true);
        return;
      }

      if (!data.bairro) {
        setIsBlockedModalOpen(true);
        return;
      }

      setTipoPedido('delivery');
      setIsDeliveryModalOpen(false);
    } catch {
      setIsBlockedModalOpen(true);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSalvarEntrega = () => {
    if (!bairro || !rua || !numero) {
      setIsBlockedModalOpen(true);
      return;
    }

    const valid = validateDeliveryAddress(bairro);
    if (!valid) return;

    setTipoPedido('delivery');
    setIsDeliveryModalOpen(false);
  };

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

          <div className="border-t border-border pt-4">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground mb-2">Como deseja receber seu pedido?</p>
              <div className="flex gap-2">
                {([
                  { value: 'delivery', label: 'Delivery' },
                  { value: 'retirada', label: 'Retirar' },
                  { value: 'mesa', label: 'Mesa' },
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTipoPedido(option.value);
                      if (option.value === 'delivery') {
                        setIsDeliveryModalOpen(true);
                      } else {
                        setDeliveryFee(0);
                      }
                    }}
                    className={[
                      'flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                      tipoPedido === option.value
                        ? 'border-brand-yellow bg-brand-yellow text-neutral-900'
                        : 'border-border bg-surface text-foreground-muted hover:border-brand-yellow hover:text-foreground',
                    ].join(' ')}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {tipoPedido === 'mesa' && (
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-xs font-medium text-foreground-muted">
                    Informe o nome da mesa
                  </span>
                  <input
                    type="text"
                    value={mesa}
                    onChange={(event) => setMesa(event.target.value)}
                    placeholder="Ex.: Mesa 05 ou Nome"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-yellow focus:outline-none"
                  />
                </label>
              )}

              {tipoPedido === 'delivery' && deliveryFee > 0 && (
                <div className="mt-3 rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-2 text-xs text-foreground">
                  Delivery para <span className="font-semibold">{bairro}</span>: <span className="font-bold text-brand-red">{formatPrice(deliveryFee)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-foreground-muted font-medium">Total do pedido</span>
              <span className="text-2xl font-extrabold text-brand-red">
                {formatPrice(totalComEntrega)}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-end text-xs text-foreground-muted">
              {deliveryFeeLabel}
            </div>
            {!pedidoSelecionado && (
              <p className="mb-3 text-center text-xs text-foreground-muted">
                Selecione como deseja receber seu pedido antes de continuar.
              </p>
            )}

            <a
              href={pedidoSelecionado ? `https://wa.me/${WHATSAPP}?text=${whatsappMsg}` : undefined}
              target={pedidoSelecionado ? '_blank' : undefined}
              rel={pedidoSelecionado ? 'noopener noreferrer' : undefined}
              onClick={(event) => {
                if (!pedidoSelecionado) {
                  event.preventDefault();
                }
              }}
              className={[
                'flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-150',
                pedidoSelecionado
                  ? 'bg-brand-red text-white hover:brightness-110'
                  : 'bg-border text-foreground-muted cursor-not-allowed',
              ].join(' ')}
              aria-disabled={!pedidoSelecionado}
            >
              Fazer pedido no WhatsApp
            </a>
          </div>

          {isDeliveryModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-foreground">Dados para entrega</h2>
                  <button
                    type="button"
                    onClick={() => setIsDeliveryModalOpen(false)}
                    className="rounded-full p-1.5 text-foreground-muted hover:bg-surface-strong hover:text-foreground"
                    aria-label="Fechar modal de entrega"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-foreground-muted">CEP</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={cep}
                        onChange={(event) => setCep(event.target.value)}
                        placeholder="Ex.: 57000-000"
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-yellow focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleBuscarCep}
                        disabled={isLoadingCep}
                        className="rounded-xl bg-brand-red px-3 py-2.5 text-xs font-bold text-white disabled:opacity-60"
                      >
                        {isLoadingCep ? 'Buscando...' : 'Buscar'}
                      </button>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-foreground-muted">Rua</span>
                    <input
                      type="text"
                      value={rua}
                      onChange={(event) => setRua(event.target.value)}
                      placeholder="Ex.: Rua das Flores"
                      className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-yellow focus:outline-none"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-foreground-muted">Bairro</span>
                      <input
                        type="text"
                        value={bairro}
                        onChange={(event) => setBairro(event.target.value)}
                        placeholder="Ex.: Centro"
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-yellow focus:outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-foreground-muted">Número</span>
                      <input
                        type="text"
                        value={numero}
                        onChange={(event) => setNumero(event.target.value)}
                        placeholder="Ex.: 123"
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand-yellow focus:outline-none"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSalvarEntrega}
                  className="mt-5 w-full rounded-2xl bg-brand-red px-4 py-3 text-sm font-bold text-white hover:brightness-110 transition-all duration-150"
                >
                  Salvar endereço
                </button>
              </div>
            </div>
          )}

          {isBlockedModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
              <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-5 text-center shadow-2xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-2xl">!</div>
                <h3 className="text-lg font-extrabold text-foreground">Entrega indisponível</h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  Neste momento não fazemos delivery para esse endereço. Por favor, escolha outra opção de pedido.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBlockedModalOpen(false)}
                  className="mt-5 w-full rounded-2xl bg-brand-red px-4 py-3 text-sm font-bold text-white hover:brightness-110 transition-all duration-150"
                >
                  Entendi
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
