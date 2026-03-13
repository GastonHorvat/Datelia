"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProblemVsSolutionSection() {
    const t = useTranslations("problem_solution");

    return (
        <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* El Problema */}
                    <Card className="bg-background border-l-4 border-l-destructive shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <AlertTriangle className="h-6 w-6 text-destructive" />
                                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("problem.badge")}</span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-headline leading-tight">
                                {t("problem.title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                {t("problem.p1")}
                            </p>
                            <p className="font-medium text-foreground">
                                {t("problem.strong")}
                            </p>
                            <p>
                                {t("problem.p2")}
                            </p>
                            <p className="italic">
                                {t("problem.italic")}
                            </p>
                        </CardContent>
                    </Card>

                    {/* La Solución */}
                    <Card className="bg-background border-l-4 border-l-primary shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("solution.badge")}</span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-headline leading-tight">
                                {t("solution.title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                {t("solution.p1")}
                            </p>
                            <p>
                                {t("solution.p2")}
                            </p>
                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-4">
                                <p className="font-medium text-foreground">
                                    {t("solution.roi")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Post MVP */}
                <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl p-8 md:p-12 shadow-lg border border-border/50">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full">
                            <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-headline font-bold mb-4">{t("mvp.title")}</h3>
                            <p className="text-muted-foreground mb-6">
                                {t("mvp.p1")}
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{t("mvp.list_1")}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{t("mvp.list_2")}</span>
                                </li>
                            </ul>
                            <p className="mt-6 text-muted-foreground border-t border-border pt-4">
                                {t("mvp.p2")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
