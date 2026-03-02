import { Terminal } from "lucide-react";

export function ResultsSection() {
    const results = [
        "Reducción de errores manuales.",
        "Disminución de carga operativa.",
        "Información consolidada en tiempo real.",
        "Mayor control estructural.",
        "Escalabilidad sin incremento proporcional de estructura.",
        "Decisiones basadas en trazabilidad real."
    ];

    return (
        <section id="resultados" className="py-20 sm:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Lo que cambia cuando la ejecución está diseñada
                        </h2>
                        <p className="text-xl text-primary font-headline font-semibold">
                            La eficiencia no se acelera. Se diseña.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <div className="grid sm:grid-cols-1 gap-4">
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-border hover:border-primary/50 transition-colors group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Terminal className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="text-lg font-medium">{result}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
