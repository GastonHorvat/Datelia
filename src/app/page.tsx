import { HeroSection } from "@/components/landing/hero-section";
//import { ClientsSection } from "@/components/landing/clients-section";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Layout } from "@/components/layout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datelia | Soluciones de IA y Automatización para Empresas',
  description: 'Automatiza tu negocio con IA. Chatbots inteligentes, agentes de voz y soluciones a medida que aumentan tu ROI hasta 40%. Consultoría gratuita disponible.',
  keywords: 'automatización empresarial, IA para empresas, chatbots inteligentes Argentina, agentes de voz IA, soluciones de inteligencia artificial, automatización de procesos',
  openGraph: {
    title: 'Datelia | Automatización con IA que Genera Resultados',
    description: 'Libera hasta 40% del tiempo de tu equipo con automatización inteligente. Chatbots, agentes de voz y soluciones de IA a medida.',
    url: 'https://datelia.tech',
    type: 'website',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Datelia - Soluciones de Inteligencia Artificial para Automatizar tu Negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datelia | Automatización con IA que Genera Resultados',
    description: 'Libera hasta 40% del tiempo de tu equipo con automatización inteligente.',
    images: ['/images/og/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech',
  },
};

export default function Home() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        {/* <ClientsSection /> */}
        <ProblemSolutionSection />
        <ServicesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
