import { NextResponse } from 'next/server';

import { fetchCurrencyRates } from '@/lib/data/currency';

export async function GET() {
  const data = await fetchCurrencyRates();
  return NextResponse.json(data, { status: 200 });
}
