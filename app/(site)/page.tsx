import { createSearchParamsCache, parseAsString } from 'nuqs/server';

import { HeroSection } from '@/components/sections/hero';
import { CalculatorBoard } from '@/components/calculators/calculator-board';
import { fetchCurrencyRates } from '@/lib/data/currency';
import { calculatorOrder } from '@/constants/calculators';
import { UseCaseGrid } from '@/components/sections/use-case-grid';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { FaqSection } from '@/components/sections/faq';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CtaSection } from '@/components/sections/cta';
import type { CalculatorVariant } from '@/types/calculators';

const searchParamsCache = createSearchParamsCache({
  calculator: parseAsString.withDefault('basic')
});

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const parsed = searchParamsCache.parse(searchParams);
  const rates = await fetchCurrencyRates();
  const safeVariant = (calculatorOrder.includes(parsed.calculator as CalculatorVariant)
    ? parsed.calculator
    : 'basic') as CalculatorVariant;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />
      <main className="space-y-24 py-12">
        <HeroSection />
        <section id="calculators" className="container">
          <CalculatorBoard initialVariant={safeVariant} rates={rates} />
        </section>
        <UseCaseGrid />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
