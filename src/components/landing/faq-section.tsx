"use client";

import { useTranslations } from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const t = useTranslations("faq");

    const items = Array.from({ length: 6 }, (_, i) => ({
        q: t(`items.${i}.q`),
        a: t(`items.${i}.a`),
    }));

    return (
        <section id="faq" className="py-20 sm:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
                <h2 className="text-3xl font-headline font-bold tracking-tight text-center mb-12">
                    {t("title")}
                </h2>

                <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60 py-1">
                            <AccordionTrigger className="text-left text-lg font-medium hover:text-primary hover:no-underline transition-colors py-4">
                                {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-1 pb-5">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
