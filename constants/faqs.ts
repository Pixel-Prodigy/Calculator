export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'compliance',
    question: 'Is OmniCalc auditable for finance and compliance teams?',
    answer:
      'Yes. Every calculation is logged with inputs, outputs, user ID, and timestamp. Export JSON evidence to your governance system in two clicks.'
  },
  {
    id: 'accuracy',
    question: 'How accurate are the financial models?',
    answer:
      'We rely on math.js high-precision arithmetic plus custom rounding utilities. Mortgage schedules are validated against Fannie Mae reference data.'
  },
  {
    id: 'branding',
    question: 'Can I embed OmniCalc in my application?',
    answer:
      'Absolutely. Use the SDK to embed calculators, or export React components configured with your tokens. Tailwind-driven theming keeps branding consistent.'
  },
  {
    id: 'roadmap',
    question: 'What variants are planned next?',
    answer:
      'We are adding engineering (beam load), health (macros), and AI-assisted “explain this result” experiences. Roadmap is shaped with our community.'
  }
];
