import { all, create } from 'mathjs';

const math = create(all, {
  number: 'number',
  precision: 14
});

const allowedTokens = /^[0-9+\-*/().,%\s^a-zA-Z]*$/;

function sanitizeExpression(expression: string) {
  if (!allowedTokens.test(expression)) {
    throw new Error('Unsupported characters detected');
  }

  return expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/–/g, '-')
    .replace(/\^/g, '^')
    .replace(/%/g, '/100');
}

export function evaluateArithmetic(expression: string) {
  const trimmed = expression.trim();
  if (!trimmed.length) {
    throw new Error('Please enter a value');
  }

  const sanitized = sanitizeExpression(trimmed);
  return math.evaluate(sanitized);
}

export function evaluateScientific(expression: string, angleMode: 'deg' | 'rad') {
  const sanitized = sanitizeExpression(expression.trim());
  if (!sanitized.length) {
    throw new Error('Please enter a value');
  }

  const degreeScope =
    angleMode === 'deg'
      ? {
          sin: (value: number) => Math.sin((value * Math.PI) / 180),
          cos: (value: number) => Math.cos((value * Math.PI) / 180),
          tan: (value: number) => Math.tan((value * Math.PI) / 180)
        }
      : {};

  return math.evaluate(sanitized, {
    ...degreeScope,
    ln: (value: number) => Math.log(value),
    log: (value: number) => Math.log10(value),
    sqrt: (value: number) => Math.sqrt(value),
    abs: (value: number) => Math.abs(value)
  });
}
