import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Cog, DollarSign } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  const services = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "Marketing & Ventas",
      description: "Sistemas de IA que califican y gestionan leads automáticamente, mejorando tu conversión y acelerando el ciclo de ventas.",
      link: "/servicios/marketing-ventas",
      linkText: "Ver soluciones de Ventas",
    },
    {
      icon: <Cog className="h-8 w-8 text-primary" />,
      title: "Gestión Operativa",
      description: "Automatizamos procesos internos y eliminamos cuellos de botella para que tu equipo se concentre en tareas de alto valor.",
      link: "/servicios/gestion-operativa",
      linkText: "Ver soluciones de Operaciones",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Administración & Finanzas",
      description: "Reduce errores y agiliza tus procesos financieros con IA que automatiza la entrada de datos, la conciliación y la generación de informes.",
      link: "/servicios/adm-finanzas",
      linkText: "Ver soluciones de Finanzas",
    },
  ];

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
            Soluciones de Inteligencia Artificial Aplicada
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Creamos soluciones a medida que se integran perfectamente en tus flujos de trabajo existentes.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card hover:bg-card/90 hover:-translate-y-2 transition-transform duration-300 flex flex-col group">
              <CardHeader>
                {service.icon}
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={service.link} className="font-semibold text-primary inline-flex items-center gap-2">
                  {service.linkText}
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
