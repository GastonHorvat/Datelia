"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales } from '@/lib/i18n';

// Mapa para traducir slugs a nombres legibles
const routeNameMap: Record<string, string> = {
    'soluciones': 'Soluciones',
    'chatbots-inteligentes': 'Chatbots Inteligentes',
    'agentes-de-voz': 'Agentes de Voz',
    'blog': 'Blog',
    'casos-de-exito': 'Casos de Éxito',
    'sobre-nosotros': 'Sobre Nosotros',
    'contacto': 'Contacto',
    'categoria': 'Categoría',
};

// Función auxiliar para formatear nombres desconocidos (ej: slugs de posts)
const formatName = (slug: string) => {
    if (routeNameMap[slug]) return routeNameMap[slug];
    // Reemplazar guiones por espacios y capitalizar
    return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

interface BreadcrumbsProps {
    className?: string;
    // Permite sobrescribir el nombre de la última ruta (útil para títulos de posts largos)
    lastItemName?: string;
}

export function Breadcrumbs({ className, lastItemName }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Si estamos en la home, no mostramos breadcrumbs
    if (pathname === '/' || pathname === '/es' || pathname === '/en') return null;

    const rawSegments = pathname.split('/').filter(Boolean);
    // Ignore the locale segment if it's there
    const segments = locales.includes(rawSegments[0] as any) 
        ? rawSegments.slice(1) 
        : rawSegments;

    const locale = locales.includes(rawSegments[0] as any) ? rawSegments[0] : 'es';

    // Generar Schema.org BreadcrumbList
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": `https://www.datelia.com.ar/${locale}`
            },
            ...segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const href = `/${locale}/${segments.slice(0, index + 1).join('/')}`;
                const name = isLast && lastItemName ? lastItemName : formatName(segment);

                return {
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": name,
                    "item": `https://www.datelia.com.ar${href}`
                };
            })
        ]
    };

    return (
        <div className="container mx-auto px-4 pt-24 md:px-6"> 
            <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
                {/* Inyectar Schema JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />

            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {/* Home Link */}
                <li className="flex items-center">
                    <Link
                        href={`/${locale}`}
                        className="hover:text-primary transition-colors flex items-center gap-1"
                        title="Volver al inicio"
                    >
                        <Home className="w-4 h-4" />
                        <span className="sr-only">Inicio</span>
                    </Link>
                </li>

                {/* Segments */}
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const href = `/${segments.slice(0, index + 1).join('/')}`;
                    const name = isLast && lastItemName ? lastItemName : formatName(segment);

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 opacity-50" />
                            {isLast ? (
                                <span
                                    className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs"
                                    aria-current="page"
                                    title={name}
                                >
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="hover:text-primary transition-colors whitespace-nowrap"
                                >
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    </div>
    );
}
