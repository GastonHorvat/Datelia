"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Mountain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    {
      label: "Soluciones",
            href: "/soluciones",
      dropdown: [
              { href: "/soluciones/chatbots-inteligentes", label: "Chatbots Inteligentes Multicanal" },
        {
          href: "/soluciones/agentes-de-voz",
          label: "Agentes de Voz para Agendamiento",
        },
        { href: "/soluciones", label: "Ver Todas las Soluciones" },
      ],
    },
    { href: "#casos-de-exito", label: "Casos de Éxito" },
    { href: "/contacto", label: "Contacto" },
 { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <img
            src="/src/images/logo.jpg"
            alt="Logo de Datelia"
            className="h-9 w-auto" // Puedes ajustar la altura (ej. h-8, h-10) según el diseño.
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                    {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.dropdown.map((dropdownLink) => (
                      <DropdownMenuItem key={dropdownLink.href}>
                        <Link href={dropdownLink.href} className="w-full">
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
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <Button>Agendar Consultoría</Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center">
                  <img
                    src="/src/images/logo.jpg"
                    alt="Logo de Datelia"
                    className="h-9 w-auto"
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    if (link.dropdown) {
                      return (
                        <div key={link.label} className="flex flex-col gap-2">
                          <span className="text-lg font-medium text-foreground/80">
                            {link.label}
                          </span>
                          <div className="ml-4 flex flex-col gap-2">
                            {link.dropdown.map((dropdownLink) => (
                              <Link
                                key={dropdownLink.href}
                                href={dropdownLink.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-base text-foreground/70 transition-colors hover:text-primary"
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
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar Consultoría
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}