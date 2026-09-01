import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cardapioItems } from '@/lib/data/cardapio';
import MenuClient from '@/app/components/cardapio/MenuClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('menuTitle'),
    description: t('menuDescription'),
  };
}

export default async function CardapioPage() {
  return (
    <div className="max-w-5xl mx-auto pb-6">
      <MenuClient items={cardapioItems} />
    </div>
  );
}
