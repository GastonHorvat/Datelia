import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function ProblemSolutionSection() {
  const benefits = [
    { text: "Optimización de la postventa y la atención al cliente." },
    { text: "Automatización de la captación y seguimiento de leads 24/7." },
    { text: "Eliminación de tareas repetitivas en administración y finanzas." },
  ];

  return (
    <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              ¿Tus procesos frenan tu crecimiento?
            </h2>
            <p className="text-primary font-semibold text-lg">
              Nosotros implementamos resultados, no promesas.
            </p>
            <p className="text-accent-foreground/80">
              Identificamos y eliminamos los cuellos de botella invisibles en tu operación. Desde la gestión de leads hasta la postventa, nuestras soluciones de IA están diseñadas para integrarse en tu negocio y generar un impacto medible desde el primer día.
            </p>
          </div>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-accent-foreground font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
