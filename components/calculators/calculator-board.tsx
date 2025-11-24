'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseAsString, useQueryStates } from 'nuqs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { calculatorConfigs, calculatorOrder } from '@/constants/calculators';
import { useCalculatorStore } from '@/store/calculator-store';
import { CalculatorHistory } from '@/components/calculators/calculator-history';
import { BasicPanel } from '@/components/calculators/basic-panel';
import { ScientificPanel } from '@/components/calculators/scientific-panel';
import { MortgagePanel } from '@/components/calculators/mortgage-panel';
import { CurrencyPanel } from '@/components/calculators/currency-panel';

import type { CalculatorVariant, CurrencyRates } from '@/types/calculators';
import type { EvaluationPayload } from '@/components/calculators/basic-panel';

export interface CalculatorBoardProps {
  initialVariant: CalculatorVariant;
  rates: CurrencyRates;
}

const variantQuery = {
  calculator: parseAsString.withDefault('basic')
};

const configMap = Object.fromEntries(calculatorConfigs.map((config) => [config.id, config])) as Record<
  CalculatorVariant,
  (typeof calculatorConfigs)[number]
>;

export function CalculatorBoard({ initialVariant, rates }: CalculatorBoardProps) {
  const { activeVariant, setVariant, pushHistory } = useCalculatorStore();
  const [, setQuery] = useQueryStates(variantQuery, {
    history: 'push',
    shallow: true
  });

  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant, setVariant]);

  useEffect(() => {
    setQuery({ calculator: activeVariant });
  }, [activeVariant, setQuery]);

  function handleEvaluation(payload: EvaluationPayload) {
    pushHistory({
      variant: payload.variant,
      expression: payload.expression,
      result: payload.result
    });
  }

  function handleFormEvaluation(expression: string, result: string, variant: CalculatorVariant) {
    pushHistory({
      variant,
      expression,
      result
    });
  }

  const activeConfig = configMap[activeVariant];

  return (
    <Card className="relative overflow-hidden border-white/5 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      <div className="absolute inset-0 animate-pulseGlow bg-glow-grid opacity-40" aria-hidden />
      <div className="relative space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge>{activeConfig.badge}</Badge>
            <h2 className="mt-3 text-3xl font-semibold">{activeConfig.label}</h2>
            <p className="text-sm text-white/70">{activeConfig.description}</p>
          </div>
          <Button variant="outline" className="rounded-full border-white/20">
            {activeConfig.ctaLabel}
          </Button>
        </div>
        <Tabs value={activeVariant} onValueChange={(value) => setVariant(value as CalculatorVariant)} className="space-y-6">
          <TabsList className="flex-wrap">
            {calculatorOrder.map((variant) => (
              <TabsTrigger key={variant} value={variant}>
                {configMap[variant].label}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="basic" forceMount>
              {activeVariant === 'basic' ? (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <BasicPanel onEvaluated={handleEvaluation} />
                </motion.div>
              ) : null}
            </TabsContent>
            <TabsContent value="scientific" forceMount>
              {activeVariant === 'scientific' ? (
                <motion.div
                  key="scientific"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <ScientificPanel onEvaluated={handleEvaluation} />
                </motion.div>
              ) : null}
            </TabsContent>
            <TabsContent value="mortgage" forceMount>
              {activeVariant === 'mortgage' ? (
                <motion.div
                  key="mortgage"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <MortgagePanel
                    onEvaluated={(expression, result) => handleFormEvaluation(expression, result, 'mortgage')}
                  />
                </motion.div>
              ) : null}
            </TabsContent>
            <TabsContent value="currency" forceMount>
              {activeVariant === 'currency' ? (
                <motion.div
                  key="currency"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <CurrencyPanel
                    initialRates={rates}
                    onEvaluated={(expression, result) => handleFormEvaluation(expression, result, 'currency')}
                  />
                </motion.div>
              ) : null}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        <CalculatorHistory />
      </div>
    </Card>
  );
}
