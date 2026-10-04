import { useTranslations } from "next-intl";
import { Award, Plug, UserCheck, Heart } from "lucide-react";

const ICONS = [Award, Plug, UserCheck, Heart];

export function WhyUsSection() {
  const t = useTranslations("home_why_us");
  const points = Array.from({ length: 4 }, (_, i) => ({
    title: t(`points.${i}.title`),
    desc: t(`points.${i}.desc`),
  }));

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-14">
          {t("title")}
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {points.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="flex gap-4">
                <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1.5">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
