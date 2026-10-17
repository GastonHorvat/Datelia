import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const CASES = ["cedsa", "la_francisca", "la_tablada"] as const;
const SLUGS: Record<(typeof CASES)[number], string> = {
  cedsa: "cedsa",
  la_francisca: "la-francisca",
  la_tablada: "la-tablada",
};
const LOGOS: Record<(typeof CASES)[number], { src: string; width: number; height: number }> = {
  cedsa: { src: "/images/logos/cedsa.png", width: 550, height: 557 },
  la_francisca: { src: "/images/logos/la-francisca.png", width: 399, height: 206 },
  la_tablada: { src: "/images/logos/la-tablada.webp", width: 332, height: 100 },
};

export function HomeCasesSection() {
  const t = useTranslations("home_cases");
  const tCaseNames = useTranslations("case_names");
  const tCedsa = useTranslations("caso_cedsa");
  const tFrancisca = useTranslations("caso_la_francisca");
  const tTablada = useTranslations("caso_la_tablada");
  const locale = useLocale();

  const summaries: Record<(typeof CASES)[number], string> = {
    cedsa: tCedsa("summary"),
    la_francisca: tFrancisca("summary"),
    la_tablada: tTablada("summary"),
  };

  return (
    <section className="py-20 sm:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-background/70">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CASES.map((key) => (
            <Link
              key={key}
              href={`/${locale}/casos/${SLUGS[key]}`}
              className="group block rounded-2xl border border-background/15 bg-background/5 p-6 hover:bg-background/10 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                {/* Los 3 logos tienen wordmark claro, pensado para fondo oscuro; esta sección tiene fondo claro (bg-foreground), así que los 3 necesitan su propio respaldo oscuro para no desaparecer. */}
                <span className="inline-flex items-center rounded-md bg-background px-2.5 py-1.5">
                  <Image
                    src={LOGOS[key].src}
                    alt={tCaseNames(key)}
                    width={LOGOS[key].width}
                    height={LOGOS[key].height}
                    className="h-6 w-auto object-contain"
                  />
                </span>
                <ArrowUpRight className="h-5 w-5 text-background/50 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">{tCaseNames(key)}</h3>
              <p className="text-background/70 text-sm leading-relaxed">{summaries[key]}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
