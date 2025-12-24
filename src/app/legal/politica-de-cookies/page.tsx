import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Política de Cookies | Datelia',
    description: 'Información sobre el uso de cookies en el sitio web de Datelia.',
    alternates: {
        canonical: 'https://datelia.com.ar/legal/politica-de-cookies',
    },
};

const CookiesPolicyPage = () => {
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Layout>
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <Breadcrumbs className="mb-6" />
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-center">
                        Política de Cookies
                    </h1>
                </div>
            </section>

            <section className="py-20 sm:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <p className="text-sm text-muted-foreground">
                                Última actualización: {currentDate}
                            </p>
                        </CardHeader>

                        <CardContent>
                            <div className="
                prose max-w-none 
                text-foreground
                prose-headings:text-primary
                prose-h3:text-foreground
                prose-strong:text-foreground
                prose-a:text-primary
                prose-a:hover:underline
                prose-li:text-foreground
              ">
                                <h3>1. ¿Qué son las Cookies?</h3>
                                <p>
                                    Una cookie es un pequeño archivo de texto que un sitio web almacena en tu computadora o dispositivo móvil cuando visitas el sitio. Las cookies nos permiten recordar tus acciones y preferencias (como el inicio de sesión o el idioma) durante un período de tiempo, para que no tengas que volver a introducirlas cada vez que vuelvas al sitio o navegues de una página a otra.
                                </p>

                                <h3>2. ¿Cómo utilizamos las Cookies?</h3>
                                <p>En Datelia, utilizamos cookies para varios propósitos importantes:</p>
                                <ul>
                                    <li><strong>Cookies Esenciales:</strong> Son estrictamente necesarias para el funcionamiento del sitio web. Sin ellas, servicios como la navegación segura no pueden ser proporcionados.</li>
                                    <li><strong>Cookies de Rendimiento y Analíticas:</strong> Nos permiten reconocer y contar el número de visitantes y ver cómo se mueven por nuestro sitio web. Esto nos ayuda a mejorar la forma en que funciona nuestro sitio, por ejemplo, asegurando que los usuarios encuentren lo que buscan fácilmente. Utilizamos herramientas como Google Analytics para este fin.</li>
                                    <li><strong>Cookies de Funcionalidad:</strong> Se utilizan para reconocerte cuando vuelves a nuestro sitio web. Esto nos permite personalizar nuestro contenido para ti y recordar tus preferencias.</li>
                                </ul>

                                <h3>3. Cookies de Terceros</h3>
                                <p>
                                    En algunos casos, también utilizamos cookies proporcionadas por terceros de confianza. Por ejemplo, nuestro sitio utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y fiables en la web para ayudarnos a entender cómo usas el sitio y cómo podemos mejorar tu experiencia. Estas cookies pueden rastrear cosas como el tiempo que pasas en el sitio y las páginas que visitas.
                                </p>

                                <h3>4. ¿Cómo puedes controlar las Cookies?</h3>
                                <p>
                                    Puedes controlar y/o eliminar las cookies como lo desees. Puedes eliminar todas las cookies que ya están en tu computadora y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
                                </p>
                                <p>
                                    Para obtener más información sobre cómo gestionar las cookies, puedes visitar los sitios de ayuda de tu navegador.
                                </p>

                                <h3>5. Cambios en la Política de Cookies</h3>
                                <p>
                                    Podemos actualizar nuestra Política de Cookies de vez en cuando. Te notificaremos de cualquier cambio publicando la nueva Política de Cookies en esta página. Se te aconseja revisar esta Política de Cookies periódicamente para cualquier cambio.
                                </p>

                                <h3>6. Contacto</h3>
                                <p>
                                    Si tienes alguna pregunta sobre nuestra Política de Cookies, no dudes en contactarnos en: <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>.
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
