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
const LOGOS: Record<(typeof CASES)[number], { src: string; width: number; height: number; heightClass: string }> = {
  cedsa: { src: "/images/logos/cedsa.png", width: 550, height: 557, heightClass: "h-9" },
  // El cartel de La Francisca tiene mucho borde decorativo: a igual altura que los otros 2, el texto real queda muy chico. Se agranda para compensar.
  la_francisca: { src: "/images/logos/la-francisca.png", width: 399, height: 206, heightClass: "h-14" },
  la_tablada: { src: "/images/logos/la-tablada.webp", width: 332, height: 100, heightClass: "h-9" },
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
              className="group block rounded-2xl border border-background/15 bg-background/5 hover:border-primary/40 transition-colors overflow-hidden"
            >
              {/* Barra oscura de ancho completo: mismo tamaño para los 3 logos (en vez de un chip ajustado al contenido, que salía de ancho distinto para cada uno). Los 3 logos tienen wordmark claro, pensado para fondo oscuro. */}
              <div className="h-20 flex items-center justify-between px-5 bg-background">
                <Image
                  src={LOGOS[key].src}
                  alt={tCaseNames(key)}
                  width={LOGOS[key].width}
                  height={LOGOS[key].height}
                  className={`${LOGOS[key].heightClass} w-auto object-contain`}
                />
                <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors shrink-0" />
              </div>
              <div className="p-6 group-hover:bg-background/10 transition-colors">
                <h3 className="text-xl font-headline font-bold mb-2">{tCaseNames(key)}</h3>
                <p className="text-background/70 text-sm leading-relaxed">{summaries[key]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
