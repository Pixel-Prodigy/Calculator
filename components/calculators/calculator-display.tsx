import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface CalculatorDisplayProps {
  expression: string;
  result?: string;
  label: string;
  status?: 'default' | 'error' | 'success';
}

export function CalculatorDisplay({ expression, result, label, status = 'default' }: CalculatorDisplayProps) {
  return (
    <motion.div
      layout
      className={cn(
        'rounded-3xl border px-6 py-5 text-right shadow-2xl',
        status === 'error' && 'border-rose-500/60 bg-rose-500/10',
        status === 'success' && 'border-emerald-400/60 bg-emerald-400/10',
        status === 'default' && 'border-white/10 bg-white/5'
      )}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
      <p className="mt-2 min-h-[40px] text-lg font-semibold text-white">{expression || '0'}</p>
      {result ? <p className="text-3xl font-black text-brand mt-1">{result}</p> : null}
    </motion.div>
  );
}
