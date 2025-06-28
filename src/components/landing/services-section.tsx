import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Phone, Settings } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  const solutions = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Chatbots Inteligentes Multicanal",
      description: "Conecta con tus clientes 24/7 en Web, WhatsApp e Instagram. Nuestros chatbots no solo responden, sino que califican leads, agendan demos y aumentan tus ventas de forma automática.",
      link: "/soluciones/chatbots-inteligentes",
      linkText: "Descubrir la Solución →",
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "Agentes de Voz para Agendamiento",
      description: "Libera a tu equipo del teléfono. Nuestro agente de IA gestiona, confirma y reagenda citas con una voz natural, reduciendo los no-shows y optimizando tu calendario sin intervención humana.",
      link: "/soluciones/agentes-de-voz",
      linkText: "Ver Agentes de Voz →",
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Soluciones de IA a Medida",
      description: '¿Tienes un desafío único? Nuestro lema es "No vendemos promesas. Implementamos resultados". Analizamos tus procesos y desarrollamos soluciones de IA personalizadas para eliminar tus cuellos de botella.',
      link: "/contacto",
      linkText: "Contactar a un Experto →",
    },
  ];

  return (
    <section id="soluciones" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
            Soluciones Diseñadas para un Impacto Inmediato
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Nos enfocamos en implementar IA que resuelve problemas reales. Descubre nuestras soluciones estrella, creadas para generar ROI desde el primer día.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <Card key={solution.title} className="bg-card hover:bg-card/90 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
              <CardHeader>
                {solution.icon}
                <CardTitle className="mt-4 font-headline">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{solution.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={solution.link} className="font-semibold text-primary inline-flex items-center gap-2">
                  {solution.linkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
