"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    // Generar Schema.org BreadcrumbList
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://www.datelia.com.ar"
            },
            ...segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const href = `/${segments.slice(0, index + 1).join('/')}`;
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
                        href="/"
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
    );
}
