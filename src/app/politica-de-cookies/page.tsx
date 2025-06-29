import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// AVISO IMPORTANTE: Este es un texto de plantilla y no constituye asesoramiento legal. 
// Debes hacerlo revisar por un profesional para asegurar su validez.

const CookiesPolicyPage = () => {
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
        <title>Política de Cookies | Datelia</title>
        <meta name="description" content="Información sobre el uso de cookies en el sitio web de Datelia." />
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
                Política de Cookies
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
                <h3>1. ¿Qué son las Cookies?</h3>
                <p>
                  Una cookie es un pequeño archivo de texto que un sitio web almacena en su computadora o dispositivo móvil cuando usted visita el sitio. Las cookies nos permiten recordar sus acciones y preferencias (como el inicio de sesión o el idioma) durante un período de tiempo, para que no tenga que volver a introducirlas cada vez que vuelva al sitio o navegue de una página a otra.
                </p>

                <h3>2. ¿Cómo utilizamos las Cookies?</h3>
                <p>En Datelia, utilizamos cookies para varios propósitos importantes:</p>
                <ul>
                  <li><strong>Cookies Esenciales:</strong> Son estrictamente necesarias para el funcionamiento del sitio web. Sin ellas, servicios como la navegación segura no pueden ser proporcionados.</li>
                  <li><strong>Cookies de Rendimiento y Analíticas:</strong> Nos permiten reconocer y contar el número de visitantes y ver cómo se mueven por nuestro sitio web. Esto nos ayuda a mejorar la forma en que funciona nuestro sitio, por ejemplo, asegurando que los usuarios encuentren lo que buscan fácilmente. Utilizamos herramientas como Google Analytics para este fin.</li>
                  <li><strong>Cookies de Funcionalidad:</strong> Se utilizan para reconocerle cuando vuelve a nuestro sitio web. Esto nos permite personalizar nuestro contenido para usted y recordar sus preferencias.</li>
                </ul>

                <h3>3. Cookies de Terceros</h3>
                <p>
                  En algunos casos, también utilizamos cookies proporcionadas por terceros de confianza. Por ejemplo, nuestro sitio utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y fiables en la web para ayudarnos a entender cómo usa el sitio y cómo podemos mejorar su experiencia. Estas cookies pueden rastrear cosas como el tiempo que pasa en el sitio y las páginas que visita.
                </p>
                
                <h3>4. ¿Cómo puede controlar las Cookies?</h3>
                <p>
                  Usted puede controlar y/o eliminar las cookies como lo desee. Puede eliminar todas las cookies que ya están en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.
                </p>
                <p>
                  Para obtener más información sobre cómo gestionar las cookies, puede visitar los sitios de ayuda de su navegador.
                </p>

                <h3>5. Cambios en la Política de Cookies</h3>
                <p>
                  Podemos actualizar nuestra Política de Cookies de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva Política de Cookies en esta página. Se le aconseja revisar esta Política de Cookies periódicamente para cualquier cambio.
                </p>

                <h3>6. Contacto</h3>
                <p>
                  Si tiene alguna pregunta sobre nuestra Política de Cookies, no dude en contactarnos en: <a href="mailto:info@datelia.tech">info@datelia.tech</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default CookiesPolicyPage;