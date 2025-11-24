import { CurrencyConversionValues, CurrencyRates } from '@/types/calculators';
import { roundTo } from '@/lib/utils';

export function convertCurrency(values: CurrencyConversionValues, rates: CurrencyRates) {
  const { amount, from, to } = values;
  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];

  if (!fromRate || !toRate) {
    throw new Error('Unsupported currency code');
  }

  const usdAmount = amount / fromRate;
  const converted = usdAmount * toRate;

  return roundTo(converted, 4);
}
