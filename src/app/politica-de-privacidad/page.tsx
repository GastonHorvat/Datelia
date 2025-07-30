import React from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Datelia',
  description: 'Conoce cómo Datelia recopila, usa y protege tus datos personales. Tu privacidad y seguridad son nuestra prioridad.',
  alternates: {
    canonical: '/politica-de-privacidad',
  },
};
const PrivacyPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      {/* ======================================================================================= */}
      {/* SECCIÓN 2: CONTENEDOR PRINCIPAL DE LA PÁGINA                                            */}
      {/* ======================================================================================= */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            
            {/* --- Subsección: Cabecera de la Tarjeta --- */}
            <CardHeader>
              <CardTitle className="text-3xl font-headline">
                Política de Privacidad
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                Última actualización: {currentDate}
              </p>
            </CardHeader>
            
            {/* --- Subsección: Contenido Principal de la Tarjeta --- */}
            <CardContent>

              {/* ======================================================================================= */}
              {/* LA CORRECCIÓN DEFINITIVA ESTÁ EN LA LÍNEA `className` DE ESTE DIV                        */}
              {/* ======================================================================================= */}
              {/*
                - `prose`: Aplica los estilos de espaciado y tamaño.
                - `max-w-none`: Asegura que el texto ocupe todo el ancho de la tarjeta.
                - `text-muted-foreground`: Establece un color base claro y legible para todo el texto.
                - `prose-headings:text-foreground`: Hace que los títulos (h3) sean más brillantes.
                - `prose-strong:text-foreground`: Hace que el texto en negrita también resalte.
                - `dark:prose-invert`: Lo mantenemos por si hay algún elemento que no anulemos explícitamente.
              */}
                <div className="
                  prose max-w-none 
                  text-muted-foreground 
                  prose-headings:text-foreground 
                  prose-strong:text-foreground
                  prose-a:text-primary
                  prose-a:hover:underline
                  dark:prose-invert
                ">
                <p>
                  Bienvenido a Datelia. Tu privacidad es de suma importancia para nosotros. Esta Política de Privacidad tiene como objetivo informarte sobre cómo recopilamos, usamos, protegemos y tratamos la información que nos proporcionas a través de nuestro sitio web.
                </p>

                <h3>1. Responsable del Tratamiento de Datos</h3>
                <ul>
                  <li><strong>Nombre de la empresa:</strong> Datelia</li>
                  <li><strong>Correo electrónico de contacto:</strong> <a href="mailto:info@datelia.tech">info@datelia.tech</a></li>
                  <li><strong>Sitio web:</strong> <a href="https://www.datelia.com.ar" target="_blank" rel="noopener noreferrer">https://www.datelia.com.ar</a></li>
                </ul>

                <h3>2. ¿Qué información recopilamos?</h3>
                <p>Recopilamos información de dos maneras:</p>
                <p><strong>Información que nos proporcionas directamente:</strong> A través de nuestro formulario de contacto, recopilamos datos personales que incluyen, entre otros:</p>
                <ul>
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Nombre de la empresa</li>
                  <li>Sector de actividad</li>
                  <li>Cualquier otra información que decidas incluir en el cuerpo del mensaje.</li>
                </ul>
                <p><strong>Información recopilada automáticamente:</strong> A través de cookies y tecnologías similares, podemos recopilar datos no personales sobre tu visita, como dirección IP, tipo de navegador y dispositivo, y páginas visitadas.</p>

                <h3>3. ¿Con qué finalidad usamos tu información?</h3>
                <p>La información que recopilamos se utiliza para los siguientes propósitos:</p>
                <ul>
                  <li><strong>Para responder a tus consultas:</strong> Usamos tus datos para comunicarnos contigo y responder a las solicitudes de información.</li>
                  <li><strong>Para mejorar nuestro sitio web:</strong> Analizamos los datos de uso para entender cómo interactúan los visitantes con nuestro sitio.</li>
                  <li><strong>Para fines de marketing (con tu consentimiento):</strong> Podríamos usar tu correo para enviarte información sobre nuestros servicios o casos de éxito.</li>
                </ul>

                <h3>4. ¿Cómo protegemos tu información?</h3>
                <p>
                  Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal. Tus datos se almacenan en redes seguras y solo son accesibles por un número limitado de personas con derechos especiales de acceso.
                </p>

                <h3>5. ¿Compartimos tus datos con terceros?</h3>
                <p>
                  No vendemos, intercambiamos ni transferimos de ningún otro modo a terceros tu información de identificación personal. Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro negocio (como proveedores de CRM o servicios de email), siempre que se comprometan a mantener esta información confidencial.
                </p>

                <h3>6. Tus Derechos sobre tus Datos</h3>
                <p>Tienes derecho a acceder, rectificar, suprimir u oponerte al tratamiento de tus datos personales. Para ejercer cualquiera de estos derechos, por favor contáctanos en `info@datelia.tech`.</p>

                <h3>7. Uso de Cookies</h3>
                <p>
                  Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio transfiere al disco duro de tu computadora a través de tu navegador para capturar y recordar cierta información.
                </p>

                <h3>8. Cambios a nuestra Política de Privacidad</h3>
                <p>
                  Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página y la fecha de "Última actualización" será modificada.
                </p>

                <h3>9. Contacto</h3>
                <p>
                  Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos usando la información a continuación: `info@datelia.tech`.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;