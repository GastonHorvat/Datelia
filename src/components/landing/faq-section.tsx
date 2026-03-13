"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const t = useTranslations("faq");

    const faqs = [
        {
            question: t("q1"),
            answer: (
                <div className="space-y-4">
                    <p>{t("a1.intro")}</p>
                    <ul className="list-none space-y-4 pl-2">
                        <li>
                            <strong className="text-primary block mb-1">{t("a1.step1_title")}</strong>
                            {t("a1.step1_desc")}
                        </li>
                        <li>
                            <strong className="text-primary block mb-1">{t("a1.step2_title")}</strong>
                            {t("a1.step2_desc")}
                        </li>
                        <li>
                            <strong className="text-primary block mb-1">{t("a1.step3_title")}</strong>
                            {t("a1.step3_desc")}
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            question: t("q2"),
            answer: (
                <div className="space-y-2">
                    <p className="font-semibold text-primary">{t("a2.badge")}</p>
                    <p>
                        {t("a2.p1")}
                    </p>
                    <p>
                        {t("a2.p2")}
                    </p>
                </div>
            ),
        },
        {
            question: t("q3"),
            answer: (
                <div className="space-y-2">
                    <p>
                        {t("a3.p1")}
                    </p>
                    <p>
                        {t("a3.p2")}
                    </p>
                    <p className="font-semibold text-primary">
                        {t("a3.p2_strong")}
                    </p>
                </div>
            ),
        },
        {
            question: t("q4"),
            answer: (
                <div className="space-y-2">
                    <p>
                        {t("a4.p1")}
                    </p>
                    <p>
                        {t("a4.p2")}
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section id="faq" className="py-24 sm:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                        {t("description")}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60 py-2">
                                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary hover:no-underline transition-colors py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
