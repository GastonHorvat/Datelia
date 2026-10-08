"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

interface Stage {
  title: string;
  desc: string;
}

interface CasePageTemplateProps {
  /** Namespace de next-intl, ej. "caso_cedsa" */
  namespace: string;
  /** "list" si what_we_did es un array de strings, "stages" si es un array de {title, desc} (caso La Francisca) */
  whatWeDidShape: "list" | "stages";
  whatWeDidCount: number;
  hasQuote: boolean;
  hasNextStage: boolean;
  /** Logo real del cliente, mostrado en el hero. Opcional: si no hay logo, el hero queda solo con texto. */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  /** El hero tiene fondo claro (bg-accent). Activar si el logo es blanco/transparente y necesita un respaldo oscuro para no desaparecer. */
  logoNeedsDarkChip?: boolean;
  /**
   * Captura real del sistema entregado a este cliente. Opcional. Cuando está
   * presente, usa namespace.screenshot_caption; se muestra al final de "Qué hicimos".
   */
  screenshotSrc?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
}

export function CasePageTemplate({ namespace, whatWeDidShape, whatWeDidCount, hasQuote, hasNextStage, logoSrc, logoWidth = 400, logoHeight = 240, logoNeedsDarkChip = false, screenshotSrc, screenshotWidth = 1600, screenshotHeight = 1000 }: CasePageTemplateProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();

  const whatWeDid =
    whatWeDidShape === "list"
      ? Array.from({ length: whatWeDidCount }, (_, i) => t(`what_we_did.${i}`))
      : Array.from({ length: whatWeDidCount }, (_, i) => ({
          title: t(`what_we_did.${i}.title`),
          desc: t(`what_we_did.${i}.desc`),
        }));

  return (
    <Layout>
      {/* Hero / Ficha (Layout ya renderiza Breadcrumbs globalmente, no duplicar acá) */}
      <section className="bg-accent text-accent-foreground pt-32 pb-12 sm:pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {logoSrc && (
              logoNeedsDarkChip ? (
                <span className="inline-flex items-center rounded-md bg-background px-3 py-2 mb-5">
                  <Image
                    src={logoSrc}
                    alt={t("title")}
                    width={logoWidth}
                    height={logoHeight}
                    className="h-7 w-auto object-contain"
                  />
                </span>
              ) : (
                <Image
                  src={logoSrc}
                  alt={t("title")}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-10 w-auto object-contain mb-5"
                />
              )
            )}
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
              {t("ficha")}
            </p>
            <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Punto de partida */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-5">
            {t("starting_point_label")}
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">{t("starting_point")}</p>
        </div>
      </section>

      {/* Qué hicimos */}
      <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-10">
            {t("what_we_did_label")}
          </h2>
          {whatWeDidShape === "list" ? (
            <ul className="space-y-4">
              {(whatWeDid as string[]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <span className="text-base md:text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-8">
              {(whatWeDid as Stage[]).map((stage, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{stage.title}</h3>
                    <p className="text-base leading-relaxed text-accent-foreground/90">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasNextStage && (
            <div className="mt-10 pt-6 border-t border-accent-foreground/15">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                {t("next_stage_label")}
              </p>
              <p className="text-base leading-relaxed">{t("next_stage")}</p>
            </div>
          )}

          {screenshotSrc && (
            <div className="mt-10">
              <div className="overflow-hidden rounded-xl border border-accent-foreground/15 shadow-2xl shadow-black/20">
                <Image
                  src={screenshotSrc}
                  alt={t("screenshot_caption")}
                  width={screenshotWidth}
                  height={screenshotHeight}
                  className="w-full h-auto"
                  sizes="(min-width: 1024px) 48rem, 100vw"
                />
              </div>
              <p className="mt-3 text-sm text-accent-foreground/60">{t("screenshot_caption")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Resultado */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-5">
            {t("result_label")}
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">{t("result")}</p>
        </div>
      </section>

      {/* Cita */}
      {hasQuote && (
        <section className="py-16 sm:py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <Quote className="h-8 w-8 text-primary/40 mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-headline leading-snug mb-6">
              &quot;{t("quote")}&quot;
            </blockquote>
            <p className="font-semibold">{t("quote_author")}</p>
            <p className="text-sm text-muted-foreground">{t("quote_source")}</p>
          </div>
        </section>
      )}

      {/* Tecnología */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t("tech_label")}:</span> {t("tech")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Button asChild size="lg" variant="secondary">
            <Link href={`/${locale}/contacto`}>
              {t("cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
