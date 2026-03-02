import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function ArchitectureSection() {
    return (
        <section id="arquitectura" className="py-20 sm:py-28 bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-accent-foreground">
                        Arquitectura agéntica gobernada
                    </h2>
                    <p className="text-xl text-accent-foreground/80 leading-relaxed">
                        Operar con agentes no significa incorporar bots aislados. Significa estructurar unidades operativas autónomas bajo reglas explícitas, integradas a los sistemas existentes y con trazabilidad auditable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Card 1: Capacidades */}
                    <Card className="bg-card border-primary/20 shadow-xl flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">Un agente Datelia puede:</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {[
                                    "Ejecutar validaciones",
                                    "Clasificar información",
                                    "Detectar desvíos",
                                    "Integrar sistemas",
                                    "Registrar decisiones",
                                    "Asistir procesos críticos"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-primary/5 pt-6">
                            <p className="text-sm italic text-foreground/70">
                                "La inteligencia se aplica únicamente cuando clasificar, validar, predecir o responder genera valor económico real."
                            </p>
                        </CardFooter>
                    </Card>

                    {/* Card 2: Modelo D.O.A.™ */}
                    <Card className="bg-card border-primary/20 shadow-xl flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">Modelo D.O.A.™ - Diseño Operativo Agéntico</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <div>
                                <p className="font-semibold text-lg mb-2">
                                    D.O.A.™ es el estándar estructural bajo el cual intervenimos la ejecución empresarial.
                                </p>
                                <p className="text-foreground/70">
                                    No optimiza tareas aisladas. Rediseña arquitectura operativa.
                                </p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { title: "Diagnóstico estructural", desc: "Mapeo de fricción y cuellos de botella." },
                                    { title: "Arquitectura agéntica", desc: "Diseño de unidades autónomas gobernadas." },
                                    { title: "Orquestación", desc: "Centro de decisión y control de flujos." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <span className="font-bold block">{item.title}</span>
                                            <span className="text-sm text-foreground/60">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
