import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/lib/cart/cartContext';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import BottomNav from '@/app/components/layout/BottomNav';
import WhatsAppFAB from '@/app/components/ui/WhatsAppFAB';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'accessibility' });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider>
        <CartProvider>
        {/* Skip link — acessibilidade por teclado */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
            focus:px-4 focus:py-2
            focus:bg-brand-yellow focus:text-neutral-900
            focus:rounded-lg focus:font-semibold focus:shadow-lg
          "
        >
          {t('skipToContent')}
        </a>

        <Navbar />

        {/* pb-16 no mobile para não sobrepor BottomNav fixo */}
        <main id="main-content" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>

        <Footer />
        <BottomNav />
        <WhatsAppFAB />
        </CartProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
