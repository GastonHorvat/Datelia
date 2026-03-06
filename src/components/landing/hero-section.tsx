import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="inicio" className="relative h-[50vh] min-h-[700px] w-full flex items-center justify-center text-center text-white pt-20">
      <div className="absolute inset-0">
        <Image
          src="/images/nasa.jpg"
          alt="Fondo tecnológico representando automatización con IA y soluciones empresariales de Datelia"
          fill
          className="object-cover opacity-50"
          priority
          data-ai-hint="abstract data neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 pb-2">
          La mayoría de las empresas ejecuta sin arquitectura
        </h1>
        <h2 className="mt-4 text-xl font-headline font-semibold text-gray-100 sm:text-2xl md:text-3xl leading-snug">
          Diseñamos cómo opera su empresa mediante el estándar D.O.A.™ de Diseño Operativo Agéntico.
        </h2>
        <div className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          <p>Intervenimos fricción estructural real, conectamos sistemas, ordenamos flujos críticos y aplicamos inteligencia únicamente donde genera valor económico tangible.</p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a
              href="https://calendly.com/jimenagarciapinto-datelia/datelia-consultoria-gratuita/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Evaluación estructural sin costo
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            <Link href="#arquitectura">Explorar modelo D.O.A.™</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}