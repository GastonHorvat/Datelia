import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function CtaSection() {
  return (
    <section id="contacto" className="py-16 sm:py-20 bg-primary text-primary-foreground text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-primary-foreground mb-6">
          ¿Listo para transformar tu negocio?
        </h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Hablemos de tus desafíos. Agenda una consultoría gratuita y sin compromiso con uno de nuestros expertos en IA para obtener un diagnóstico inicial de tus oportunidades de automatización.
        </p>
        <div>
          <a href={siteConfig.links.calendly} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-lg">
              Agendar Consultoría Gratuita Ahora
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
