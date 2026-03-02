import Image from "next/image";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jimena Garcia Pinto",
      role: "Founder & Partnerships",
      quote: "Las empresas no fallan por falta de estrategia. Fallan por falta de estructura en la ejecución. La fricción se normaliza... Diseñar la ejecución es gobernar el crecimiento.",
      image: "/images/jimena.jpg"
    },
    {
      name: "Founder & CTO",
      role: "Datelia",
      quote: "En Datelia diseñamos arquitectura de ejecución. La ingeniería operativa no se trata de herramientas, sino de cómo fluye la ejecución dentro de la organización... Nuestra arquitectura se apoya en integraciones vía APIs, reglas explícitas, logs auditables, modularidad y seguridad.",
      image: "/images/cto.jpg"
    }
  ];

  return (
    <section id="manifiesto" className="py-20 sm:py-28 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-8 rounded-3xl bg-card border border-primary/20 shadow-xl">
              <Quote className="h-10 w-10 text-primary/50 mb-4" />
              <blockquote className="text-xl font-medium leading-relaxed italic mb-8 text-white">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <footer>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
