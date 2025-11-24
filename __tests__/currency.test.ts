import { convertCurrency } from '@/lib/calculations/currency';
import type { CurrencyRates } from '@/types/calculators';

const mockRates: CurrencyRates = {
  base: 'USD',
  timestamp: Date.now(),
  rates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.8
  }
};

describe('convertCurrency', () => {
  it('converts between currencies using USD as the bridge', () => {
    const output = convertCurrency({ amount: 1000, from: 'USD', to: 'EUR' }, mockRates);
    expect(output).toBeCloseTo(920);
  });

  it('throws when currency is missing', () => {
    expect(() =>
      convertCurrency({ amount: 100, from: 'USD', to: 'JPY' }, mockRates)
    ).toThrow('Unsupported currency code');
  });
});
