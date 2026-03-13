// src/components/landing/footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from "@/config/site";
import { useTranslations, useLocale } from "next-intl";

// CORRECCIÓN: Se añade el icono de Facebook
import { Linkedin, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

// --- SECCIÓN DE DATOS: Editando aquí puedes cambiar el contenido del footer fácilmente ---
const currentYear = new Date().getFullYear();
const companyName = "Datelia";
const logoSrc = "/images/logo.png";
const logoAlt = "Logo de Datelia";

// CORRECCIÓN: Se añade el objeto de Facebook a la lista
const socialLinks = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/company/datelia/", icon: Linkedin },
  // { name: 'Twitter', href: "#", icon: Twitter }, // Reemplaza '#' con tu URL real
  // { name: 'Instagram', href: "#", icon: Instagram }, // Reemplaza '#' con tu URL real
  // { name: 'Facebook', href: "#", icon: Facebook }, // Reemplaza '#' con tu URL real
];

const contactInfo = {
  email: "info@datelia.com.ar",
  // CORRECCIÓN: Se eliminó el carácter invisible \u202c al final de la línea.
  phone: "+54 387 585-8088",
  address: "Buenos Aires, Argentina",
};

// --- COMPONENTE DEL FOOTER ---
export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="relative bg-card text-muted-foreground overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image 
          src="/images/footer_bk.png" 
          alt="Fondo Abstracto" 
          fill 
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-16">

        {/* --- CORRECCIÓN: Grid de 5 columnas en desktop (lg) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* --- Columna 1: Logo, Descripción y Redes Sociales (ocupa 1 columna) --- */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <Image src={logoSrc} alt={logoAlt} width={120} height={40} />
            </Link>
            <p className="text-sm max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:border-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- CORRECCIÓN: Columna 2: Espaciador Vacío (visible solo en desktop) --- */}
          <div className="hidden lg:block"></div>

          {/* --- Columna 3: Navegación --- */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("headings.navigation")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}`} className="hover:text-primary transition-colors">{t("links.home")}</Link></li>
              <li><Link href={`/${locale}/soluciones`} className="hover:text-primary transition-colors">{t("links.solutions")}</Link></li>
              <li><Link href={`/${locale}/casos-de-exito`} className="hover:text-primary transition-colors">{t("links.success_cases")}</Link></li>
              <li><Link href={`/${locale}/sobre-nosotros`} className="hover:text-primary transition-colors">{t("links.about_us")}</Link></li>
              <li><Link href={`/${locale}/contacto`} className="hover:text-primary transition-colors">{t("links.contact")}</Link></li>
            </ul>
          </div>

          {/* --- Columna 4: Recursos --- */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("headings.resources")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {t("links.request_demo")}
                </a>
              </li>
              <li><Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">{t("links.blog")}</Link></li>
              <li><Link href={`/${locale}/legal/politica-de-privacidad`} className="hover:text-primary transition-colors">{t("links.privacy")}</Link></li>
            </ul>
          </div>

          {/* --- Columna 5: Contacto --- */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("headings.contact")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">{contactInfo.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{contactInfo.phone}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Barra Inferior del Footer --- */}
        {/* CORRECCIÓN: Se usa border-t-2 para una línea más gruesa */}
        <div className="border-t-2 border-border/50 pt-8 mt-8 flex flex-col-reverse md:flex-row justify-between items-center text-sm">
          <p className="text-muted-foreground mt-4 md:mt-0">
            © {currentYear} {companyName}. {t("rights")}
          </p>
          {/* CORRECCIÓN: Se usan Links para las páginas legales */}
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2">
            <Link href={`/${locale}/legal/politica-de-privacidad`} className="hover:text-primary transition-colors">{t("privacy_policy")}</Link>
            <Link href={`/${locale}/legal/terminos-y-condiciones`} className="hover:text-primary transition-colors">{t("terms_conditions")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
