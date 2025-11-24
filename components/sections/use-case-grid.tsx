import type { ComponentType } from 'react';

import { useCases } from '@/constants/use-cases';
import { Card } from '@/components/ui/card';
import { calculatorConfigs } from '@/constants/calculators';
import * as Icons from 'lucide-react';

export function UseCaseGrid() {
  return (
    <section id="use-cases" className="container space-y-8 py-24">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Use cases</p>
        <h3 className="text-3xl font-semibold text-white">Drop-in calculators for every org.</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {useCases.map((useCase) => {
          const Icon =
            (Icons as Record<string, ComponentType<{ className?: string }>>)[useCase.icon] ?? Icons.Zap;
          return (
            <Card key={useCase.id} className="space-y-4 border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-white/10 p-2">
                  <Icon className="h-5 w-5 text-brand" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-white">{useCase.title}</p>
                  <p className="text-sm text-white/60">{useCase.metric}</p>
                </div>
              </div>
              <p className="text-sm text-white/80">{useCase.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                {useCase.calculators.map((variant) => (
                  <span key={variant} className="rounded-full border border-white/10 px-3 py-1">
                    {calculatorConfigs.find((config) => config.id === variant)?.label ?? variant}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
