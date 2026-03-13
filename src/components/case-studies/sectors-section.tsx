"use client";

import {
    Factory,
    HardHat,
    Truck,
    ShoppingBag,
    Building2,
    GraduationCap,
    Briefcase,
    Landmark
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function SectorsSection() {
    const t = useTranslations("about_us.sectors_section");

    const sectors = [
        { name: t("sectors.industry"), icon: Factory },
        { name: t("sectors.construction"), icon: HardHat },
        { name: t("sectors.logistics"), icon: Truck },
        { name: t("sectors.retail"), icon: ShoppingBag },
        { name: t("sectors.real_estate"), icon: Building2 },
        { name: t("sectors.education"), icon: GraduationCap },
        { name: t("sectors.services"), icon: Briefcase },
        { name: t("sectors.public"), icon: Landmark },
    ];

    return (
        <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    {sectors.map((sector, index) => {
                        const Icon = sector.icon;
                        return (
                            <Card key={index} className="bg-background border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{sector.name}</h3>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="text-center max-w-2xl mx-auto bg-background p-6 rounded-lg border border-border/50 shadow-sm">
                    <p className="text-lg font-medium text-foreground">
                        {t("footer")}
                    </p>
                </div>
            </div>
        </section>
    );
}
