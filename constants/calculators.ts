import {
  CalculatorConfig,
  CalculatorVariant,
  CurrencyConversionValues,
  MortgageValues,
  ScientificValues
} from '@/types/calculators';
import { expressionSchema, scientificSchema, mortgageSchema, currencySchema } from '@/lib/validation/calculator-schemas';
import { evaluateArithmetic, evaluateScientific } from '@/lib/calculations/arithmetic';
import { buildMortgageSchedule } from '@/lib/calculations/mortgage';

interface CalculatorBadgeMap {
  [key: string]: string;
}

const BADGES: CalculatorBadgeMap = {
  basic: 'Ops-ready',
  scientific: 'Trusted by PhDs',
  mortgage: 'Finance approved',
  currency: 'Realtime FX'
};

export const calculatorConfigs: CalculatorConfig<unknown, unknown>[] = [
  {
    id: 'basic',
    label: 'Basic',
    description: 'Evaluate quick expressions with rock-solid math.js precision.',
    badge: BADGES.basic,
    heroStat: '2ms median latency',
    schema: expressionSchema,
    evaluate: (values) => evaluateArithmetic((values as { expression: string }).expression),
    ctaLabel: 'Compute instantly'
  },
  {
    id: 'scientific',
    label: 'Scientific',
    description: 'Trig, exponentials, and logarithms with radian or degree control.',
    badge: BADGES.scientific,
    heroStat: '16 ops / second',
    schema: scientificSchema,
    evaluate: (values) => {
      const typedValues = values as ScientificValues;
      return evaluateScientific(typedValues.expression, typedValues.angleMode);
    },
    ctaLabel: 'Launch advanced mode'
  },
  {
    id: 'mortgage',
    label: 'Mortgage',
    description: 'Generate a full amortization schedule with prepayment insights.',
    badge: BADGES.mortgage,
    heroStat: 'Trusted in 11 countries',
    schema: mortgageSchema,
    evaluate: (values) => buildMortgageSchedule(values as MortgageValues),
    ctaLabel: 'Model financing'
  },
  {
    id: 'currency',
    label: 'Currency FX',
    description: 'Multi-currency conversions with hourly refreshed market data.',
    badge: BADGES.currency,
    heroStat: '8 majors + crypto soon',
    schema: currencySchema,
    evaluate: (values) => values as CurrencyConversionValues,
    ctaLabel: 'Convert capital'
  }
] satisfies CalculatorConfig<unknown, unknown>[];

export const calculatorOrder: CalculatorVariant[] = ['basic', 'scientific', 'mortgage', 'currency'];
