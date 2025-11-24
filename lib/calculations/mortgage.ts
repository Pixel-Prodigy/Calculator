import { MortgageResult, MortgageResultRow, MortgageValues } from '@/types/calculators';
import { roundTo } from '@/lib/utils';

export function buildMortgageSchedule(values: MortgageValues): MortgageResult {
  const { principal, annualRate, years, extraPayment = 0 } = values;
  const monthlyRate = annualRate / 12 / 100;
  const totalPayments = years * 12;

  if (monthlyRate <= 0) {
    throw new Error('Rate must be greater than zero');
  }

  const basePayment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
  const payment = basePayment + extraPayment;

  const amortization: MortgageResultRow[] = [];
  let remainingBalance = principal;
  let totalInterest = 0;
  let month = 1;

  while (remainingBalance > 0 && month <= totalPayments + 1) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = Math.min(payment - interestPayment, remainingBalance);
    remainingBalance = roundTo(remainingBalance - principalPayment, 2);
    totalInterest += interestPayment;

    amortization.push({
      month,
      interestPayment: roundTo(interestPayment, 2),
      principalPayment: roundTo(principalPayment, 2),
      remainingBalance: Math.max(roundTo(remainingBalance, 2), 0)
    });

    if (remainingBalance <= 0) {
      break;
    }
    month += 1;
  }

  return {
    monthlyPayment: roundTo(payment, 2),
    totalInterest: roundTo(totalInterest, 2),
    amortization
  };
}
