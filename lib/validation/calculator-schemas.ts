import { z } from 'zod';

export const expressionSchema = z.object({
  expression: z
    .string()
    .min(1, { message: 'Expression is required' })
    .max(128, { message: 'Expression too long' })
});

export const scientificSchema = z.object({
  expression: z
    .string()
    .min(1)
    .max(128),
  angleMode: z.enum(['deg', 'rad'])
});

export const mortgageSchema = z.object({
  principal: z
    .number({ invalid_type_error: 'Principal must be a number' })
    .positive(),
  annualRate: z.number().positive(),
  years: z.number().int().positive(),
  extraPayment: z.number().min(0).optional()
});

export const currencySchema = z.object({
  amount: z.number().nonnegative(),
  from: z.string().length(3),
  to: z.string().length(3)
});
