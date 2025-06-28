import React from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Assuming you'll need Image for icons/photos

// Placeholder components (replace with your actual UI components)
const Button = ({ children, className, ...props }: any) => <button className={`px-6 py-3 rounded-lg font-semibold ${className}`} {...props}>{children}</button>;
const Icon = ({ src, alt, className }: any) => <img src={src} alt={alt} className={className} />;
const Card = ({ children, className }: any) => <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>{children}</div>;
const TestimonialCard = ({ children, className }: any) => <div className={`bg-gray-100 rounded-lg shadow-lg p-8 text-center ${className}`}>{children}</div>;


const ChatbotsPage = () => {
  return (
    <>
      <Head>
        <title>Chatbots con IA para WhatsApp y Web | Datelia</title>
        <meta name="description" content="Automatiza tu atención al cliente y dispara tus ventas con chatbots inteligentes que capturan leads, resuelven dudas y venden por ti 24/7." />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Video/Animation Placeholder */}
        <div className="absolute inset-0 z-0">
          {/* Replace with your video/animation component */}
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/placeholder-video-bg.jpg)' }}></div> {/* Placeholder Image */}
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Conversaciones que Convierten, 24/7.</h1>
          <h2 className="text-xl md:text-2xl mb-8">Implementa chatbots en WhatsApp, Web e Instagram que capturan leads, resuelven dudas y venden por ti, incluso mientras duermes.</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Solicitar Demo</Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">¿Te suena familiar este escenario?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <Icon src="/icons/clock.svg" alt="Clock icon" className="w-8 h-8 mr-4 text-blue-600" />
              <p className="text-lg">Leads valiosos que llegan fuera de tu horario laboral se quedan sin atender.</p>
            </div>
            <div className="flex items-start">
              <Icon src="/icons/sales.svg" alt="Sales icon" className="w-8 h-8 mr-4 text-blue-600" />
              <p className="text-lg">Tu equipo de ventas invierte demasiado tiempo calificando prospectos en lugar de cerrar tratos.</p>
            </div>
            <div className="flex items-start">
              <Icon src="/icons/faq.svg" alt="FAQ icon" className="w-8 h-8 mr-4 text-blue-600" />
              <p className="text-lg">Las mismas preguntas frecuentes saturan tus canales de soporte y agotan a tu equipo.</p>
            </div>
            <div className="flex items-start">
              <Icon src="/icons/slow.svg" alt="Slow icon" className="w-8 h-8 mr-4 text-blue-600" />
              <p className="text-lg">Una experiencia de cliente lenta e impersonal que daña tu reputación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">La Solución: Un Chatbot que Trabaja para tu ROI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-shadow">
              <Icon src="/icons/conversion.svg" alt="Conversion icon" className="w-10 h-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Aumento de la Conversión</h3>
              <p>Califica leads al instante y los dirige al agente correcto, o incluso cierra ventas simples directamente.</p>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <Icon src="/icons/cost-reduction.svg" alt="Cost reduction icon" className="w-10 h-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Reducción de Costos de Soporte</h3>
              <p>Automatiza hasta el 80% de las consultas repetitivas, liberando a tu equipo para casos que realmente importan.</p>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <Icon src="/icons/multichannel.svg" alt="Multichannel icon" className="w-10 h-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Presencia Multicanal</h3>
              <p>Atiende a tus clientes donde ellos están: en tu web, WhatsApp, Instagram y más, con una experiencia consistente.</p>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <Icon src="/icons/intelligence.svg" alt="Intelligence icon" className="w-10 h-10 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Inteligencia de Negocio</h3>
              <p>Recopila datos valiosos de cada interacción para que entiendas mejor las necesidades de tus clientes.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section (Timeline) */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nuestra Implementación: Un Proceso Transparente y Eficaz</h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="flex flex-col items-center md:items-stretch">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row w-full justify-between items-center md:even:flex-row-reverse py-8">
                <div className="md:w-1/2 flex justify-center md:justify-end pr-8">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">1</div>
                </div>
                <div className="md:w-1/2 pl-8 text-center md:text-left mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold mb-2">Análisis y Estrategia</h3>
                  <p>Entendemos tus objetivos comerciales y diseñamos los flujos de conversación para maximizar los resultados.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row w-full justify-between items-center md:even:flex-row-reverse py-8">
                 <div className="md:w-1/2 flex justify-center md:justify-end pr-8 order-2 md:order-1">
                   <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">2</div>
                 </div>
                 <div className="md:w-1/2 pl-8 text-center md:text-left mt-4 md:mt-0 order-1 md:order-2">
                   <h3 className="text-xl font-semibold mb-2">Desarrollo e Integración</h3>
                   <p>Construimos y conectamos el chatbot con tus sistemas actuales (CRM, calendarios, etc.).</p>
                 </div>
               </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row w-full justify-between items-center md:even:flex-row-reverse py-8">
                 <div className="md:w-1/2 flex justify-center md:justify-end pr-8">
                   <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">3</div>
                 </div>
                 <div className="md:w-1/2 pl-8 text-center md:text-left mt-4 md:mt-0">
                   <h3 className="text-xl font-semibold mb-2">Entrenamiento y Puesta en Marcha</h3>
                   <p>Entrenamos la IA con tus datos para que responda con la voz y el conocimiento de tu marca.</p>
                 </div>
               </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row w-full justify-between items-center md:even:flex-row-reverse py-8">
                 <div className="md:w-1/2 flex justify-center md:justify-end pr-8 order-2 md:order-1">
                   <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">4</div>
                 </div>
                 <div className="md:w-1/2 pl-8 text-center md:text-left mt-4 md:mt-0 order-1 md:order-2">
                   <h3 className="text-xl font-semibold mb-2">Optimización Continua</h3>
                   <p>Monitoreamos su rendimiento y lo mejoramos constantemente para asegurar que siga generando valor.</p>
                 </div>
               </div>

            </div>
          </div>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <TestimonialCard>
            {/* Placeholder for client photo */}
            <Image
              src="/placeholder-client-photo.jpg"
              alt="Client photo"
              width={96}
              height={96}
              className="rounded-full mx-auto mb-6"
            />
            <p className="text-xl italic mb-6">"Pasamos de responder en horas a hacerlo en segundos, y nuestras ventas desde WhatsApp aumentaron un 40% en los primeros tres meses. El chatbot se pagó solo."</p>
            <p className="text-lg font-semibold">[Placeholder: Nombre Cliente]</p>
            <p className="text-md text-gray-600">[Empresa Cliente]</p>
          </TestimonialCard>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Listo para automatizar tus conversaciones?</h2>
          <p className="text-lg mb-8">Agenda una demo gratuita y te mostraremos en vivo cómo un chatbot puede revolucionar tu captación de clientes y tu soporte desde el primer día.</p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 text-xl md:text-2xl py-4 px-10">Solicitar mi Demo Gratuita</Button>
        </div>
      </section>
    </>
  );
};

export default ChatbotsPage;