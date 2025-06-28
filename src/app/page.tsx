import { HeroSection } from "@/components/landing/hero-section";
import { ClientsSection } from "@/components/landing/clients-section";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex-1">
        <HeroSection />
        <ClientsSection />
        <ProblemSolutionSection />
        <ServicesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
