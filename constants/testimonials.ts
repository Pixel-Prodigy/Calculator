export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarInitials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'pilot',
    quote:
      'We replaced three in-house calculators with OmniCalc in a week. The audit logs and history feed proved critical for our SOC2 renewal.',
    author: 'Kara Mendez',
    role: 'VP Finance, Polecat Data',
    avatarInitials: 'KM'
  },
  {
    id: 'labs',
    quote:
      'Scientific mode nails the micro-interactions our quant team wanted. The experience genuinely delights—a rarity in enterprise finance tools.',
    author: 'Ishaan Grover',
    role: 'Head of Product, Vela Labs',
    avatarInitials: 'IG'
  },
  {
    id: 'academy',
    quote:
      'Students love the subtle motion and contextual examples. OmniCalc turned our curriculum portal into something aspirational.',
    author: 'Dr. Lea Romero',
    role: 'Dean, Nova STEM Academy',
    avatarInitials: 'LR'
  }
];
