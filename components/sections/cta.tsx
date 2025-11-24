import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section id="book-demo" className="container rounded-[32px] border border-white/10 bg-gradient-to-r from-brand/30 to-emerald-500/20 px-10 py-12 text-center shadow-2xl">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">Schedule</p>
      <h3 className="mt-3 text-3xl font-semibold text-white">Embed OmniCalc inside your workflow in under a week.</h3>
      <p className="mt-2 text-white/70">
        We pair implementation engineers with your team, wire up endpoints, and ship audit-ready calculators fast.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button size="lg" className="rounded-full">
          Request access
        </Button>
        <Button variant="ghost" size="lg" className="rounded-full">
          Download deck
        </Button>
      </div>
    </section>
  );
}
