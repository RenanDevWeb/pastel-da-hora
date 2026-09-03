import type {
  CardapioItem,
  Categoria,
  MonteSeuPastelTamanho,
  Recheio,
} from "../interface/cardapioItem.interface";

export type {
  CardapioItem,
  Categoria,
  MonteSeuPastelTamanho, PastelPersonalizado, Recheio
} from "../interface/cardapioItem.interface";

export interface BebidaGrupo {
  id: string;
  nome: string;
  preco: number;
  opcoes: string[];
  imagem: string;
  imagensOpcoes: Record<string, string>;
}

function buildDrinkImage(label: string, colorA: string, colorB: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="240" height="160" rx="24" fill="url(#g)"/>
      <rect x="70" y="16" width="100" height="128" rx="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.45)"/>
      <rect x="84" y="34" width="72" height="18" rx="9" fill="rgba(255,255,255,0.24)"/>
      <rect x="84" y="64" width="72" height="28" rx="14" fill="rgba(255,255,255,0.18)"/>
      <text x="120" y="94" text-anchor="middle" fill="white" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700">${label}</text>
      <circle cx="120" cy="120" r="10" fill="rgba(255,255,255,0.28)"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const BEBIDA_IMAGENS: Record<string, string> = {
  'Coca-Cola': buildDrinkImage('Coca-Cola', '#d12f2f', '#a11d1d'),
  'Guaraná Antártica': buildDrinkImage('Guaraná', '#f0b33d', '#d06a00'),
  'Tradicional': buildDrinkImage('H2O', '#4ec3f5', '#1877d2'),
  'Limoneto': buildDrinkImage('Limoneto', '#9fe07c', '#3d9a5a'),
  'Sem gás': buildDrinkImage('Água', '#cfe8ff', '#6fa8dc'),
  'Com gás': buildDrinkImage('Água', '#dfeefe', '#7aa8dc'),
};

export const BEBIDA_GRUPOS: BebidaGrupo[] = [
  {
    id: "refri-1l",
    nome: "Refrigerante 1L",
    preco: 12.0,
    opcoes: ["Coca-Cola", "Guaraná Antártica"],
    imagem: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053159/WhatsApp_Image_2026-08-06_at_6.12.50_PM_ua7srx.jpg",
    imagensOpcoes: {
      "Coca-Cola": "https://res.cloudinary.com/exercice-disp/image/upload/v1786053159/WhatsApp_Image_2026-08-06_at_6.12.50_PM_ua7srx.jpg",
      "Guaraná Antártica": "https://res.cloudinary.com/exercice-disp/image/upload/v1786053159/WhatsApp_Image_2026-08-06_at_6.12.51_PM_2_r01zvr.jpg",
    },
  },
  {
    id: "cacoulinha",
    nome: "Caçulinha 200ml",
    preco: 4.0,
    opcoes: ["Coca-Cola", "Guaraná Antártica"],
    imagem: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053792/guarana-200-ml-auto_iu8zln.png",
    imagensOpcoes: {
      "Coca-Cola": "https://res.cloudinary.com/exercice-disp/image/upload/v1788404117/4601-refrigerante-coca-cola-200ml_keq7vv.jpg",
      "Guaraná Antártica": "https://res.cloudinary.com/exercice-disp/image/upload/v1786053792/guarana-200-ml-auto_iu8zln.png",
    },
  },
  {
    id: "lata",
    nome: "Lata 350ml",
    preco: 6.0,
    opcoes: ["Coca-Cola", "Guaraná Antártica"],
    imagem: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053159/WhatsApp_Image_2026-08-06_at_6.12.51_PM_1_gijk1w.jpg",
    imagensOpcoes: {
      "Coca-Cola": "https://res.cloudinary.com/exercice-disp/image/upload/v1786053159/WhatsApp_Image_2026-08-06_at_6.12.51_PM_1_gijk1w.jpg",
      "Guaraná Antártica": "https://res.cloudinary.com/exercice-disp/image/upload/v1786053161/WhatsApp_Image_2026-08-06_at_6.12.51_PM_3_bhuuky.jpg",
    },
  },
  {
    id: "h2o",
    nome: "H2O",
    preco: 8.0,
    opcoes: ["Tradicional", "Limoneto"],
    imagem: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053160/WhatsApp_Image_2026-08-06_at_6.12.51_PM_ajpqif.jpg",
    imagensOpcoes: {
      Tradicional: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053160/WhatsApp_Image_2026-08-06_at_6.12.51_PM_ajpqif.jpg",
      Limoneto: "https://res.cloudinary.com/exercice-disp/image/upload/v1788404295/limoneto_n6ztif.jpg",
    },
  },
  {
    id: "agua",
    nome: "Água",
    preco: 5.0,
    opcoes: ["Sem gás", "Com gás"],
    imagem: "https://res.cloudinary.com/exercice-disp/image/upload/v1776367453/menufood/products/hx8s8jruzz3dtztzmajv.jpg",
    imagensOpcoes: {
      "Sem gás": "https://res.cloudinary.com/exercice-disp/image/upload/v1776367453/menufood/products/hx8s8jruzz3dtztzmajv.jpg",
      "Com gás": "https://res.cloudinary.com/exercice-disp/image/upload/v1788404521/agua_gas_ykotmu.jpg",
    },
  },
];

export const MONTE_SEU_PASTEL_PRECOS: Record<MonteSeuPastelTamanho, number> = {
  "5-sabores": 12.0,
  "8-sabores": 14.0,
};

export const MONTE_SEU_PASTEL_LIMITES: Record<MonteSeuPastelTamanho, number> = {
  "5-sabores": 5,
  "8-sabores": 8,
};

/** Emoji shown while a real photo isn't available in /public/images/recheios/ */
export const RECHEIO_EMOJIS: Record<Recheio, string> = {
  Ketchup: "🍅",
  Maionese: "🥚",
  Mostarda: "🌼",
  Barbecue: "🍖",
  "Maionese caseira": "🥄",
  "Ovo de codorna": "🫘",
  Passas: "🍇",
  Azeitona: "🫒",
  "Milho verde e ervilha": "🌽",
  Calabresa: "🌶️",
  Carne: "🥩",
  "Carne de sol": "🥩",
  "Queijo coalho": "🧀",
  Mussarela: "🧀",
  "Cheddar e Cheese": "🧀",
  Presunto: "🥓",
};

export const RECHEIOS: Recheio[] = [
  "Ketchup",
  "Maionese",
  "Mostarda",
  "Barbecue",
  "Maionese caseira",
  "Ovo de codorna",
  "Passas",
  "Azeitona",
  "Milho verde e ervilha",
  "Calabresa",
  "Carne",
  "Carne de sol",
  "Queijo coalho",
  "Mussarela",
  "Cheddar e Cheese",
  "Presunto",
];

export const cardapioItems: CardapioItem[] = [
  // ── Pastéis Tradicionais ──────────────────────────────────
  {
    id: 1,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788400743/pastel_tradicional_sif8fk.png",
    nome: "Pastel de Queijo",
    descricao: "Massa crocante recheada com queijo mussarela derretido.",
    preco: 5.99,
    categoria: "Pastéis Tradicionais",
    destaque: true,
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788400743/pastel_tradicional_sif8fk.png",
    nome: "Pastel de Carne",
    descricao: "Massa crocante recheada com carne moída temperada.",
    preco: 6.99,
    categoria: "Pastéis Tradicionais",
    destaque: true,
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788400743/pastel_tradicional_sif8fk.png",
    nome: "Pastel de Frango",
    descricao: "Massa crocante recheada com frango desfiado .",
    preco: 6.49,
    categoria: "Pastéis Tradicionais",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788400743/pastel_tradicional_sif8fk.png",
    nome: "Pastel de Camarão",
    descricao: "Massa crocante recheada com camarão ao alho-óleo com toque de limão e pimenta.",
    preco: 8.99,
    categoria: "Pastéis Tradicionais",
  },
  {
    id: 5,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788400743/pastel_tradicional_sif8fk.png",
    nome: "Pastel de Pizza",
    descricao:
      "Presunto, mussarela, tomate e azeitona — como uma pizza, mas melhor.",
    preco: 7.49,
    categoria: "Pastéis Tradicionais",
    destaque: true,
  },
  // ── Monte seu Pastel ──────────────────────────────────────
  {
    id: 6,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1786052862/WhatsApp_Image_2026-08-06_at_6.13.02_PM_1_x64spf.jpg",
    nome: "Monte seu Pastel — até 5 sabores",
    descricao: "Escolha até 5 recheios e personalize do seu jeito.",
    preco: MONTE_SEU_PASTEL_PRECOS["5-sabores"],
    categoria: "Monte seu pastel",
    destaque: true,
  },
  {
    id: 7,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1786052862/WhatsApp_Image_2026-08-06_at_6.13.02_PM_1_x64spf.jpg",
    nome: "Monte seu Pastel — até 8 sabores",
    descricao: "Escolha até 8 recheios e faça o pastel dos seus sonhos.",
    preco: MONTE_SEU_PASTEL_PRECOS["8-sabores"],
    categoria: "Monte seu pastel",
  },
  // ── Pastéis Doces ─────────────────────────────────────────
  {
    id: 8,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1788401079/pastel-doce-de-leite-banana_qchzbv.png",
    nome: "Doce de Leite com Banana",
    descricao: "Doce de leite cremoso com banana caramelada em massa crocante.",
    preco: 14.0,
    categoria: "Pastéis Doces",
    destaque: true,
  },
  {
    id: 9,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053169/pastel-doce.jpg",
    nome: "Nutella com Ninho e Morango",
    descricao: "Nutella, leite em pó Ninho e morango fresco.",
    preco: 14.0,
    categoria: "Pastéis Doces",
  },
  {
    id: 10,
    img: "https://res.cloudinary.com/exercice-disp/image/upload/v1786053559/pastel-queijo-goiabada_zt9yqm.png",
    nome: "Goiabada com Queijo Coalho",
    descricao:
      "Goiabada cascão com queijo coalho — o clássico Romeu e Julieta no pastel.",
    preco: 14.0,
    categoria: "Pastéis Doces",
  },
];

export function getDestaques(): CardapioItem[] {
  return cardapioItems.filter((item) => item.destaque);
}

export function getByCategoria(categoria: Categoria): CardapioItem[] {
  return cardapioItems.filter((item) => item.categoria === categoria);
}

export function formatPrice(preco: number): string {
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}
