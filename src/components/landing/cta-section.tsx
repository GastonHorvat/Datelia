"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("cta_section");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contacto" className="py-20 sm:py-28 bg-primary text-primary-foreground text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-primary-foreground mb-5">
            {t("title")}
          </h2>
          <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            {t("description")}
          </p>
          <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg px-10 h-14 shadow-xl text-primary font-bold group">
              {t("button")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
