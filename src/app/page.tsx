import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { ValuePropositionSection } from "@/components/landing/value-proposition-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { ResultsSection } from "@/components/landing/results-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { BlogSection } from "@/components/landing/blog-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Layout } from "@/components/layout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datelia | Arquitectura de Ejecución y Diseño Operativo Agéntico (D.O.A.™)',
  description: 'Diseñamos cómo opera su empresa mediante el estándar D.O.A.™ de Diseño Operativo Agéntico. Intervenimos arquitectura operativa, conectamos sistemas y eliminamos fricción estructural.',
  keywords: 'Eficiencia operativa, Arquitectura operativa, IA en logística, Diseño Operativo Agéntico, D.O.A., Arquitectura de ejecución, automatización inteligente, ingeniería operativa',
  openGraph: {
    title: 'Datelia | Arquitectura de Ejecución y Diseño Operativo Agéntico',
    description: 'Diseñamos cómo opera su empresa mediante el estándar D.O.A.™. No automatizamos tareas, intervenimos arquitectura.',
    url: 'https://www.datelia.com.ar',
    type: 'website',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Datelia - Arquitectura de Ejecución y Diseño Operativo Agéntico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datelia | Arquitectura de Ejecución y Diseño Operativo Agéntico',
    description: 'Diseñamos cómo opera su empresa mediante el estándar D.O.A.™.',
    images: ['/images/og/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.datelia.com.ar',
  },
};

export default function Home() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <ValuePropositionSection />
        <ArchitectureSection />
        <ResultsSection />
        <TestimonialSection />
        <BlogSection />
        <FaqSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
