'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { UtensilsCrossed, ShoppingBasket } from 'lucide-react';
import { useCart } from '@/lib/cart/cartContext';
import BusinessHours from '@/app/components/ui/BusinessHours';

const tabs = [
  { href: '/cardapio' as const, key: 'menu',   Icon: UtensilsCrossed },
  { href: '/market'  as const, key: 'market',  Icon: ShoppingBasket },
] as const;

export default function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();

  function handlePress(href: string, isActive: boolean) {
    if (isActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(href);
    }
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Horário de funcionamento */}
      <div className="border-b border-border/60">
        <BusinessHours compact />
      </div>

      <ul className="flex" role="list">
        {tabs.map(({ href, key, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <button
                type="button"
                onClick={() => handlePress(href, isActive)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'relative flex flex-col items-center justify-center',
                  'gap-1 py-2 w-full min-h-[56px] text-xs font-medium',
                  'transition-colors duration-150',
                  isActive
                    ? 'text-brand-red'
                    : 'text-foreground-muted hover:text-foreground',
                ].join(' ')}
              >
                {isActive && (
                  <span
                    className="absolute top-0 inset-x-3 h-0.5 bg-brand-yellow rounded-full"
                    aria-hidden="true"
                  />
                )}
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    aria-hidden="true"
                  />
                  {key === 'market' && count > 0 && (
                    <span
                      className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] rounded-full bg-brand-red text-white text-[8px] font-bold flex items-center justify-center px-0.5 pointer-events-none"
                      aria-label={`${count} itens no carrinho`}
                    >
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </div>
                <span>{t(key)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
