import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-lg border-b border-white/5 bg-slate-950/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          OmniCalc
        </Link>
        <nav className="hidden gap-6 text-sm text-white/70 md:flex">
          <Link href="#calculators" className="hover:text-white">
            Calculators
          </Link>
          <Link href="#use-cases" className="hover:text-white">
            Use cases
          </Link>
          <Link href="#faq" className="hover:text-white">
            FAQ
          </Link>
        </nav>
        <Button asChild className="rounded-full">
          <Link href="#book-demo">Book demo</Link>
        </Button>
      </div>
    </header>
  );
}
