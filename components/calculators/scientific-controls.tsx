'use client';

import { Button } from '@/components/ui/button';
import { useCalculatorStore } from '@/store/calculator-store';

const scientificKeys = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pi', 'e'] as const;

export interface ScientificControlsProps {
  onInsert: (value: string) => void;
}

export function ScientificControls({ onInsert }: ScientificControlsProps) {
  const { angleMode, toggleAngleMode } = useCalculatorStore();

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="rounded-full border-white/20 text-xs"
          aria-label="Toggle angle mode"
          onClick={toggleAngleMode}
        >
          Angle · {angleMode === 'deg' ? 'Degrees' : 'Radians'}
        </Button>
        <Button variant="ghost" className="rounded-full text-xs" onClick={() => onInsert(',')}>
          Add comma
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {scientificKeys.map((item) => (
          <Button key={item} variant="ghost" className="rounded-2xl text-sm" onClick={() => onInsert(`${item}(`)}>
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
