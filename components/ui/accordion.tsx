import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({ className, ...props }: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn(
      'overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white',
      className
    )}
    {...props}
  />
);

export const AccordionTrigger = ({ className, children, ...props }: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'flex flex-1 items-center justify-between px-4 py-3 text-left text-base font-semibold transition hover:bg-white/5',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({ className, ...props }: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn('px-4 pb-4 text-sm text-white/70 data-[state=closed]:hidden', className)}
    {...props}
  />
);
