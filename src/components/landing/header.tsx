"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { locales, defaultLocale, Locale } from "@/lib/i18n";
import { useTranslations, useLocale } from "next-intl";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLocale = useLocale() as Locale;
  
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === `/${currentLocale}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useTranslations("navigation");

  const router = useRouter();

  const changeLanguage = (newLocale: Locale) => {
    // Switch the pathname locale manually. Next.js App Router will handle the rest.
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  }

  const navLinks = [
    { href: `/${currentLocale}`, label: t("home") },
    {
      label: t("solutions"),
      href: `/${currentLocale}/soluciones`,
      dropdown: [
        { href: `/${currentLocale}/soluciones/chatbots-inteligentes`, label: t("chatbots") },
        { href: `/${currentLocale}/soluciones/agentes-de-voz`, label: t("voice_agents") },
        { href: `/${currentLocale}/soluciones`, label: t("all_solutions") },
      ],
    },
    { href: `/${currentLocale}/casos-de-exito`, label: t("case_studies") },
    { href: `/${currentLocale}/blog`, label: t("news") },
    { href: `/${currentLocale}/sobre-nosotros`, label: t("about_us") },
    { href: `/${currentLocale}/contacto`, label: t("contact") },
  ];

  const linkColor = isScrolled || !isHomePage 
    ? "text-foreground/80" 
    : "text-white/90";      

  const headerBackground = isScrolled || !isHomePage 
    ? "bg-background/95 shadow-md backdrop-blur-sm"
    : "bg-transparent";

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", headerBackground)}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href={`/${currentLocale}`} className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo de Datelia"
            width={110}
            height={36}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className={cn("flex items-center text-sm font-medium transition-colors hover:text-primary", linkColor)}>
                    {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.dropdown.map((dropdownLink) => (
                      <DropdownMenuItem key={dropdownLink.href} asChild>
                        <Link href={dropdownLink.href}>
                          {dropdownLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn("text-sm font-medium transition-colors hover:text-primary", linkColor)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className={cn("flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary", linkColor)}>
              <Globe className="w-4 h-4" />
              {currentLocale.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem key={loc} onClick={() => changeLanguage(loc)}>
                  {loc === 'es' ? 'Español' : loc === 'en' ? 'English' : 'Português'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild>
            <Link href={`/${currentLocale}/contacto`}>{t("book_audit")}</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(linkColor, "hover:text-white/100")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href={`/${currentLocale}`} className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/images/logo.png"
                    alt="Logo de Datelia"
                    width={110}
                    height={36}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    if (link.dropdown) {
                      return (
                        <div key={link.label} className="flex flex-col gap-2">
                          <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground/80">{link.label}</Link>
                          <div className="ml-4 flex flex-col gap-2">
                            {link.dropdown.map((dropdownLink) => (
                              <Link
                                key={dropdownLink.href}
                                href={dropdownLink.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base text-muted-foreground transition-colors hover:text-primary"
                              >
                                {dropdownLink.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                
                {/* Mobile Language Selector */}
                <div className="flex gap-4 mt-2">
                  {locales.map((loc) => (
                     <button
                        key={loc}
                        onClick={() => { changeLanguage(loc); setIsMenuOpen(false); }}
                        className={cn("text-sm font-medium", currentLocale === loc ? "text-primary underline" : "text-muted-foreground")}
                     >
                       {loc.toUpperCase()}
                     </button>
                  ))}
                </div>

                <Button asChild size="lg" className="w-full mt-4">
                  <Link href={`/${currentLocale}/contacto`} onClick={() => setIsMenuOpen(false)}>{t("book_audit")}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}