import { getTranslations } from 'next-intl/server';
import { getDestaques } from '@/lib/data/cardapio';
import ItemCard from '@/app/components/cardapio/ItemCard';

export default async function HighlightsSection() {
  const t = await getTranslations('home');
  const destaques = getDestaques();

  return (
    <section
      className="py-14 max-w-5xl mx-auto"
      aria-labelledby="highlights-heading"
    >
      <h2
        id="highlights-heading"
        className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8 px-4"
      >
        {t('highlightsTitle')}
      </h2>

      {/*
        Mobile: scroll horizontal com snap
        Desktop: grid de 3 colunas
      */}
      <div
        className="
          flex gap-4 overflow-x-auto pb-4
          snap-x snap-mandatory
          scrollbar-hide
          -mx-0 px-4
          md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:px-4
        "
        role="list"
      >
        {destaques.map((item) => (
          <div
            key={item.id}
            role="listitem"
            className="snap-start shrink-0 w-72 md:w-auto"
          >
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
