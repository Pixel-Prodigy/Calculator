'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const heroStats = [
  { label: 'Latency', value: '2.3 ms' },
  { label: 'Variants live', value: '04' },
  { label: 'Audit logs', value: '10K+' }
] as const;

export function HeroSection() {
  return (
    <section className="container grid gap-10 py-24 lg:grid-cols-2">
      <div className="space-y-8">
        <Badge className="bg-emerald-500/10 text-emerald-300">Production-ready calculators</Badge>
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black leading-tight text-white md:text-5xl"
          >
            One canvas for every calculation your business runs.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/70"
          >
            OmniCalc fuses scientific math, enterprise finance, and FX engines inside a single responsive experience
            enriched with micro-animations powered by Framer Motion.
          </motion.p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="rounded-full" asChild>
            <Link href="#calculators">Launch suite</Link>
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full" asChild>
            <Link href="#use-cases">See deployments</Link>
          </Button>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-[40px] border border-white/5 bg-glow-grid p-2 shadow-2xl"
      >
        <div className="rounded-[32px] border border-white/10 bg-black/60 p-6 text-white space-y-4">
          <p className="text-sm text-white/60">Workflow preview</p>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs text-white/50">FX conversion</p>
            <p className="text-3xl font-bold">€2,306.24</p>
            <p className="text-xs text-white/50 mt-1">Converted from $2,500 USD @ 0.9225</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs text-white/50">Mortgage model</p>
            <p className="text-3xl font-bold">$2,768</p>
            <p className="text-xs text-white/50 mt-1">P: $450k · r: 6.25% · 30y term</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
