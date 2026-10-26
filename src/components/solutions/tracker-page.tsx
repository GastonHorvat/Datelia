"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  KanbanSquare,
  Users,
  Chrome,
  Webhook,
  BarChart3,
  ArrowUpRight,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Layout } from "@/components/layout";

const TRACKER_URL = "https://tracker.datelia.com.ar";

const FEATURE_ICONS = [KanbanSquare, Users, Chrome, Webhook, BarChart3] as const;

const SCREENSHOTS = [
  { src: "/images/producto/tracker-kanban-real.jpg", captionKey: "kanban_caption" },
  { src: "/images/producto/tracker-issue-real.jpg", captionKey: "issue_caption" },
  { src: "/images/producto/tracker-dashboard-real.jpg", captionKey: "dashboard_caption" },
] as const;

export function TrackerPage() {
  const t = useTranslations("sol_tracker");
  const shouldReduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const features = Array.from({ length: 5 }, (_, i) => ({
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
  }));

  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));

  // Recipe: opacity + translateY + blur "materializing" reveal, triggered once on scroll
  // into view. Spring with bounce: 0 for a production feel, not a bouncy one.
  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { type: "spring" as const, duration: 0.5, bounce: 0, delay },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IssueTracker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: t("hero.subtitle"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
    url: TRACKER_URL,
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16 sm:pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <KanbanSquare className="h-7 w-7 text-primary" />
            </div>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-4"
            >
              {t("hero.title")}
            </motion.h1>
            <p className="text-lg md:text-xl text-accent-foreground/80 leading-relaxed mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button asChild size="lg" className="group">
                <a href={TRACKER_URL} target="_blank" rel="noopener noreferrer">
                  {t("hero.cta_primary")}
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <p className="text-sm text-accent-foreground/60">{t("hero.cta_note")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.h2 {...reveal()} className="text-2xl md:text-3xl font-headline font-bold mb-10">
            {t("features_title")}
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <motion.div
                  key={i}
                  {...reveal(i * 0.07)}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  className="flex gap-4"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-headline font-bold mb-1.5">{feature.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capturas reales */}
      <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-10">
            <motion.h2 {...reveal()} className="text-2xl md:text-3xl font-headline font-bold mb-4">
              {t("screenshot_title")}
            </motion.h2>
            <motion.p
              {...reveal(0.05)}
              className="text-base md:text-lg text-accent-foreground/80 leading-relaxed"
            >
              {t("screenshot_body")}
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SCREENSHOTS.map(({ src, captionKey }, i) => (
              <motion.div key={src} {...reveal(i * 0.08)} className="group">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={t(`screenshots.${captionKey}`)}
                  className="relative block w-full overflow-hidden rounded-xl border border-border shadow-xl shadow-black/20 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                >
                  <Image
                    src={src}
                    alt={t(`screenshots.${captionKey}`)}
                    width={1452}
                    height={840}
                    className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 32vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <div className="flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <ZoomIn className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                </button>
                <p className="mt-3 text-sm text-accent-foreground/70">
                  {t(`screenshots.${captionKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent
          className="max-w-5xl w-[92vw] border-none bg-transparent p-0 shadow-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
          }}
        >
          {lightboxIndex !== null && (
            <div className="relative">
              <DialogTitle className="sr-only">
                {t(`screenshots.${SCREENSHOTS[lightboxIndex].captionKey}`)}
              </DialogTitle>
              <Image
                src={SCREENSHOTS[lightboxIndex].src}
                alt={t(`screenshots.${SCREENSHOTS[lightboxIndex].captionKey}`)}
                width={1452}
                height={840}
                className="w-full h-auto rounded-xl"
                sizes="92vw"
                priority
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {t(`screenshots.${SCREENSHOTS[lightboxIndex].captionKey}`)}
              </p>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Siguiente"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.h2 {...reveal()} className="text-2xl md:text-3xl font-headline font-bold mb-6">
            {t("cta_title")}
          </motion.h2>
          <Button asChild size="lg" variant="secondary">
            <a href={TRACKER_URL} target="_blank" rel="noopener noreferrer">
              {t("cta_button")}
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
