import { act } from 'react';

import { useCalculatorStore } from '@/store/calculator-store';

describe('useCalculatorStore', () => {
  beforeEach(() => {
    act(() => {
      useCalculatorStore.setState({
        activeVariant: 'basic',
        expression: '',
        angleMode: 'deg',
        history: []
      });
    });
  });

  it('switches variants and appends expression input', () => {
    act(() => {
      useCalculatorStore.getState().setVariant('scientific');
      useCalculatorStore.getState().appendExpression('12');
    });

    const state = useCalculatorStore.getState();
    expect(state.activeVariant).toBe('scientific');
    expect(state.expression).toBe('12');
  });

  it('persists latest calculations in history', () => {
    act(() => {
      useCalculatorStore
        .getState()
        .pushHistory({ variant: 'basic', expression: '2+2', result: '4' });
    });

    const state = useCalculatorStore.getState();
    expect(state.history).toHaveLength(1);
    expect(state.history[0]).toEqual(
      expect.objectContaining({
        expression: '2+2',
        result: '4',
        variant: 'basic'
      })
    );
  });
});
