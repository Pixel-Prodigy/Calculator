'use client';

import { useState } from 'react';

import { CalculatorDisplay } from '@/components/calculators/calculator-display';
import { CalculatorKeypad } from '@/components/calculators/calculator-keypad';
import { ScientificControls } from '@/components/calculators/scientific-controls';
import { useCalculatorStore } from '@/store/calculator-store';
import { scientificSchema } from '@/lib/validation/calculator-schemas';
import { evaluateScientific } from '@/lib/calculations/arithmetic';

import type { EvaluationPayload } from '@/components/calculators/basic-panel';

export interface ScientificPanelProps {
  onEvaluated: (payload: EvaluationPayload) => void;
}

export function ScientificPanel({ onEvaluated }: ScientificPanelProps) {
  const { expression, setExpression, appendExpression, angleMode } = useCalculatorStore();
  const [resultValue, setResultValue] = useState<string>('');
  const [status, setStatus] = useState<'default' | 'error' | 'success'>('default');
  const [helperText, setHelperText] = useState<string>('');

  function handleEvaluate() {
    const parsed = scientificSchema.safeParse({ expression, angleMode });
    if (!parsed.success) {
      setStatus('error');
      setHelperText(parsed.error.errors[0]?.message ?? 'Unable to validate input');
      return;
    }

    try {
      const value = evaluateScientific(parsed.data.expression, parsed.data.angleMode);
      const serialized = Array.isArray(value) ? value.join(', ') : String(value);
      setResultValue(serialized);
      setStatus('success');
      setHelperText(`Mode: ${parsed.data.angleMode}`);
      onEvaluated({ expression: parsed.data.expression, result: serialized, variant: 'scientific' });
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
        label={`Scientific (${angleMode})`}
        status={status}
      />
      {helperText ? <p className="text-sm text-white/70">{helperText}</p> : null}
      <ScientificControls onInsert={(value) => appendExpression(value)} />
      <CalculatorKeypad
        onInput={(value) => appendExpression(value)}
        onEvaluate={handleEvaluate}
        onClear={handleClear}
      />
    </div>
  );
}
