'use client';

import { create } from 'zustand';

import { CalculatorVariant } from '@/types/calculators';

export interface CalculatorHistoryEntry {
  id: string;
  variant: CalculatorVariant;
  expression: string;
  result: string;
  createdAt: number;
}

interface CalculatorStoreState {
  activeVariant: CalculatorVariant;
  expression: string;
  angleMode: 'deg' | 'rad';
  history: CalculatorHistoryEntry[];
  setVariant: (variant: CalculatorVariant) => void;
  setExpression: (value: string) => void;
  appendExpression: (value: string) => void;
  toggleAngleMode: () => void;
  pushHistory: (payload: Omit<CalculatorHistoryEntry, 'id' | 'createdAt'>) => void;
  clearHistory: () => void;
}

export const useCalculatorStore = create<CalculatorStoreState>((set) => ({
  activeVariant: 'basic',
  expression: '',
  angleMode: 'deg',
  history: [],
  setVariant: (variant) => set({ activeVariant: variant }),
  setExpression: (value) => set({ expression: value }),
  appendExpression: (value) =>
    set((state) => ({
      expression: `${state.expression}${value}`
    })),
  toggleAngleMode: () =>
    set((state) => ({
      angleMode: state.angleMode === 'deg' ? 'rad' : 'deg'
    })),
  pushHistory: (payload) =>
    set((state) => ({
      history: [
        {
          id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).slice(2),
          createdAt: Date.now(),
          ...payload
        },
        ...state.history
      ].slice(0, 10)
    })),
  clearHistory: () => set({ history: [] })
}));
