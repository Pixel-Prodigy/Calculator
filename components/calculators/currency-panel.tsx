'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { currencySchema } from '@/lib/validation/calculator-schemas';
import { convertCurrency } from '@/lib/calculations/currency';
import { formatCurrency } from '@/lib/utils';

import type { CurrencyConversionValues, CurrencyRates } from '@/types/calculators';

export interface CurrencyPanelProps {
  initialRates: CurrencyRates;
  onEvaluated: (expression: string, result: string) => void;
}

async function loadRates(): Promise<CurrencyRates> {
  const response = await fetch('/api/rates');
  if (!response.ok) {
    throw new Error('Unable to fetch rates');
  }
  return (await response.json()) as CurrencyRates;
}

export function CurrencyPanel({ initialRates, onEvaluated }: CurrencyPanelProps) {
  const { data: rates = initialRates } = useQuery({
    queryKey: ['currency-rates'],
    queryFn: loadRates,
    initialData: initialRates,
    staleTime: 60 * 60 * 1000
  });
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>();

  const options = useMemo(() => Object.keys(rates.rates).sort(), [rates]);

  const form = useForm<CurrencyConversionValues>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      amount: 2500,
      from: 'USD',
      to: 'EUR'
    }
  });

  function onSubmit(values: CurrencyConversionValues) {
    try {
      setError(undefined);
      const converted = convertCurrency(values, rates);
      const formatted = formatCurrency(converted, values.to);
      setOutput(formatted);
      onEvaluated(`${values.amount} ${values.from} -> ${values.to}`, formatted);
    } catch (exception) {
      setError((exception as Error).message);
    }
  }

  return (
    <div className="space-y-5">
      <form className="grid gap-4 md:grid-cols-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="100"
            aria-label="Amount to convert"
            {...form.register('amount', { valueAsNumber: true })}
          />
          {form.formState.errors.amount ? (
            <p className="text-xs text-rose-400">{form.formState.errors.amount.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>From currency</Label>
          <Select
            defaultValue={form.getValues('from')}
            onValueChange={(value) => form.setValue('from', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>To currency</Label>
          <Select defaultValue={form.getValues('to')} onValueChange={(value) => form.setValue('to', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((code) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="rounded-2xl md:col-span-3">
          Convert instantly
        </Button>
      </form>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {output ? (
        <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 px-6 py-4 text-3xl font-bold text-emerald-300">
          {output}
        </div>
      ) : null}
    </div>
  );
}
