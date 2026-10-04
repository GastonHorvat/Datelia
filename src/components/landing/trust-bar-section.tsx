"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const CLUTCH_PROFILE_URL = "https://clutch.co/profile/datelia";
const CLIENT_KEYS = ["cedsa", "la_francisca", "la_tablada"] as const;

export function TrustBarSection() {
  const t = useTranslations("home_trust");
  const tCaseNames = useTranslations("case_names");

  return (
    <section className="border-y border-border bg-card/40">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <a
            href={CLUTCH_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary" />
              ))}
            </span>
            <span className="font-semibold">5.0</span>
            <span className="text-muted-foreground">{t("rating_text")}</span>
          </a>

          <span className="hidden sm:block h-4 w-px bg-border" />

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-medium text-foreground/70">{t("clients_label")}:</span>
            {CLIENT_KEYS.map((key, i) => (
              <span key={key} className="font-medium">
                {tCaseNames(key)}
                {i < CLIENT_KEYS.length - 1 && <span className="mx-1.5 opacity-40">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
