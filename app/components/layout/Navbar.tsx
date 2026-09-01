'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useCart } from '@/lib/cart/cartContext';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();
  const isCartActive = pathname === '/market';

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 4);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-background/[0.92] backdrop-blur-md border-b border-border shadow-md dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav
        className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between gap-4"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/cardapio"
          className="flex items-center shrink-0"
          aria-label="Pastel da Hora — ir para o cardápio"
        >
          <Image
            src="https://res.cloudinary.com/exercice-disp/image/upload/v1786052556/WhatsApp_Image_2026-08-06_at_6.12.53_PM_1_qysqkm.jpg"
            alt="Pastel da Hora"
            width={44}
            height={44}
            className="rounded-xl object-cover border border-brand-yellow/60 shadow-sm sm:h-11 sm:w-11"
            priority
          />
        </Link>

        <div className="flex-1" aria-hidden="true" />

        {/* Ações */}
        <div className="flex items-center gap-1">
          {/* Cart icon — desktop only */}
          <Link
            href="/market"
            aria-label="Carrinho"
            aria-current={isCartActive ? 'page' : undefined}
            className={[
              'relative hidden md:flex p-2 rounded-lg transition-colors duration-150',
              isCartActive
                ? 'text-brand-red bg-brand-red/5'
                : 'text-foreground-muted hover:text-foreground hover:bg-surface',
            ].join(' ')}
          >
            <ShoppingBasket size={20} aria-hidden="true" />
            {count > 0 && (
              <span
                className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full bg-brand-red text-white text-[8px] font-bold flex items-center justify-center px-0.5 pointer-events-none"
                aria-label={`${count} itens no carrinho`}
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}
