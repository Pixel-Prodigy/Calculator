'use client';

import { useState } from 'react';

import { CalculatorDisplay } from '@/components/calculators/calculator-display';
import { CalculatorKeypad } from '@/components/calculators/calculator-keypad';
import { useCalculatorStore } from '@/store/calculator-store';
import { expressionSchema } from '@/lib/validation/calculator-schemas';
import { evaluateArithmetic } from '@/lib/calculations/arithmetic';

export interface EvaluationPayload {
  expression: string;
  result: string;
  variant: 'basic' | 'scientific';
}

export interface BasicPanelProps {
  onEvaluated: (payload: EvaluationPayload) => void;
}

export function BasicPanel({ onEvaluated }: BasicPanelProps) {
  const { expression, setExpression, appendExpression } = useCalculatorStore();
  const [resultValue, setResultValue] = useState<string>('');
  const [status, setStatus] = useState<'default' | 'error' | 'success'>('default');
  const [helperText, setHelperText] = useState<string>('');

  function handleEvaluate() {
    const parsed = expressionSchema.safeParse({ expression });
    if (!parsed.success) {
      setStatus('error');
      setHelperText(parsed.error.errors[0]?.message ?? 'Unable to validate input');
      return;
    }

    try {
      const value = evaluateArithmetic(parsed.data.expression);
      const serialized = Array.isArray(value) ? value.join(', ') : String(value);
      setResultValue(serialized);
      setStatus('success');
      setHelperText('Evaluation succeeded');
      onEvaluated({ expression: parsed.data.expression, result: serialized, variant: 'basic' });
      setExpression(serialized);
    } catch (error) {
      setStatus('error');
      setHelperText((error as Error).message);
    }
  }

  function handleClear() {
    setExpression('');
    setStatus('default');
    setHelperText('');
    setResultValue('');
  }

  return (
    <div className="space-y-5">
      <CalculatorDisplay
        expression={expression}
        result={resultValue}
        label="Basic expression"
        status={status}
      />
      {helperText ? <p className="text-sm text-white/70">{helperText}</p> : null}
      <CalculatorKeypad
        onInput={(value) => appendExpression(value)}
        onEvaluate={handleEvaluate}
        onClear={handleClear}
      />
    </div>
  );
}
