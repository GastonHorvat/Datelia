"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Capturas reales de productos entregados (no son ilustraciones).
const COLLAGE = [
  { src: "/images/casos/la-francisca-real.png", alt: "Panel de logística de un cliente real de Datelia" },
  { src: "/images/tableros-dashboard-real.jpeg", alt: "Tablero de gestión real construido por Datelia" },
  { src: "/images/pedidos-y-presupuestos-real.png", alt: "Panel de presupuestos real construido por Datelia" },
] as const;

export function HeroSection() {
  const tHome = useTranslations("home_hero");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const dur = (d: number) => (shouldReduceMotion ? 0 : d);

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

          {/* Collage de capturas reales de productos entregados */}
          <div className="relative mt-8 lg:mt-0 h-[260px] sm:h-[360px] lg:h-[420px]" aria-hidden="true">
            {/* Trasera: logística (La Francisca) — a partir de sm */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ duration: dur(0.5), delay: dur(0.3) }}
              className="absolute left-0 top-[8%] hidden sm:block w-[52%] aspect-[16/11] rounded-xl border border-border shadow-2xl shadow-black/30 overflow-hidden"
            >
              <Image
                src={COLLAGE[0].src}
                alt={COLLAGE[0].alt}
                fill
                sizes="(min-width: 1024px) 30vw, 40vw"
                className="object-cover object-top"
              />
            </motion.div>

            {/* Principal: tablero de gestión — siempre visible, incluso en mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: dur(0.5), delay: dur(0.15) }}
              className="absolute right-0 top-0 z-10 w-[74%] sm:w-[62%] aspect-[16/11] rounded-xl border border-border shadow-2xl shadow-black/40 overflow-hidden"
            >
              <Image
                src={COLLAGE[1].src}
                alt={COLLAGE[1].alt}
                fill
                sizes="(min-width: 1024px) 36vw, 60vw"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            {/* Acento: presupuestos (La Tablada) — solo desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: dur(0.5), delay: dur(0.45) }}
              className="absolute left-[14%] bottom-0 z-20 hidden lg:block w-[42%] aspect-[16/11] rounded-xl border border-border shadow-xl shadow-black/30 overflow-hidden"
            >
              <Image
                src={COLLAGE[2].src}
                alt={COLLAGE[2].alt}
                fill
                sizes="25vw"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
