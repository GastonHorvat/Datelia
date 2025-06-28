import React from 'react';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Política de Privacidad | Datelia</title>
        <meta name="description" content="Conoce cómo Datelia recopila, usa y protege tus datos personales. Tu privacidad y seguridad son nuestra prioridad." />
      </Head>
      <div className="container mx-auto px-4 py-8 bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

        <p className="text-sm text-gray-600 mb-8">Última actualización: [Fecha de última actualización]</p>

        <p className="mb-6">
          Bienvenido a Datelia. Tu privacidad es de suma importancia para nosotros. Esta Política de Privacidad tiene como objetivo informarte sobre cómo recopilamos, usamos, protegemos y tratamos la información que nos proporcionas a través de nuestro sitio web (datelia.tech).
        </p>

        <h3 className="text-xl font-semibold mb-4">1. Responsable del Tratamiento de Datos</h3>
        <p className="mb-2">Nombre de la empresa: Datelia</p>
        <p className="mb-2">Correo electrónico de contacto: info@datelia.tech</p>
        <p className="mb-6">Sitio web: https://www.datelia.tech</p>

        <h3 className="text-xl font-semibold mb-4">2. ¿Qué información recopilamos?</h3>
        <p className="mb-2">Recopilamos información de dos maneras:</p>
        <p className="mb-2 font-medium">Información que nos proporcionas directamente:</p>
        <p className="mb-2">A través de nuestro formulario de contacto, recopilamos datos personales que incluyen, entre otros:</p>
        <ul className="list-disc list-inside mb-4 ml-4">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Nombre de la empresa</li>
          <li>Sector de actividad</li>
          <li>Cualquier otra información que decidas incluir en el cuerpo del mensaje.</li>
        </ul>
        <p className="mb-2 font-medium">Información recopilada automáticamente:</p>
        <p className="mb-2">A través de cookies y tecnologías similares, podemos recopilar datos no personales sobre tu visita, como:</p>
        <ul className="list-disc list-inside mb-6 ml-4">
          <li>Dirección IP</li>
          <li>Tipo de navegador y dispositivo</li>
          <li>Páginas visitadas en nuestro sitio</li>
          <li>Tiempo de permanencia en el sitio</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">3. ¿Con qué finalidad usamos tu información?</h3>
        <p className="mb-2">La información que recopilamos se utiliza para los siguientes propósitos:</p>
        <ul className="list-disc list-inside mb-6 ml-4">
          <li><span className="font-medium">Para responder a tus consultas:</span> Usamos los datos de contacto para comunicarnos contigo y responder a las solicitudes de información o demos que nos envías.</li>
          <li><span className="font-medium">Para mejorar nuestro sitio web:</span> Analizamos los datos de uso para entender cómo interactúan los visitantes con nuestro sitio y así mejorar la experiencia del usuario y nuestro contenido.</li>
          <li><span className="font-medium">Para fines de marketing (con tu consentimiento):</span> Podríamos usar tu correo electrónico para enviarte información sobre nuestros servicios, casos de éxito o artículos de interés, siempre que hayas mostrado interés o nos hayas dado tu consentimiento para ello.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">4. ¿Cómo protegemos tu información?</h3>
        <p className="mb-6">
          Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal. Tus datos se almacenan en redes seguras y solo son accesibles por un número limitado de personas con derechos especiales de acceso, quienes están obligados a mantener la confidencialidad de la información.
        </p>

        <h3 className="text-xl font-semibold mb-4">5. ¿Compartimos tus datos con terceros?</h3>
        <p className="mb-6">
          No vendemos, intercambiamos ni transferimos de ningún otro modo a terceros tu información de identificación personal. Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro sitio web o la conducción de nuestro negocio (como proveedores de CRM o servicios de email marketing), siempre y cuando dichas partes se comprometan a mantener esta información confidencial.
        </p>

        <h3 className="text-xl font-semibold mb-4">6. Tus Derechos sobre tus Datos</h3>
        <p className="mb-2">Tienes derecho a:</p>
        <ul className="list-disc list-inside mb-6 ml-4">
          <li>Acceder a los datos personales que tenemos sobre ti.</li>
          <li>Rectificar cualquier dato personal que sea incorrecto o esté incompleto.</li>
          <li>Suprimir tus datos personales de nuestras bases de datos.</li>
          <li>Oponerte al tratamiento de tus datos para fines específicos.</li>
        </ul>
        <p className="mb-6">
          Para ejercer cualquiera de estos derechos, por favor contáctanos en info@datelia.tech.
        </p>

        <h3 className="text-xl font-semibold mb-4">7. Uso de Cookies</h3>
        <p className="mb-6">
          Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio transfiere al disco duro de tu computadora a través de tu navegador web (si lo permites) que permite a los sistemas del sitio reconocer tu navegador y capturar y recordar cierta información.
        </p>

        <h3 className="text-xl font-semibold mb-4">8. Cambios a nuestra Política de Privacidad</h3>
        <p className="mb-6">
          Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página y la fecha de "Última actualización" será modificada.
        </p>

        <h3 className="text-xl font-semibold mb-4">9. Contacto</h3>
        <p className="mb-6">
          Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos usando la información a continuación:
          <br />
          info@datelia.tech
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;