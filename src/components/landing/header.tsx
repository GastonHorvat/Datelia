"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    {
      label: "Soluciones",
      href: "/soluciones",
      dropdown: [
        { href: "/soluciones/chatbots-inteligentes", label: "Chatbots Inteligentes Multicanal" },
        { href: "/soluciones/agentes-de-voz", label: "Agentes de Voz para Agendamiento" },
        { href: "/soluciones", label: "Ver Todas las Soluciones" },
      ],
    },
    { href: "/casos-de-exito", label: "Casos de Éxito" },
    { href: "/blog", label: "Blog" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  // LA CORRECCIÓN CLAVE ESTÁ AQUÍ
  const linkColor = isScrolled || !isHomePage 
    ? "text-foreground/80" // Texto oscuro para fondos claros (por defecto)
    : "text-white/90";      // Texto BLANCO para fondo transparente sobre hero oscuro

  const headerBackground = isScrolled || !isHomePage 
    ? "bg-background/95 shadow-md backdrop-blur-sm"
    : "bg-transparent";

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", headerBackground)}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.jpg"
            alt="Logo de Datelia"
            width={110}
            height={36}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
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
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/contacto">Agendar Consultoría</Link>
          </Button>
        </div>
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
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo de Datelia"
                    width={110}
                    height={36}
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
                <Button asChild size="lg" className="w-full mt-4">
                  <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>Agendar Consultoría</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}