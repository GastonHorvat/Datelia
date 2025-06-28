import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout';

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      logo: '/placeholders/logo-empresa-retail.svg',
      title: 'Empresa de Retail Aumenta su Conversión en un 35% con un Chatbot Inteligente',
      summary: 'Implementamos un chatbot multicanal que no solo automatizó el 80% de las consultas de soporte, sino que también optimizó la captación y calificación de leads 24/7.',
      metrics: ['+35% Conversión de Leads', '-50% en Costos de Soporte', 'ROI alcanzado en 6 meses'],
      href: '/casos-de-exito/caso-retail-chatbot',
    },
    {
      logo: '/placeholders/logo-clinica-salud.svg',
      title: 'Clínica Líder Reduce sus "No-Shows" en un 40% con un Agente de Voz IA',
      summary: 'Nuestro agente de voz se encargó de la confirmación proactiva de citas, liberando 15 horas semanales del personal administrativo y recuperando ingresos perdidos.',
      metrics: ['-40% Tasa de No-Show', '+15 Horas/Semana Ahorradas', '+95% Satisfacción del Paciente'],
      href: '/casos-de-exito/caso-clinica-agente-voz',
    },
    {
      logo: '/placeholders/logo-empresa-logistica.svg',
      title: 'Empresa de Logística Optimiza su Cadena de Suministro con IA a Medida',
      summary: 'Desarrollamos una solución personalizada que analiza datos en tiempo real para predecir cuellos de botella, optimizando rutas y reduciendo los costos operativos en un 22%.',
      metrics: ['-22% Costos Operativos', '+30% Precisión en Pronósticos', 'Proceso 100% Automatizado'],
      href: '/casos-de-exito/caso-logistica-ia-medida',
    },
  ];

  return (
    <Layout>
    <>
      <Head>
        <title>Casos de Éxito en IA y Automatización | Datelia</title>
        <meta name="description" content="Descubre los resultados reales que hemos generado para nuestros clientes. Casos de estudio con métricas de ROI, eficiencia y crecimiento impulsados por IA." />
      </Head>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Resultados Reales, No Promesas.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo hemos transformado negocios como el tuyo, implementando soluciones de IA
            que generan un impacto medible y un ROI tangible.
          </p>
        </div>
      </section>

      {/* Case Studies Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            Creemos que la mejor forma de demostrar el valor de la inteligencia artificial es a
            través de la evidencia. En esta sección, no encontrarás jerga técnica complicada,
            sino historias de éxito claras y directas. Cada caso representa un desafío superado
            y una meta alcanzada, subrayando nuestro compromiso con los resultados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <Link href={caseStudy.href} key={index} className="block group">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      {caseStudy.logo && (
                        <Image
                          src={caseStudy.logo}
                          alt={`Logo ${caseStudy.title}`}
                          width={100}
                          height={50}
                          className="mx-auto h-12 object-contain"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{caseStudy.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.metrics.map((metric, metricIndex) => (
                        <span
                          key={metricIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold mt-4 self-start">
                    Leer Caso de Éxito →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ahora, imagina estos resultados en tu empresa.
          </h2>
          <p className="text-xl mb-8">
            El próximo caso de éxito podría ser el tuyo. Si estás listo para dejar de imaginar y
            empezar a implementar, hablemos.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-white text-blue-600 hover:bg-gray-200 text-lg font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Hablemos de tu Proyecto
          </Link>
        </div>
      </section>
    </>
    </Layout>
  );
};

export default CaseStudiesPage;