import { CheckCircle2 } from "lucide-react";

export function ValuePropositionSection() {
    const benefits = [
        { text: "Conecta sistemas sin reemplazarlos." },
        { text: "Ordena flujos críticos." },
        { text: "Automatiza validaciones clave." },
        { text: "Reduce dependencia operativa." },
        { text: "Genera trazabilidad total." },
    ];

    return (
        <section id="propuesta-de-valor" className="py-20 sm:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-primary">
                            No automatizamos tareas. Intervenimos arquitectura.
                        </h2>
                        <h3 className="text-xl font-headline font-semibold text-foreground/90 italic">
                            &quot;La tecnología sola no corrige el desorden estructural. Lo acelera.&quot;
                        </h3>
                        <p className="text-foreground/70 text-lg font-bold mt-8 pt-4 border-t border-border">
                            No sumamos herramientas. Diseñamos ejecución gobernada.
                        </p>
                    </div>
                    <div className="space-y-4 bg-accent/5 p-8 rounded-2xl border border-border">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <p className="text-foreground font-medium text-lg">{benefit.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
