import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="inicio" className="relative h-[90vh] min-h-[700px] w-full flex items-center justify-center text-center text-white pt-20">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Fondo abstracto de tecnología"
          fill
          objectFit="cover"
          className="opacity-20"
          priority
          data-ai-hint="abstract data neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          IA que piensa, automatiza y transforma.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl">
          Libera el potencial oculto de tu empresa con automatización inteligente que genera resultados.
        </p>
        <div className="mt-8 text-base text-gray-400 max-w-2xl mx-auto">
          <p>Aumentamos tu ROI operativo y liberamos hasta un 40% del tiempo de tu equipo, eliminando cuellos de botella e implementando eficiencia.</p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg">Descubre Cómo Transformamos tu Negocio</Button>
          <Button size="lg" variant="outline">Ver Casos de Éxito</Button>
        </div>
      </div>
    </section>
  );
}
