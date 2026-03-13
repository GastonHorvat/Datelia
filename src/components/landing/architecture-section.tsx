"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function ArchitectureSection() {
    const t = useTranslations("architecture");

    return (
        <section id="arquitectura" className="py-20 sm:py-28 bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-accent-foreground">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-accent-foreground/80 leading-relaxed max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Card 1: Capacidades */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="bg-card border-primary/20 shadow-xl flex flex-col h-full hover:shadow-primary/5 transition-all">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary">{t("card1_title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-4">
                                    {(t.raw("card1_items") as string[]).map((item, i) => (
                                        <motion.li 
                                            key={i} 
                                            className="flex items-start gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                        >
                                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-foreground/90">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="bg-primary/5 pt-6 mt-4">
                                <p className="text-sm italic text-foreground/70 border-l-2 border-primary pl-4 py-1">
                                    {t("card1_quote")}
                                </p>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    {/* Card 2: Modelo D.O.A.™ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="bg-foreground text-background shadow-xl flex flex-col h-full border-transparent">
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-primary">{t("card2_title")}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-6">
                                <div>
                                    <p className="font-semibold text-lg mb-2 text-background/90">
                                        {t("card2_subtitle")}
                                    </p>
                                    <p className="text-background/70">
                                        {t("card2_desc")}
                                    </p>
                                </div>
                                <div className="space-y-5 mt-8">
                                    {(t.raw("card2_items") as {title: string, desc: string}[]).map((item, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="flex gap-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                        >
                                            <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-lg block mb-1">{item.title}</span>
                                                <span className="text-sm text-background/70 leading-relaxed">{item.desc}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
