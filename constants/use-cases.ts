export interface UseCase {
  id: string;
  title: string;
  description: string;
  metric: string;
  calculators: string[];
  icon: string;
}

export const useCases: UseCase[] = [
  {
    id: 'finops',
    title: 'FinOps automation',
    description: 'Centralize FX, amortization, and runway math with audit-ready traceability.',
    metric: '18% faster close',
    calculators: ['mortgage', 'currency'],
    icon: 'Building'
  },
  {
    id: 'product',
    title: 'Product pricing labs',
    description: 'Prototype pricing curves, cohorts, and incentives using scientific mode.',
    metric: '27 launch experiments',
    calculators: ['basic', 'scientific'],
    icon: 'Flask'
  },
  {
    id: 'sales',
    title: 'Enterprise deal desk',
    description: 'Bring mortgage + currency models into your CPQ stack with OmniCalc SDK.',
    metric: '$430M pipeline influenced',
    calculators: ['mortgage', 'currency', 'basic'],
    icon: 'Briefcase'
  },
  {
    id: 'education',
    title: 'STEM classrooms',
    description: 'Engage students with animated UX, gradients, and instant feedback loops.',
    metric: '9 global districts',
    calculators: ['scientific'],
    icon: 'GraduationCap'
  }
];
