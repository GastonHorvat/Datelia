"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MessageCircle, FileSpreadsheet, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const tHome = useTranslations("home_hero");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const dur = (d: number) => (shouldReduceMotion ? 0 : d);

  const inputCards = [
    { icon: MessageCircle, rotate: -6, delay: 0 },
    { icon: Mail, rotate: 4, delay: 0.15 },
    { icon: FileSpreadsheet, rotate: -3, delay: 0.3 },
  ];

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Texto */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.5) }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] text-foreground"
            >
              {tHome("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.5), delay: dur(0.1) }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {tHome("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.5), delay: dur(0.2) }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="h-12 px-7 group">
                <Link href={`/${locale}/contacto`}>
                  {tHome("cta_primary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7">
                <Link href={`/${locale}/casos`}>{tHome("cta_secondary")}</Link>
              </Button>
            </motion.div>

            <p className="mt-4 text-sm text-muted-foreground/80">{tHome("note")}</p>
          </div>

          {/* Gráfico: caos de canales -> IA -> ERP ordenado (no es una captura real, es una ilustración) */}
          <div className="relative h-[320px] sm:h-[380px] hidden lg:block" aria-hidden="true">
            {inputCards.map(({ icon: Icon, rotate, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate }}
                transition={{ duration: dur(0.4), delay: dur(0.3 + delay) }}
                className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm"
                style={{ left: `${10 + i * 8}%`, top: `${10 + i * 28}%` }}
              >
                <Icon className="h-6 w-6 text-muted-foreground" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: dur(0.5), delay: dur(0.5) }}
              className="absolute left-[38%] top-[38%] flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30"
            >
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: dur(0.5), delay: dur(0.7) }}
              className="absolute right-[6%] top-[42%] flex items-center gap-3 rounded-2xl border border-primary/20 bg-card px-5 py-4 shadow-md"
            >
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground">{tHome("erp_label")}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
