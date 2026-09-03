'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  detalhes?: string[];
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantidade'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = 'pdh-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch { /* ignore */ }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantidade'>) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID(), quantidade: 1 }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantidade: qty } : i)));
    }
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      localStorage.setItem(STORAGE_KEY, '[]');
    } catch {
      /* ignore */
    }
  }, []);

  const total = items.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const count = items.reduce((s, i) => s + i.quantidade, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
