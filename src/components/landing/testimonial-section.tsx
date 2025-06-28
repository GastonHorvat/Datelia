import Image from "next/image";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  return (
    <section id="casos-de-exito" className="py-20 sm:py-28 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 flex justify-center">
            <Image
              src="/images/lauraInnovate.jpg"
              alt="Foto del Laura Sánchez, Directora de Operaciones de Innovate Solutions"
              width={300}
              height={300}
              className="rounded-full object-cover shadow-lg aspect-square"
              data-ai-hint="professional person portrait"
            />
          </div>
          <div className="lg:col-span-2">
            <Quote className="h-12 w-12 text-primary/50" />
            <blockquote className="mt-4 text-2xl font-medium leading-relaxed">
              "Datelia transformó nuestros procesos, optimizando recursos y acelerando resultados con su inteligencia artificial. El impacto en nuestro ROI fue evidente en el primer trimestre."
            </blockquote>
            <footer className="mt-6">
              <p className="font-semibold text-lg text-accent-foreground">Laura Sánchez</p>
              <p className="text-accent-foreground/80">Directora de Operaciones, Innovate Solutions</p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
