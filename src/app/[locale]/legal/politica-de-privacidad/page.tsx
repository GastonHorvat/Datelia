import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Datelia',
    description: 'Conoce cómo Datelia recopila, usa y protege tus datos personales. Tu privacidad y seguridad son nuestra prioridad.',
    alternates: {
        canonical: 'https://www.datelia.com.ar/legal/politica-de-privacidad',
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
                                    Bienvenido a Datelia. Tu privacidad es de suma importancia. Esta Política de Privacidad tiene como objetivo informarte sobre cómo recopilamos, usamos, protegemos y tratamos la información que proporcionas a través de nuestro sitio web, en cumplimiento de la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina y su normativa reglamentaria.
                                </p>

                                <h3>1. Responsable del Tratamiento de Datos</h3>
                                <ul>
                                    <li><strong>Razón social:</strong> Sentido Común S.R.L.</li>
                                    <li><strong>Nombre comercial:</strong> Datelia</li>
                                    <li><strong>CUIT:</strong> 30-71183694-9</li>
                                    <li><strong>Domicilio fiscal:</strong> Salta, Argentina</li>
                                    <li><strong>Correo electrónico:</strong> <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a></li>
                                    <li><strong>Sitio web:</strong> <a href="https://www.datelia.com.ar" target="_blank" rel="noopener noreferrer">https://www.datelia.com.ar</a></li>
                                </ul>
                                <p>
                                    La base de datos de carácter personal gestionada a través de este sitio web se encuentra registrada ante la Agencia de Acceso a la Información Pública (AAIP), en cumplimiento del artículo 3° de la Ley N° 25.326.
                                </p>

                                <h3>2. ¿Qué información recopilamos?</h3>
                                <p>Recopilamos información de dos maneras:</p>
                                <p><strong>Información que proporcionás directamente:</strong> A través de nuestro formulario de contacto, recopilamos datos personales que incluyen, entre otros:</p>
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
                                    <li><strong>Para fines de marketing (con tu consentimiento):</strong> Podríamos usar tu correo para enviarte información sobre nuestros servicios o casos de éxito. Podés revocar este consentimiento en cualquier momento escribiéndonos a <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>.</li>
                                </ul>

                                <h3>4. ¿Cómo protegemos tu información?</h3>
                                <p>
                                    Implementamos medidas técnicas y organizativas adecuadas para garantizar la seguridad de tu información personal y evitar su alteración, pérdida, tratamiento o acceso no autorizado, conforme a lo establecido en el artículo 9° de la Ley N° 25.326. Tus datos se almacenan en redes seguras y solo son accesibles por personas con funciones específicas que requieran dicho acceso.
                                </p>

                                <h3>5. ¿Compartimos tus datos con terceros?</h3>
                                <p>
                                    No vendemos, intercambiamos ni transferimos a terceros tu información de identificación personal. Esto no incluye a proveedores de servicios de confianza que nos asisten en la operación de nuestro negocio (como plataformas de CRM o servicios de correo electrónico), quienes se encuentran contractualmente obligados a mantener la confidencialidad de dicha información y no pueden utilizarla para ningún otro propósito.
                                </p>

                                <h3>6. Tus Derechos sobre tus Datos</h3>
                                <p>
                                    En virtud de lo dispuesto por la Ley N° 25.326, el titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto. Asimismo, tenés derecho a rectificar, actualizar, suprimir u oponerte al tratamiento de tus datos.
                                </p>
                                <p>
                                    Para ejercer cualquiera de estos derechos, podés contactarnos en <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a>. La Agencia de Acceso a la Información Pública (AAIP), en su carácter de órgano de control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.
                                </p>

                                <h3>7. Uso de Cookies</h3>
                                <p>
                                    Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio transfiere al disco duro de tu computadora a través de tu navegador para capturar y recordar cierta información. Para obtener más detalles, consultá nuestra <a href="/legal/politica-de-cookies">Política de Cookies</a>.
                                </p>

                                <h3>8. Transferencia internacional de datos</h3>
                                <p>
                                    En caso de utilizar proveedores de servicios con servidores ubicados fuera de Argentina (por ejemplo, plataformas de CRM o almacenamiento en la nube), nos aseguramos de que dichos proveedores ofrezcan un nivel de protección adecuado conforme a los estándares establecidos por la AAIP, o contamos con las garantías contractuales correspondientes.
                                </p>

                                <h3>9. Cambios a nuestra Política de Privacidad</h3>
                                <p>
                                    Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de "Última actualización" correspondiente. Te recomendamos revisarla periódicamente.
                                </p>

                                <h3>10. Contacto</h3>
                                <p>
                                    Si tenés alguna pregunta sobre esta política de privacidad o deseás ejercer tus derechos, podés contactarnos en <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a> o por escrito en el domicilio de Sentido Común S.R.L. (Datelia), Salta, Argentina.
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
