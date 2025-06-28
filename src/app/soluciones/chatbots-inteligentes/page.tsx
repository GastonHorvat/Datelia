import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Usando los componentes de tu UI y lucide-react, como en tu ejemplo
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  MessageSquareWarning, 
  Frown, 
  TrendingUp, 
  ShieldHalf, 
  AppWindow, 
  BrainCircuit 
} from "lucide-react";
import { Layout } from '@/components/layout'; // Asegúrate que tu layout se importa correctamente

const ChatbotsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Chatbots con IA para WhatsApp y Web | Datelia</title>
        <meta name="description" content="Automatiza tu atención al cliente y dispara tus ventas con chatbots inteligentes que capturan leads, resuelven dudas y venden por ti 24/7." />
      </Head>

      {/* Hero Section - Estilo de la landing */}
      <section className="bg-accent text-accent-foreground py-24 sm:py-32 flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Conversaciones que Convierten, 24/7.</h1>
          <h2 className="text-xl md:text-2xl text-accent-foreground/80 mb-8 max-w-3xl mx-auto">
            Implementa chatbots en WhatsApp, Web e Instagram que capturan leads, resuelven dudas y venden por ti, incluso mientras duermes.
          </h2>
          <Button asChild size="lg">
            <Link href="/contacto">Solicitar Demo</Link>
          </Button>
        </div>
      </section>

      {/* Problem Section - Fondo claro para contraste */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">¿Te suena familiar este escenario?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Leads sin Atender</h3>
                <p className="text-muted-foreground">Valiosos prospectos que llegan fuera de tu horario laboral se quedan fríos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Equipo de Ventas Saturado</h3>
                <p className="text-muted-foreground">Tu equipo invierte demasiado tiempo calificando en lugar de cerrar tratos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquareWarning className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Consultas Repetitivas</h3>
                <p className="text-muted-foreground">Las mismas preguntas frecuentes saturan tus canales y agotan a tu equipo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Frown className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Experiencia Lenta</h3>
                <p className="text-muted-foreground">Una atención al cliente lenta e impersonal que daña tu reputación.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Benefits Section - Fondo oscuro para contraste */}
      <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">La Solución: Un Chatbot que Trabaja para tu ROI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-background text-foreground text-center p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="w-10 h-10 mb-4 text-primary mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Aumento de Conversión</h3>
              <p className="text-muted-foreground">Califica leads al instante y los dirige al agente correcto, o cierra ventas simples directamente.</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 hover:shadow-lg transition-shadow">
              <ShieldHalf className="w-10 h-10 mb-4 text-primary mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Reducción de Costos</h3>
              <p className="text-muted-foreground">Automatiza hasta el 80% de las consultas, liberando a tu equipo para casos que importan.</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 hover:shadow-lg transition-shadow">
              <AppWindow className="w-10 h-10 mb-4 text-primary mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Presencia Multicanal</h3>
              <p className="text-muted-foreground">Atiende a tus clientes en Web, WhatsApp, e Instagram con una experiencia consistente.</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 hover:shadow-lg transition-shadow">
              <BrainCircuit className="w-10 h-10 mb-4 text-primary mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Inteligencia de Negocio</h3>
              <p className="text-muted-foreground">Recopila datos valiosos de cada interacción para entender mejor a tus clientes.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section (Timeline) - Fondo claro */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-16">Un Proceso Transparente y Eficaz</h2>
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/20"></div>
            {/* Timeline Items */}
            <div className="space-y-16">
              {[
                { num: 1, title: 'Análisis y Estrategia', desc: 'Entendemos tus objetivos comerciales y diseñamos los flujos de conversación para maximizar los resultados.' },
                { num: 2, title: 'Desarrollo e Integración', desc: 'Construimos y conectamos el chatbot con tus sistemas actuales (CRM, calendarios, etc.).' },
                { num: 3, title: 'Entrenamiento y Puesta en Marcha', desc: 'Entrenamos la IA con tus datos para que responda con la voz y el conocimiento de tu marca.' },
                { num: 4, title: 'Optimización Continua', desc: 'Monitoreamos su rendimiento y lo mejoramos constantemente para asegurar que siga generando valor.' },
              ].map(item => (
                <div key={item.num} className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{item.num}</div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Fondo oscuro */}
      <section className="py-20 sm:py-28 bg-accent text-accent-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
            <Image
              src="/images/martinAventura.jpg" // Reemplaza con una foto real
              alt="Foto de cliente satisfecho"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-6"
            />
            <blockquote className="text-xl italic mb-6 text-accent-foreground/90">
              "Pasamos de responder en horas a hacerlo en segundos, y nuestras ventas desde WhatsApp aumentaron un 40% en los primeros tres meses. El chatbot se pagó solo."
            </blockquote>
            <p className="text-lg font-semibold">Martín Rojas</p>
            <p className="text-md text-accent-foreground/70">Head of Growth - Aventura Austral Viajes</p>
        </div>
      </section>

      {/* Final CTA Section - Fondo primario para máximo impacto */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">¿Listo para automatizar tus conversaciones?</h2>
          <p className="text-lg mb-8">Agenda una demo gratuita y te mostraremos en vivo cómo un chatbot puede revolucionar tu captación de clientes y tu soporte desde el primer día.</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">Solicitar mi Demo Gratuita</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ChatbotsPage;