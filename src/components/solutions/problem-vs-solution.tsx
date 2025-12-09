import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export function ProblemVsSolutionSection() {
    return (
        <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                        El Problema vs. La Solución
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Entender el obstáculo es el primer paso para superarlo. Así transformamos fricción en crecimiento.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* El Problema */}
                    <Card className="bg-background border-l-4 border-l-destructive shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <AlertTriangle className="h-6 w-6 text-destructive" />
                                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">El Problema</span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-headline leading-tight">
                                ¿Qué es lo que frena hoy el crecimiento de mi empresa?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                Lo que limita el crecimiento no suele ser el mercado, sino la operación interna: procesos manuales, información dispersa y poca visibilidad en tiempo real. Esto hace que cada nueva sede, cliente o unidad operativa requiera más trabajo, más personal y más coordinación.
                            </p>
                            <p className="font-medium text-foreground">
                                En ese escenario, escalar se vuelve lento, caro y poco sostenible.
                            </p>
                            <p>
                                Datelia resuelve ese cuello de botella automatizando tareas repetitivas, integrando información crítica en un único panel y estandarizando la forma en que trabajan todas las áreas de la empresa.
                            </p>
                            <p className="italic">
                                El resultado: menos carga operativa, más trazabilidad y una operación que crece sin fricción.
                            </p>
                        </CardContent>
                    </Card>

                    {/* La Solución */}
                    <Card className="bg-background border-l-4 border-l-primary shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">La Solución Datelia</span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-headline leading-tight">
                                ¿Qué hace exactamente Datelia para resolver esos problemas?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                Aplicamos un enfoque probado que combina automatización, IA y Business Intelligence para ordenar, acelerar y hacer más eficiente la operación.
                            </p>
                            <p>
                                Automatizamos turnos, reportes, cargas de datos, seguimiento de clientes y controles internos. Centralizamos la información en un tablero único y diseñamos flujos estandarizados que eliminan errores y duplicaciones.
                            </p>
                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-4">
                                <p className="font-medium text-foreground">
                                    En experiencias similares, las empresas logran un ROI cercano a 3× en los primeros 60 días, con una reducción significativa de tareas manuales y decisiones más rápidas y confiables.
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
                            <h3 className="text-2xl font-headline font-bold mb-4">¿Qué pasa después del MVP?</h3>
                            <p className="text-muted-foreground mb-6">
                                Luego del MVP vienen dos etapas clave para asegurar la mejora continua:
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Escalado por áreas (administración, ventas, logística, postventa, operaciones).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Dashboards de BI en tiempo real para garantizar trazabilidad y decisiones más precisas.</span>
                                </li>
                            </ul>
                            <p className="mt-6 text-muted-foreground border-t border-border pt-4">
                                Además, brindamos soporte continuo, mejoras evolutivas y capacitación interna para que la solución crezca junto con la empresa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
