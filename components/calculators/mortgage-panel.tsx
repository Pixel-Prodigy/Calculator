'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mortgageSchema } from '@/lib/validation/calculator-schemas';
import { buildMortgageSchedule } from '@/lib/calculations/mortgage';
import { formatCurrency } from '@/lib/utils';

import type { MortgageResult, MortgageValues } from '@/types/calculators';

export interface MortgagePanelProps {
  onEvaluated: (expression: string, result: string) => void;
}

export function MortgagePanel({ onEvaluated }: MortgagePanelProps) {
  const form = useForm<MortgageValues>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      principal: 450000,
      annualRate: 6.25,
      years: 30,
      extraPayment: 0
    }
  });
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [error, setError] = useState<string>();

  function onSubmit(values: MortgageValues) {
    try {
      setError(undefined);
      const schedule = buildMortgageSchedule(values);
      setResult(schedule);
      onEvaluated(
        `P:${values.principal} @${values.annualRate}% for ${values.years}y`,
        formatCurrency(schedule.monthlyPayment)
      );
    } catch (exception) {
      setError((exception as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="principal">Principal</Label>
          <Input
            id="principal"
            type="number"
            step="1000"
            aria-label="Principal amount"
            {...form.register('principal', { valueAsNumber: true })}
          />
          {form.formState.errors.principal ? (
            <p className="text-xs text-rose-400">{form.formState.errors.principal.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="annualRate">Annual rate (%)</Label>
          <Input
            id="annualRate"
            type="number"
            step="0.01"
            aria-label="Annual interest rate"
            {...form.register('annualRate', { valueAsNumber: true })}
          />
          {form.formState.errors.annualRate ? (
            <p className="text-xs text-rose-400">{form.formState.errors.annualRate.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="years">Term (years)</Label>
          <Input
            id="years"
            type="number"
            aria-label="Term in years"
            {...form.register('years', { valueAsNumber: true })}
          />
          {form.formState.errors.years ? (
            <p className="text-xs text-rose-400">{form.formState.errors.years.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="extraPayment">Extra monthly payment</Label>
          <Input
            id="extraPayment"
            type="number"
            step="50"
            aria-label="Extra monthly payment"
            {...form.register('extraPayment', { valueAsNumber: true })}
          />
          {form.formState.errors.extraPayment ? (
            <p className="text-xs text-rose-400">{form.formState.errors.extraPayment.message}</p>
          ) : null}
        </div>
        <Button type="submit" className="rounded-2xl md:col-span-2">
          Generate amortization
        </Button>
      </form>
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {result ? (
        <Card className="space-y-4 border-white/5 bg-white/5">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase text-white/40">Monthly payment</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(result.monthlyPayment)}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/40">Total interest</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(result.totalInterest)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/70">First 4 months</p>
            <div className="mt-2 grid gap-2 text-sm">
              {result.amortization.slice(0, 4).map((row) => (
                <div key={row.month} className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-2">
                  <span className="text-white/70">Month {row.month}</span>
                  <span className="text-white">
                    {formatCurrency(row.principalPayment)} principal / {formatCurrency(row.interestPayment)} interest
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
