import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function ProblemSolutionSection() {
  const points = [
    { text: "Cuando la ejecución no está diseñada, la fricción se normaliza." },
    { text: "Sin arquitectura, la eficiencia es accidental." },
  ];

  return (
    <section id="el-problema" className="py-20 sm:py-28 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-accent-foreground">
              El problema no es la estrategia. Es la ejecución.
            </h2>
            <p className="text-accent-foreground/80 leading-relaxed">
              En organizaciones complejas se repite el mismo patrón: procesos dependientes de personas clave, validaciones manuales ocultas, sistemas desconectados, información fragmentada y datos que llegan tarde. Esa fricción impacta directamente en el control, el margen y la capacidad de escalar.
            </p>
          </div>
          <div className="space-y-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-xl font-headline font-medium leading-tight">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
