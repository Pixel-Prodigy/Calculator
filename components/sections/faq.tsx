import { faqs } from '@/constants/faqs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FaqSection() {
  return (
    <section id="faq" className="container space-y-6 py-24">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">FAQ</p>
        <h3 className="text-3xl font-semibold text-white">Everything buyers ask us.</h3>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
