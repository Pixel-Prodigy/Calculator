import { ZodTypeAny } from 'zod';

export type CalculatorVariant = 'basic' | 'scientific' | 'mortgage' | 'currency';

export interface CalculatorConfig<TInput, TResult> {
  id: CalculatorVariant;
  label: string;
  description: string;
  badge: string;
  schema: ZodTypeAny;
  heroStat: string;
  evaluate: (values: TInput) => TResult;
  ctaLabel: string;
}

export interface CurrencyRates {
  base: string;
  timestamp: number;
  rates: Record<string, number>;
}

export interface MortgageValues {
  principal: number;
  annualRate: number;
  years: number;
  extraPayment?: number;
}

export interface MortgageResultRow {
  month: number;
  interestPayment: number;
  principalPayment: number;
  remainingBalance: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  amortization: MortgageResultRow[];
}

export interface CurrencyConversionValues {
  amount: number;
  from: string;
  to: string;
}

export interface ExpressionValues {
  expression: string;
}

export interface ScientificValues {
  expression: string;
  angleMode: 'deg' | 'rad';
}

export interface ConversionOption {
  value: string;
  label: string;
}
