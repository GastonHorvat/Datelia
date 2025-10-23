import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// AVISO IMPORTANTE: Este es un texto de plantilla y no constituye asesoramiento legal. 
// Debes hacerlo revisar por un profesional para asegurar su validez.

const TermsAndConditionsPage = () => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      {/* ======================================================================================= */}
      {/* SECCIÓN 1: METADATOS DE LA PÁGINA                                                       */}
      {/* ======================================================================================= */}
      <Head>
        <title>Términos y Condiciones | Datelia</title>
        <meta name="description" content="Términos y Condiciones de uso para los servicios y el sitio web de Datelia." />
      </Head>

      {/* ======================================================================================= */}
      {/* SECCIÓN 2: CONTENEDOR PRINCIPAL DE LA PÁGINA                                            */}
      {/* ======================================================================================= */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            
            {/* --- Subsección: Cabecera de la Tarjeta --- */}
            <CardHeader>
              <CardTitle className="text-3xl font-headline">
                Términos y Condiciones de Uso
              </CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                Última actualización: {currentDate}
              </p>
            </CardHeader>
            
            {/* --- Subsección: Contenido Principal de la Tarjeta --- */}
            <CardContent>
              {/* Usamos exactamente las mismas clases `prose` para mantener la consistencia visual */}
              <div className="
                prose max-w-none 
                text-muted-foreground 
                prose-headings:text-foreground 
                prose-strong:text-foreground
                prose-a:text-primary
                prose-a:hover:underline
                dark:prose-invert
              ">
                <h3>1. Aceptación de los Términos</h3>
                <p>
                  Bienvenido a Datelia. Al acceder y utilizar nuestro sitio web (`datelia.com.ar`) y nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web ni nuestros servicios.
                </p>

                <h3>2. Descripción de los Servicios</h3>
                <p>
                  Datelia proporciona servicios de consultoría e implementación de soluciones de Inteligencia Artificial para empresas, incluyendo, pero no limitado a, el desarrollo de chatbots, agentes de voz y automatización de procesos. Las especificaciones de cada servicio se detallarán en una propuesta o contrato por separado.
                </p>

                <h3>3. Uso del Sitio Web</h3>
                <p>
                  Usted se compromete a utilizar nuestro sitio web únicamente con fines lícitos y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sitio por parte de terceros. Se prohíbe el uso de este sitio para transmitir o publicar cualquier material que sea difamatorio, ofensivo o de carácter obsceno.
                </p>

                <h3>4. Propiedad Intelectual</h3>
                <p>
                  Todo el contenido presente en este sitio web, incluyendo textos, gráficos, logos, iconos, imágenes y software, es propiedad de Datelia o de sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor. La compilación de todo el contenido de este sitio es propiedad exclusiva de Datelia.
                </p>

                <h3>5. Limitación de Responsabilidad</h3>
                <p>
                  Datelia no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la incapacidad de usar nuestro sitio web o servicios. Si bien nos esforzamos por proporcionar información precisa, no garantizamos que el contenido de este sitio esté libre de errores.
                </p>

                <h3>6. Modificaciones a los Términos</h3>
                <p>
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Su uso continuado del sitio después de cualquier cambio constituirá su aceptación de dichos cambios. Le recomendamos revisar esta página periódicamente.
                </p>

                <h3>7. Ley Aplicable y Jurisdicción</h3>
                <p>
                  Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de la Ciudad de Córdoba, Argentina.
                </p>

                <h3>8. Contacto</h3>
                <p>
                  Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de nuestro correo electrónico: <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditionsPage;