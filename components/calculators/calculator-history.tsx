'use client';

import { motion } from 'framer-motion';

import { useCalculatorStore } from '@/store/calculator-store';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export function CalculatorHistory() {
  const { history, clearHistory } = useCalculatorStore();

  if (!history.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-sm text-white/60">
        Calculations will land here for quick reuse.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/70">Activity</p>
        <Button variant="ghost" size="sm" className="rounded-full text-xs" onClick={clearHistory}>
          Clear
        </Button>
      </div>
      <div className="space-y-3">
        {history.map((entry) => (
          <motion.div
            layout
            key={entry.id}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
              <span>{entry.variant}</span>
              <span>{format(entry.createdAt, 'HH:mm:ss')}</span>
            </div>
            <p className="mt-1 text-white">{entry.expression}</p>
            <p className="text-brand font-semibold">{entry.result}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
