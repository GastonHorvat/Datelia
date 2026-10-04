"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

export function ProblemsSection() {
  const t = useTranslations("home_problems");
  const shouldReduceMotion = useReducedMotion();

  const items = Array.from({ length: 5 }, (_, i) => t(`items.${i}`));

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };
  const item = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-14">
          {t("title")}
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {items.map((text, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`flex items-start gap-3 p-5 rounded-xl border border-border bg-card ${i === items.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground/90">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-muted-foreground mt-10 text-lg">{t("closing")}</p>
      </div>
    </section>
  );
}
