import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ClientsSection } from "@/components/landing/clients-section";
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section";
import { ServicesSection } from "@/components/landing/services-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ClientsSection />
        <ProblemSolutionSection />
        <ServicesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
