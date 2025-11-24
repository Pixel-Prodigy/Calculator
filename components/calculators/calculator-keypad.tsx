'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

const keypadLayout = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '(', ')'],
  ['C', '^', '%', '+']
] as const;

export interface CalculatorKeypadProps {
  onInput: (value: string) => void;
  onEvaluate: () => void;
  onClear: () => void;
}

export function CalculatorKeypad({ onInput, onEvaluate, onClear }: CalculatorKeypadProps) {
  return (
    <div className="grid gap-3">
      {keypadLayout.map((row) => (
        <motion.div layout className="grid grid-cols-4 gap-3" key={row.join('-')}>
          {row.map((key) => {
            const isAction = ['+', '-', '*', '/', '^', '%'].includes(key);
            return (
              <Button
                key={key}
                variant={isAction ? 'ghost' : 'subtle'}
                className="rounded-2xl"
                aria-label={`Key ${key}`}
                onClick={() => {
                  if (key === 'C') {
                    onClear();
                    return;
                  }
                  onInput(key);
                }}
              >
                {key}
              </Button>
            );
          })}
        </motion.div>
      ))}
      <Button variant="default" size="lg" className="rounded-2xl" onClick={onEvaluate} aria-label="Evaluate expression">
        Evaluate ⏱
      </Button>
    </div>
  );
}
