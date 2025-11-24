import { CurrencyRates } from '@/types/calculators';

const FALLBACK_RATES: CurrencyRates = {
  base: 'USD',
  timestamp: Date.now(),
  rates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.8,
    INR: 83.1,
    JPY: 151.2,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88
  }
};

interface ExchangeApiResponse {
  result: string;
  time_last_update_unix: number;
  base_code: string;
  rates: Record<string, number>;
}

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 60 * 60 },
      cache: 'force-cache'
    });

    if (!response.ok) {
      return FALLBACK_RATES;
    }

    const payload = (await response.json()) as ExchangeApiResponse;
    if (payload.result !== 'success') {
      return FALLBACK_RATES;
    }

    return {
      base: payload.base_code,
      timestamp: payload.time_last_update_unix * 1000,
      rates: payload.rates
    };
  } catch (error) {
    console.error('Currency rates fallback triggered', error);
    return FALLBACK_RATES;
  }
}
