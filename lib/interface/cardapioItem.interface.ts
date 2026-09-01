
export interface CardapioItem {
  id: number;
  img: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
  destaque?: boolean;
}

export type Categoria =
  | 'Pastéis Tradicionais'
  | 'Monte seu pastel'
  | 'Pastéis Doces'
  | 'Bebidas';

export type MonteSeuPastelTamanho = '5-sabores' | '8-sabores';

export type Recheio =
  | 'Ketchup'
  | 'Maionese'
  | 'Mostarda'
  | 'Barbecue'
  | 'Maionese caseira'
  | 'Ovo de codorna'
  | 'Passas'
  | 'Azeitona'
  | 'Milho verde e ervilha'
  | 'Calabresa'
  | 'Carne'
  | 'Carne de sol'
  | 'Queijo coalho'
  | 'Mussarela'
  | 'Cheddar e Cheese'
  | 'Presunto';

export interface PastelPersonalizado {
  tamanho: MonteSeuPastelTamanho;
  recheios: Recheio[];
}