import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Datelia',
    description: 'Política de Privacidad de Datelia. Conoce cómo protegemos y tratamos tus datos personales.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <Layout>
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <Breadcrumbs className="mb-6" />
                    <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
                        Última actualización: Diciembre 2025
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* CORRECCIÓN: Estilos de alto contraste aplicados manualmente */}
                    <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
                        <p>
                            En <strong>Datelia</strong>, respetamos su privacidad y estamos comprometidos a proteger los datos personales que comparte con nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información cuando visita nuestro sitio web <strong>datelia.tech</strong>.
                        </p>

                        <h3>1. Responsable del Tratamiento de Datos</h3>
                        <p>
                            El responsable del tratamiento de los datos personales recogidos en este sitio web es Datelia, con domicilio en Buenos Aires, Argentina. Para cualquier consulta relacionada con la privacidad, puede contactarnos en <strong>info@datelia.com.ar</strong>.
                        </p>

                        <h3>2. Información que Recopilamos</h3>
                        <p>Podemos recopilar y procesar los siguientes datos:</p>
                        <ul>
                            <li><strong>Datos de Contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono y empresa, que usted nos proporciona voluntariamente al completar nuestros formularios de contacto o solicitar una demo.</li>
                            <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, recopilados a través de cookies y tecnologías similares para mejorar la experiencia del usuario.</li>
                        </ul>

                        <h3>3. Finalidad del Tratamiento</h3>
                        <p>Utilizamos sus datos personales para los siguientes fines:</p>
                        <ul>
                            <li>Responder a sus consultas y solicitudes de información.</li>
                            <li>Proporcionar, operar y mantener nuestros servicios.</li>
                            <li>Enviar comunicaciones comerciales y newsletters (si ha dado su consentimiento explícito).</li>
                            <li>Mejorar nuestro sitio web y analizar tendencias de uso.</li>
                        </ul>

                        <h3>4. Base Legal</h3>
                        <p>
                            El tratamiento de sus datos se basa en su consentimiento (al enviar un formulario) y en nuestro interés legítimo de responder a sus solicitudes y mejorar nuestros servicios.
                        </p>

                        <h3>5. Compartir Información</h3>
                        <p>
                            No vendemos, alquilamos ni compartimos su información personal con terceros con fines comerciales. Podemos compartir datos con proveedores de servicios de confianza (como servicios de hosting o email marketing) que nos ayudan a operar nuestro negocio, siempre bajo estrictos acuerdos de confidencialidad.
                        </p>

                        <h3>6. Seguridad de los Datos</h3>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger sus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
                        </p>

                        <h3>7. Sus Derechos</h3>
                        <p>
                            De acuerdo con la Ley 25.326 de Protección de Datos Personales (Argentina) y otras normativas aplicables, usted tiene derecho a:
                        </p>
                        <ul>
                            <li>Acceder a sus datos personales.</li>
                            <li>Rectificar datos inexactos o incompletos.</li>
                            <li>Solicitar la supresión de sus datos.</li>
                            <li>Oponerse al tratamiento de sus datos.</li>
                            <li>Retirar su consentimiento en cualquier momento.</li>
                        </ul>
                        <p>
                            Para ejercer estos derechos, envíe un correo electrónico a <strong>info@datelia.com.ar</strong>.
                        </p>

                        <h3>8. Cambios en esta Política</h3>
                        <p>
                            Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos cualquier cambio publicando la nueva política en esta página.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
