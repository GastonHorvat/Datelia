import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Datelia',
    description: 'Conoce cómo Datelia recopila, usa y protege tus datos personales. Tu privacidad y seguridad son nuestra prioridad.',
    alternates: {
        canonical: 'https://datelia.tech/legal/politica-de-privacidad',
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
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <Breadcrumbs className="mb-6" />
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-center">
                        Política de Privacidad
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
                                <p>
                                    Bienvenido a Datelia. Tu privacidad es de suma importancia. Esta Política de Privacidad tiene como objetivo informarte sobre cómo recopilamos, usamos, protegemos y tratamos la información que proporcionas a través de nuestro sitio web.
                                </p>

                                <h3>1. Responsable del Tratamiento de Datos</h3>
                                <ul>
                                    <li><strong>Nombre de la empresa:</strong> Datelia</li>
                                    <li><strong>Correo electrónico de contacto:</strong> <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a></li>
                                    <li><strong>Sitio web:</strong> <a href="https://datelia.tech" target="_blank" rel="noopener noreferrer">https://datelia.tech</a></li>
                                </ul>

                                <h3>2. ¿Qué información recopilamos?</h3>
                                <p>Recopilamos información de dos maneras:</p>
                                <p><strong>Información que proporcionas directamente:</strong> A través de nuestro formulario de contacto, recopilamos datos personales que incluyen, entre otros:</p>
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
                                <p>Tienes derecho a acceder, rectificar, suprimir u oponerte al tratamiento de tus datos personales. Para ejercer cualquiera de estos derechos, por favor contáctanos en <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>.</p>

                                <h3>7. Uso de Cookies</h3>
                                <p>
                                    Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio transfiere al disco duro de tu computadora a través de tu navegador para capturar y recordar cierta información. Para obtener más detalles, consulta nuestra <a href="/legal/politica-de-cookies">Política de Cookies</a>.
                                </p>

                                <h3>8. Cambios a nuestra Política de Privacidad</h3>
                                <p>
                                    Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página y la fecha de "Última actualización" será modificada.
                                </p>

                                <h3>9. Contacto</h3>
                                <p>
                                    Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos en <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>.
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
