import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const AboutUsPage = () => {
  const teamMembers = [
    {
      photo: '/placeholders/foto-fundador.jpg',
      name: '[Nombre del Fundador]',
      title: 'Fundador y Director de Estrategia',
      bio: 'Con más de [X] años de experiencia en la intersección de la tecnología y los negocios, [Nombre] fundó Datelia con la misión de hacer la IA accesible y rentable para empresas de todos los tamaños.',
      linkedin: '[URL del perfil de LinkedIn]',
    },
    {
      photo: '/placeholders/foto-cto.jpg',
      name: '[Nombre del CTO]',
      title: 'Director de Tecnología',
      bio: '[Nombre] es el arquitecto detrás de nuestras soluciones. Su pasión es traducir los desafíos de negocio complejos en sistemas de IA robustos, escalables y seguros.',
      linkedin: '[URL del perfil de LinkedIn]',
    },
    {
      photo: '/placeholders/foto-coo.jpg',
      name: '[Nombre del COO]',
      title: 'Directora de Operaciones',
      bio: '[Nombre] se asegura de que cada proyecto se entregue a tiempo y supere las expectativas. Es el puente entre la visión del cliente y la ejecución técnica del equipo.',
      linkedin: '[URL del perfil de LinkedIn]',
    },
  ];

  const philosophyPoints = [
    {
      icon: '/icons/trophy-icon.svg', // Placeholder icon
      title: 'Resultados por Encima de Todo',
      description: 'Nuestro éxito se mide por el éxito de nuestros clientes. El ROI, el ahorro de tiempo y la eficiencia son las métricas que nos impulsan.',
    },
    {
      icon: '/icons/bulb-icon.svg', // Placeholder icon
      title: 'Innovación con Propósito',
      description: 'Exploramos constantemente las nuevas fronteras de la IA, pero solo aplicamos tecnologías que resuelven problemas reales y tienen un caso de negocio sólido.',
    },
    {
      icon: '/icons/handshake-icon.svg', // Placeholder icon
      title: 'Colaboración y Transparencia',
      description: 'Trabajamos como una extensión de tu equipo. Creemos en una comunicación abierta y un proceso claro de principio a fin.',
    },
  ];

  return (
    <>
      <Head>
        <title>Sobre Nosotros | El Equipo Experto en IA de Datelia</title>
        <meta name="description" content="Conoce la misión, visión y al equipo de expertos detrás de Datelia. Estamos dedicados a implementar soluciones de IA que transforman negocios." />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src="/placeholders/equipo-trabajando.jpg" // Placeholder image
          alt="Equipo de Datelia trabajando"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Somos un Equipo de Expertos, Obsesionados con los Resultados.</h1>
          <p className="text-lg md:text-xl max-w-3xl">Nacimos de una convicción simple: la Inteligencia Artificial no debe ser una promesa lejana, sino una herramienta práctica que genera eficiencia y crecimiento hoy.</p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Nuestra Filosofía</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <Image src={point.icon} alt={point.title} width={60} height={60} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">El Equipo Detrás de la IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500 italic mb-4">{member.title}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                {member.linkedin && (
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <a className="text-blue-600 hover:underline flex items-center">
                      <Image src="/icons/linkedin-icon.svg" alt="LinkedIn" width={20} height={20} className="mr-2" />
                      LinkedIn
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para que nuestro equipo se una al tuyo?</h2>
          <p className="text-lg mb-8">Ahora que nos conoces, nos encantaría conocerte a ti. Hablemos de tus objetivos y de cómo podemos ayudarte a alcanzarlos.</p>
          <Link href="/contacto">
            <a className="inline-block bg-yellow-400 text-blue-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 transition duration-300">
              Contactar al Equipo
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;