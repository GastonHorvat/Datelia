import { useTranslations } from "next-intl";

export function HowWeWorkSection() {
  const t = useTranslations("home_how_we_work");
  const steps = Array.from({ length: 4 }, (_, i) => ({
    title: t(`steps.${i}.title`),
    desc: t(`steps.${i}.desc`),
  }));

  return (
    <section id="como-trabajamos" className="py-20 sm:py-24 bg-accent text-accent-foreground scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16">
          {t("title")}
        </h2>

        <div className="relative pl-10 sm:pl-14">
          <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-10 sm:-left-14 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-accent-foreground/80 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
