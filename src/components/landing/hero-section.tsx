"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Starfield } from "./starfield";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section id="inicio" className="relative w-full flex items-center justify-center text-center text-white pt-32 pb-24 overflow-hidden">
      {/* Animated Zooming Background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <Image
          src="/images/nasa.jpg"
          alt="Fondo tecnológico de arquitectura empresarial"
          fill
          className="object-cover opacity-20"
          priority
        />
        <Starfield />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating Elements for Dynamism */}
      <motion.div 
        className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"
        animate={{ 
          y: [20, -20, 20],
          x: [10, -10, 10],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 pb-2 leading-tight">
            {t("title")}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200 leading-snug max-w-3xl mx-auto">
            {t("subtitle")}
          </h2>
          <div className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
            <p className="font-semibold text-gray-300">{t("description")}</p>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* CTA Link to Contact Page */}
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 group transition-all duration-300 hover:scale-[1.02]">
            <Link href={`/${locale}/contacto`}>
              {t("cta")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white/40 hover:bg-white hover:text-black bg-white/5 backdrop-blur-md h-12 px-8 transition-all duration-300 hover:scale-[1.02]">
            <Link href="#arquitectura">{t("secondary_cta")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}