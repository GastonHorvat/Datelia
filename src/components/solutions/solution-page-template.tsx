"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Receipt, ClipboardList, FileSpreadsheet, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

// Los iconos se resuelven acá, adentro del Client Component, porque un componente
// (función) no se puede pasar como prop desde un Server Component (page.tsx) a un
// Client Component - React no puede serializarlo a través del límite server/client.
const ICONS = {
  receipt: Receipt,
  "clipboard-list": ClipboardList,
  "file-spreadsheet": FileSpreadsheet,
  "layout-dashboard": LayoutDashboard,
} as const;

type IconName = keyof typeof ICONS;

interface RelatedCase {
  slug: string;
  name: string;
}

interface SolutionPageTemplateProps {
  /** Namespace de next-intl con las claves: hero.title, hero.subtitle, problem, steps (array), includes (array) */
  namespace: string;
  icon: IconName;
  relatedCases: RelatedCase[];
  stepCount: number;
  includeCount: number;
  /**
   * Captura real de un producto entregado. Opcional: solo la solución que
   * tenga una imagen real para mostrar la pasa (no se inventan screenshots).
   * Cuando está presente, usa namespace.screenshot_title/body/caption.
   */
  screenshotSrc?: string;
}

export function SolutionPageTemplate({ namespace, icon, relatedCases, stepCount, includeCount, screenshotSrc }: SolutionPageTemplateProps) {
  const Icon = ICONS[icon];
  const t = useTranslations(namespace);
  const tCases = useTranslations("case_names");
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const steps = Array.from({ length: stepCount }, (_, i) => t(`steps.${i}`));
  const includes = Array.from({ length: includeCount }, (_, i) => t(`includes.${i}`));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t("hero.title"),
    description: t("hero.subtitle"),
    provider: {
      "@type": "Organization",
      name: "Datelia",
      url: "https://www.datelia.com.ar",
    },
    areaServed: "AR",
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero (Layout ya renderiza Breadcrumbs globalmente, no duplicar acá) */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16 sm:pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-4"
            >
              {t("hero.title")}
            </motion.h1>
            <p className="text-lg md:text-xl text-accent-foreground/80 leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* El problema */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
            {t("problem_label")}
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">{t("problem")}</p>
        </div>
      </section>

      {/* Cómo lo resolvemos */}
      <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-10">
            {t("steps_title")}
          </h2>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-base md:text-lg leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Captura real (solo si la solución tiene una para mostrar) */}
      {screenshotSrc && (
        <section className="py-16 sm:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
                {t("screenshot_title")}
              </h2>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                {t("screenshot_body")}
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/20">
                <Image
                  src={screenshotSrc}
                  alt={t("screenshot_title")}
                  width={1792}
                  height={2400}
                  className="w-full h-auto"
                  sizes="(min-width: 1024px) 64rem, 100vw"
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t("screenshot_caption")}</p>
            </div>
          </div>
        </section>
      )}

      {/* Qué incluye */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-10">
            {t("includes_title")}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Caso relacionado */}
      {relatedCases.length > 0 && (
        <section className="py-16 sm:py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-xl font-headline font-bold mb-6">{t("related_cases_title")}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {relatedCases.map((c) => (
                <Button key={c.slug} asChild variant="outline">
                  <Link href={`/${locale}/casos/${c.slug}`}>
                    {tCases(c.name)} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">{t("cta_title")}</h2>
          <Button asChild size="lg" variant="secondary">
            <Link href={`/${locale}/contacto`}>{t("cta_button")}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
