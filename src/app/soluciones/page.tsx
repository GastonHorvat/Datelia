import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const SolutionsPage = () => {
  return (
    <>
      <Head>
        <title>Soluciones de IA y Automatización para Empresas | Datelia</title>
        <meta name="description" content="Descubre nuestras soluciones de IA: Chatbots inteligentes, agentes de voz para agendamiento y desarrollos a medida para transformar tu negocio." />
      </Head>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gray-50">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Soluciones de IA que Impulsan tu Negocio
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Más allá de la tecnología, creamos soluciones que resuelven problemas reales. Nuestro enfoque es simple: entender tu desafío y aplicar la IA correcta para generar eficiencia, crecimiento y un ROI medible.
          </h2>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-gray-700 mb-12 text-center">
              En Datelia, no creemos en un enfoque único para todos. Cada negocio tiene cuellos de botella y oportunidades únicas. Por eso, hemos desarrollado tanto soluciones de producto especializadas que atacan los problemas más comunes, como la capacidad de crear implementaciones de IA totalmente a medida para tus necesidades específicas.
            </p>

            {/* Solutions Presentation */}
            {/* Chatbots Section */}
            <div className="flex flex-col md:flex-row items-center mb-16">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <Image
                  src="/placeholders/icono-chat-burbuja.svg"
                  alt="Chatbot Icon"
                  width={150}
                  height={150}
                  className="mx-auto md:mx-0"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Chatbots Inteligentes Multicanal
                </h3>
                <p className="text-gray-700 mb-6">
                  Transforma tu atención al cliente y tu proceso de ventas. Implementamos chatbots en WhatsApp, Web e Instagram que operan 24/7, capturando leads y resolviendo dudas para que tu equipo se enfoque en cerrar tratos. Son la primera línea de una experiencia de cliente moderna y eficiente.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  <li>Aumento de la captación de leads.</li>
                  <li>Disponibilidad 24/7.</li>
                  <li>Reducción de costos de soporte.</li>
                </ul>
                <Link href="/soluciones/chatbots-inteligentes" passHref>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Descubrir Solución de Chatbots →
                  </button>
                </Link>
              </div>
            </div>

            {/* Voice Agents Section */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-16">
              <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0">
                <Image
                  src="/placeholders/icono-onda-de-voz.svg"
                  alt="Voice Agent Icon"
                  width={150}
                  height={150}
                  className="mx-auto md:mx-0"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Agentes de Voz para Agendamiento
                </h3>
                <p className="text-gray-700 mb-6">
                  Elimina la carga del agendamiento telefónico. Nuestro agente de voz con IA gestiona, confirma y reagenda citas con una voz natural y humana, integrándose perfectamente con tu calendario. Reduce los "no-shows" y libera a tu personal para tareas de mayor valor.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  <li>Ahorro de horas administrativas.</li>
                  <li>Reducción drástica de no-shows.</li>
                  <li>Mejora de la experiencia del cliente.</li>
                </ul>
                <Link href="/soluciones/agentes-de-voz" passHref>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Descubrir Agentes de Voz →
                  </button>
                </Link>
              </div>
            </div>

            {/* Custom Solutions Section */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <Image
                  src="/placeholders/icono-engranajes-o-cerebro.svg"
                  alt="Custom Solution Icon"
                  width={150}
                  height={150}
                  className="mx-auto md:mx-0"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Soluciones de IA a Medida
                </h3>
                <p className="text-gray-700 mb-6">
                  ¿Tu desafío no encaja en un molde? Perfecto. Nuestro lema es "implementar resultados", y eso a menudo significa construir algo único. Analizamos tus procesos, identificamos oportunidades de automatización y desarrollamos una solución de IA personalizada que ataque el núcleo de tu problema.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  <li>Solución 100% adaptada a tu negocio.</li>
                  <li>Optimización de procesos únicos.</li>
                  <li>Máximo impacto en el ROI.</li>
                </ul>
                <Link href="/contacto" passHref>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Contactar para un Análisis →
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-blue-600 text-white text-center py-16 px-4 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿No estás seguro por dónde empezar?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            No te preocupes. El primer paso es una conversación. Hablemos de tus objetivos y te ayudaremos a identificar la solución que generará el mayor impacto para tu negocio.
          </p>
          <Link href="/contacto" passHref>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-lg">
              Agendar una Consultoría Gratuita
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default SolutionsPage;