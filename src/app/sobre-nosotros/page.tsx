import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Iconos profesionales de lucide-react
import { Linkedin, Trophy, Lightbulb, Handshake } from 'lucide-react';

const AboutUsPage = () => {
  // CORRECCIÓN: Reducido a 2 fundadores con nuevos roles y bios
  const teamMembers = [
    {
      photo: '/images/jime.jpg',
      name: 'Jimena García Pinto',
      title: 'Founder & Directora de Partnerships',
      bio: 'Con una visión estratégica centrada en el cliente, lidera el crecimiento y las alianzas de Datelia, asegurando que cada solución no solo sea innovadora, sino que también genere un éxito tangible para nuestros socios.',
      linkedin: 'https://www.linkedin.com/in/jimenagarciapinto/', // Reemplaza con la URL real
    },
    {
      photo: '/images/gas.png',
      name: 'Gastón M. Horvat',
      title: 'Founder & Director de Tecnología',
      bio: 'Es el arquitecto técnico detrás de nuestras soluciones. Su pasión es transformar ideas complejas en sistemas de IA robustos, escalables y seguros que impulsan la eficiencia y la transformación digital.',
      linkedin: 'https://www.linkedin.com/in/gastonhorvat/', // Reemplaza con la URL real
    },
  ];

  const philosophyPoints = [
    { icon: Trophy, title: 'Resultados por Encima de Todo', description: 'Nuestro éxito se mide por el éxito de nuestros clientes. El ROI, el ahorro de tiempo y la eficiencia son las métricas que nos impulsan.' },
    { icon: Lightbulb, title: 'Innovación con Propósito', description: 'Exploramos las nuevas fronteras de la IA, pero solo aplicamos tecnologías que resuelven problemas reales y tienen un caso de negocio sólido.' },
    { icon: Handshake, title: 'Colaboración y Transparencia', description: 'Trabajamos como una extensión de tu equipo. Creemos en una comunicación abierta y un proceso claro de principio a fin.' },
  ];

  return (
    <Layout>
      <Head>
        <title>Sobre Nosotros | El Equipo Experto en IA de Datelia</title>
        <meta name="description" content="Conoce la misión, visión y al equipo de expertos detrás de Datelia. Estamos dedicados a implementar soluciones de IA que transforman negocios." />
      </Head>

      {/* Hero Section */}
      <section className="bg-background text-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Somos un Equipo de Expertos, Obsesionados con los Resultados.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
            Nacimos de una convicción simple: la IA no debe ser una promesa lejana, sino una herramienta práctica que genera eficiencia y crecimiento hoy.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Nuestra Filosofía</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {philosophyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-accent-foreground/80">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">El Equipo Fundador</h2>
          {/* CORRECCIÓN: Usando 'lg:grid-cols-2' para 2 miembros y centrándolo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  {/* CORRECCIÓN: Foto redonda y de tamaño consistente */}
                  <Image
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    width={120}
                    height={120}
                    className="rounded-full mb-4 mx-auto object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      Perfil de LinkedIn
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">¿Listo para que nuestro equipo se una al tuyo?</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">Ahora que nos conoces, nos encantaría conocerte. Hablemos de tus objetivos.</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Contactar al Equipo</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsPage;