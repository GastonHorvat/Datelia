"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

const CLUTCH_PROFILE_URL = "https://clutch.co/profile/datelia";

export function HomeTestimonialsSection() {
  const t = useTranslations("home_testimonials");
  const tCasos = useTranslations("casos_page");

  const testimonials = [0, 1].map((i) => ({
    quote: tCasos(`testimonials.${i}.quote`),
    author: tCasos(`testimonials.${i}.author`),
    source: tCasos(`testimonials.${i}.source`),
  }));

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-primary mb-12">
          {t("title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author}>
              <Quote className="h-7 w-7 text-primary/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-headline leading-snug text-foreground">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="mt-5">
                <p className="font-semibold">{testimonial.author}</p>
                <a
                  href={CLUTCH_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {testimonial.source}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
