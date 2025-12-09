import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function CtaSection() {
  return (
    <section id="contacto" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card rounded-lg p-10 lg:p-16 text-center shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-primary">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Hablemos de tus desafíos. Agenda una consultoría gratuita y sin compromiso con uno de nuestros expertos en IA para obtener un diagnóstico inicial de tus oportunidades de automatización.
          </p>
          <div className="mt-8">
            <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6 shadow-primary/20 shadow-[0_8px_20px]">
                Agendar Consultoría Gratuita Ahora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
