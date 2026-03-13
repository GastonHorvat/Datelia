import Image from "next/image";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function TestimonialSection() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      name: t("t1_name"),
      role: t("t1_role"),
      quote: t("t1_quote"),
      image: "/images/jimena.jpg"
    },
    {
      name: t("t2_name"),
      role: t("t2_role"),
      quote: t("t2_quote"),
      image: "/images/cto.jpg"
    }
  ];

  return (
    <section id="manifiesto" className="py-20 sm:py-28 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-8 rounded-3xl bg-card border border-primary/20 shadow-xl">
              <Quote className="h-10 w-10 text-primary/50 mb-4" />
              <blockquote className="text-xl font-medium leading-relaxed italic mb-8 text-white">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <footer>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
