import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`} className="border-border">
          <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline sm:text-lg">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
