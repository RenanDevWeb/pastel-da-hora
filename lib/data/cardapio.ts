import type {
  CardapioItem,
  Categoria,
  MonteSeuPastelTamanho,
  Recheio,
} from '../interface/cardapioItem.interface';

export type { CardapioItem, Categoria, MonteSeuPastelTamanho, Recheio, PastelPersonalizado } from '../interface/cardapioItem.interface';

export interface BebidaGrupo {
  id: string;
  nome: string;
  preco: number;
  opcoes: string[];
}

export const BEBIDA_GRUPOS: BebidaGrupo[] = [
  { id: 'refri-1l',    nome: 'Refrigerante 1L',  preco: 12.0, opcoes: ['Coca-Cola', 'Guaraná Antártica'] },
  { id: 'cacoulinha',  nome: 'Caçulinha 200ml',  preco:  4.0, opcoes: ['Coca-Cola', 'Guaraná Antártica'] },
  { id: 'lata',        nome: 'Lata 350ml',       preco:  6.0, opcoes: ['Coca-Cola', 'Guaraná Antártica'] },
];

export const MONTE_SEU_PASTEL_PRECOS: Record<MonteSeuPastelTamanho, number> = {
  '5-sabores': 12.0,
  '8-sabores': 14.0,
};

export const MONTE_SEU_PASTEL_LIMITES: Record<MonteSeuPastelTamanho, number> = {
  '5-sabores': 5,
  '8-sabores': 8,
};

/** Emoji shown while a real photo isn't available in /public/images/recheios/ */
export const RECHEIO_EMOJIS: Record<Recheio, string> = {
  'Ketchup':             '🍅',
  'Maionese':            '🥚',
  'Mostarda':            '🌼',
  'Barbecue':            '🍖',
  'Maionese caseira':    '🥄',
  'Ovo de codorna':      '🫘',
  'Passas':              '🍇',
  'Azeitona':            '🫒',
  'Milho verde e ervilha': '🌽',
  'Calabresa':           '🌶️',
  'Carne':               '🥩',
  'Carne de sol':        '🥩',
  'Queijo coalho':       '🧀',
  'Mussarela':           '🧀',
  'Cheddar e Cheese':    '🧀',
  'Presunto':            '🥓',
};

export const RECHEIOS: Recheio[] = [
  'Ketchup',
  'Maionese',
  'Mostarda',
  'Barbecue',
  'Maionese caseira',
  'Ovo de codorna',
  'Passas',
  'Azeitona',
  'Milho verde e ervilha',
  'Calabresa',
  'Carne',
  'Carne de sol',
  'Queijo coalho',
  'Mussarela',
  'Cheddar e Cheese',
  'Presunto',
];

export const cardapioItems: CardapioItem[] = [
  // ── Pastéis Tradicionais ──────────────────────────────────
  {
    id: 1,
    img: '/images/pastel-queijo.jpg',
    nome: 'Pastel de Queijo',
    descricao: 'Massa crocante recheada com queijo mussarela derretido.',
    preco: 5.99,
    categoria: 'Pastéis Tradicionais',
    destaque: true,
  },
  {
    id: 2,
    img: '/images/pastel-carne.jpg',
    nome: 'Pastel de Carne',
    descricao: 'Carne moída temperada com ervas frescas em massa dourada.',
    preco: 6.99,
    categoria: 'Pastéis Tradicionais',
    destaque: true,
  },
  {
    id: 3,
    img: '/images/pastel-frango.jpg',
    nome: 'Pastel de Frango',
    descricao: 'Frango desfiado com catupiry e temperos especiais.',
    preco: 6.49,
    categoria: 'Pastéis Tradicionais',
  },
  {
    id: 4,
    img: '/images/pastel-camarao.jpg',
    nome: 'Pastel de Camarão',
    descricao: 'Camarão ao alho-óleo com toque de limão e pimenta.',
    preco: 8.99,
    categoria: 'Pastéis Tradicionais',
  },
  {
    id: 5,
    img: '/images/pastel-pizza.jpg',
    nome: 'Pastel de Pizza',
    descricao: 'Presunto, mussarela, tomate e azeitona — como uma pizza, mas melhor.',
    preco: 7.49,
    categoria: 'Pastéis Tradicionais',
    destaque: true,
  },
  // ── Monte seu Pastel ──────────────────────────────────────
  {
    id: 6,
    img: '/images/monte-seu-pastel-5-sabores.jpg',
    nome: 'Monte seu Pastel — até 5 sabores',
    descricao: 'Escolha até 5 recheios e personalize do seu jeito.',
    preco: MONTE_SEU_PASTEL_PRECOS['5-sabores'],
    categoria: 'Monte seu pastel',
    destaque: true,
  },
  {
    id: 7,
    img: '/images/monte-seu-pastel-8-sabores.jpg',
    nome: 'Monte seu Pastel — até 8 sabores',
    descricao: 'Escolha até 8 recheios e faça o pastel dos seus sonhos.',
    preco: MONTE_SEU_PASTEL_PRECOS['8-sabores'],
    categoria: 'Monte seu pastel',
  },
  // ── Pastéis Doces ─────────────────────────────────────────
  {
    id: 8,
    img: '/images/pastel-doce-de-leite-banana.jpg',
    nome: 'Doce de Leite com Banana',
    descricao: 'Doce de leite cremoso com banana caramelada em massa crocante.',
    preco: 14.0,
    categoria: 'Pastéis Doces',
    destaque: true,
  },
  {
    id: 9,
    img: '/images/pastel-nutella-ninho-morango.jpg',
    nome: 'Nutella com Ninho e Morango',
    descricao: 'Nutella, leite em pó Ninho e morango fresco.',
    preco: 14.0,
    categoria: 'Pastéis Doces',
  },
  {
    id: 10,
    img: '/images/pastel-goiabada-queijo-coalho.jpg',
    nome: 'Goiabada com Queijo Coalho',
    descricao: 'Goiabada cascão com queijo coalho — o clássico Romeu e Julieta no pastel.',
    preco: 14.0,
    categoria: 'Pastéis Doces',
  },
];

export function getDestaques(): CardapioItem[] {
  return cardapioItems.filter((item) => item.destaque);
}

export function getByCategoria(categoria: Categoria): CardapioItem[] {
  return cardapioItems.filter((item) => item.categoria === categoria);
}

export function formatPrice(preco: number): string {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}
