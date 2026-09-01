import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartView from '@/app/components/market/CartView';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('marketTitle'),
    description: t('marketDescription'),
  };
}

export default function MarketPage() {
  return <CartView />;
}
