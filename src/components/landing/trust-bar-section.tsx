"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const CLUTCH_PROFILE_URL = "https://clutch.co/profile/datelia";
const CLIENT_LOGOS = [
  { key: "cedsa", src: "/images/logos/cedsa.png", width: 550, height: 557, needsLightChip: false, heightClass: "h-8" },
  // Cartel con interior blanco opaco y fondo transparente afuera: se ve bien en cualquier fondo, sin chip.
  { key: "la_francisca", src: "/images/logos/la-francisca.png", width: 399, height: 206, needsLightChip: false, heightClass: "h-9" },
  { key: "la_tablada", src: "/images/logos/la-tablada.webp", width: 332, height: 100, needsLightChip: false, heightClass: "h-7" },
] as const;

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

          <div className="flex items-center gap-5">
            <span className="font-medium text-foreground/70">{t("clients_label")}:</span>
            {CLIENT_LOGOS.map(({ key, src, width, height, needsLightChip, heightClass }) =>
              needsLightChip ? (
                <span key={key} className="inline-flex items-center rounded-md bg-white px-2.5 py-1">
                  <Image src={src} alt={tCaseNames(key)} width={width} height={height} className={cn(heightClass, "w-auto object-contain")} />
                </span>
              ) : (
                <Image
                  key={key}
                  src={src}
                  alt={tCaseNames(key)}
                  width={width}
                  height={height}
                  className={cn(heightClass, "w-auto object-contain")}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
