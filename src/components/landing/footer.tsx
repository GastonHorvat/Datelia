// src/components/landing/footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from "@/config/site";
import { useTranslations, useLocale } from "next-intl";
import { Linkedin, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const currentYear = new Date().getFullYear();
const companyName = "Datelia";

const socialLinks = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/company/datelia/", icon: Linkedin },
  { name: 'Facebook', href: "https://www.facebook.com/dateliaonline", icon: Facebook },
  { name: 'Instagram', href: "https://www.instagram.com/dateliaonline/", icon: Instagram },
];

const contactInfo = {
  email: "info@datelia.com.ar",
  phone: "+54 387 585-8088",
};

const NAV_LINKS = [
  { key: 'home', href: '' },
  { key: 'solutions', href: '/soluciones' },
  { key: 'success_cases', href: '/casos' },
  { key: 'about_us', href: '/sobre-nosotros' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contacto' },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-background text-foreground border-t border-foreground/10">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo + descripción + social */}
          <div className="space-y-3 max-w-sm">
            <Link href={`/${locale}`} className="inline-block">
              <Image src="/images/logo.png" alt="Logo de Datelia" width={110} height={36} />
            </Link>
            <p className="text-sm text-foreground/70">{t("description")}</p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navegación compacta, un solo nivel (el header ya tiene el detalle de Soluciones) */}
          <nav aria-label={t("headings.navigation")} className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end md:max-w-xs">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                {t(`links.${key}`)}
              </Link>
            ))}
          </nav>

          {/* Contacto */}
          <div className="space-y-2 text-sm">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
              <Mail className="h-4 w-4 shrink-0" />
              {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
              <Phone className="h-4 w-4 shrink-0" />
              {contactInfo.phone}
            </a>
            <a
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary font-medium hover:underline"
            >
              {t("links.request_demo")}
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-foreground/10 mt-8 pt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 text-xs text-foreground/60">
          <p>© {currentYear} {companyName}. {t("rights")} · Salta, Argentina</p>
          <div className="flex items-center gap-x-5">
            <Link href={`/${locale}/legal/politica-de-privacidad`} className="hover:text-primary transition-colors">{t("privacy_policy")}</Link>
            <Link href={`/${locale}/legal/terminos-y-condiciones`} className="hover:text-primary transition-colors">{t("terms_conditions")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
