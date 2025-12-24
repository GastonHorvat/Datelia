import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Componentes de tu UI y Layout
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

// Iconos profesionales de lucide-react
import { Linkedin, Trophy, Lightbulb, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Equipo Experto en IA | Datelia',
  description: 'Conoce al equipo de expertos en IA detrás de Datelia. Jimena García Pinto y Gastón M. Horvat lideran soluciones que transforman negocios.',
  keywords: 'equipo Datelia, expertos IA Argentina, fundadores Datelia, empresa IA Buenos Aires',
  openGraph: {
    title: 'Sobre Nosotros | Datelia',
    description: 'Conoce al equipo experto detrás de las soluciones de IA que transforman negocios.',
    url: 'https://datelia.com.ar/sobre-nosotros',
    type: 'website',
    images: [
      {
        url: '/images/og/og-sobre-nosotros.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo de Datelia - Expertos en IA y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | Datelia',
    description: 'Conoce al equipo experto en IA',
    images: ['/images/og/og-sobre-nosotros.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.com.ar/sobre-nosotros',
  },
};

const AboutUsPage = () => {
  // CORRECCIÓN: Reducido a 2 fundadores con nuevos roles y bios
  const teamMembers = [
    {
      photo: '/images/Jime.png',
      name: 'Jimena García Pinto',
      title: 'Founder & Directora de Partnerships',
      bio: 'Con una visión estratégica centrada en el cliente, lidera el crecimiento y las alianzas de Datelia, asegurando que cada solución no solo sea innovadora, sino que también genere un éxito tangible para nuestros socios.',
      linkedin: 'https://www.linkedin.com/in/jimenagarciapinto/', // Reemplaza con la URL real
    },
    {
      photo: '/images/Gas.png',
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
      {/* Hero Section */}
      <section className="bg-background text-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Breadcrumbs className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Somos un Equipo de Expertos, Obsesionados con los Resultados.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            En Datelia, combinamos la excelencia técnica con una visión estratégica de negocios. No solo implementamos IA; implementamos crecimiento.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-16">Liderazgo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="bg-background text-foreground overflow-hidden border-none shadow-lg">
                <div className="relative h-80 w-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top" // object-top para enfocar caras si la foto es vertical
                  />
                </div>
                <CardHeader>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
                <CardFooter>
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0077b5] transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-16">Nuestra Filosofía</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80">
            Si buscas un socio tecnológico que entienda tu negocio y hable tu idioma, estamos aquí.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Hablemos</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsPage;