import React from 'react';
import Head from 'next/head';
import { CalendarIcon, ClockIcon, UserGroupIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
// CORRECCIÓN: Se cambió el icono que no existía por 'PhoneXMarkIcon'
import { PhoneXMarkIcon } from '@heroicons/react/24/solid';

const VoiceAgentsPage = () => {
  return (
    <>
      <Head>
        <title>Agentes de Voz con IA para Agendar Citas | Datelia</title>
        <meta name="description" content="Libera a tu equipo del teléfono. Nuestros agentes de voz inteligentes gestionan, confirman y reagendan citas automáticamente, reduciendo costos y no-shows." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Animation Placeholder */}
        <div className="absolute inset-0 bg-gray-800 opacity-75">
          {/* Replace with actual animation or video */}
          <img src="/placeholder-voice-agent-hero.jpg" alt="Background Animation: Soundwave or Calendar" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Tu Agenda se Llena Sola, por Voz.</h1>
          <h2 className="text-xl md:text-2xl mb-8">Nuestro agente de voz inteligente gestiona, confirma y reagenda citas por teléfono con una voz humana y natural, liberando a tu equipo para siempre.</h2>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
            Ver Demo
          </button>
        </div>
      </section>

      {/* Problems Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Es este el día a día de tu negocio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              {/* CORRECCIÓN: Se reemplazó el icono aquí */}
              <PhoneXMarkIcon className="h-12 w-12 text-blue-500 mb-4" />
              <p className="text-lg">Tu personal de recepción pasa horas al teléfono en lugar de atender a los clientes que tiene en frente.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <CalendarIcon className="h-12 w-12 text-blue-500 mb-4" />
              <p className="text-lg">Pierdes ingresos significativos por una alta tasa de "no-shows" (citas no asistidas).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <ClockIcon className="h-12 w-12 text-blue-500 mb-4" />
              <p className="text-lg">Los clientes se quejan de no poder contactarte fuera del horario de atención para agendar o cancelar.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <UserGroupIcon className="h-12 w-12 text-blue-500 mb-4" />
              <p className="text-lg">El proceso de confirmación manual de citas es tedioso, consume tiempo y es fácil de olvidar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">La Solución: Un Asistente de Voz que Optimiza tu Tiempo y Dinero</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Esto no es un contestador automático. Es un miembro más de tu equipo, enfocado 100% en la eficiencia. Implementamos resultados que se ven reflejados en tu calendario y en tu caja.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-left">
              <ClockIcon className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-2xl font-semibold mb-3">Agendamiento 24/7</h3>
              <p>Captura citas incluso de noche o en fin de semana, cuando tu competencia está cerrada. Tu negocio nunca deja de funcionar.</p>
            </div>
            {/* Benefit Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-left">
              <ChartBarIcon className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-2xl font-semibold mb-3">Reducción Drástica de No-Shows</h3>
              <p>Realiza llamadas y envía recordatorios automáticos de forma proactiva, logrando hasta un 40% menos de ausencias.</p>
            </div>
            {/* Benefit Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-left">
              <UserGroupIcon className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-2xl font-semibold mb-3">Libera a tu Equipo Humano</h3>
              <p>Tu personal puede enfocarse en tareas de mayor valor, como la fidelización de clientes, ventas adicionales o la gestión de casos complejos.</p>
            </div>
            {/* Benefit Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-left">
              <CalendarIcon className="h-10 w-10 text-green-500 mb-3" />
              <h3 className="text-2xl font-semibold mb-3">Sincronización Perfecta</h3>
              <p>Se integra de forma nativa con los principales sistemas de calendario (Google Calendar, etc.) para una gestión centralizada y sin errores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Perfecto para negocios que dependen de una agenda:</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Clínicas Médicas y Dentales</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Talleres Mecánicos</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Salones de Belleza y Spas</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Consultorios Profesionales</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Inmobiliarias</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">Centros de Fisioterapia</span>
            <span className="bg-blue-200 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">y más</span>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto text-center">
            <p className="text-xl italic mb-6">
              "El agente de voz se paga solo. Hemos recuperado unas 15 horas de trabajo administrativo a la semana y las citas olvidadas casi han desaparecido. Increíble."
            </p>
            <div className="flex flex-col items-center">
              {/* Placeholder for client photo */}
              <img src="/placeholder-photo.jpg" alt="Client Photo" className="w-16 h-16 rounded-full mb-3" />
              <p className="font-semibold">[Placeholder: Nombre Cliente]</p>
              <p className="text-gray-600">Director, [Nombre de la Clínica]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres escuchar a tu nuevo asistente en acción?</h2>
          <p className="text-xl mb-10">Calcula cuánto podrías ahorrar o solicita una llamada de demostración. Verás lo sorprendentemente humano y eficiente que puede sonar el futuro.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
              Calcular mi Ahorro
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-blue-600 transition duration-300">
              Solicitar Llamada de Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default VoiceAgentsPage;
