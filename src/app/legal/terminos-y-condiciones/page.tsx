import React from 'react';
import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | Datelia',
    description: 'Términos y Condiciones de uso del sitio web de Datelia.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function TermsPage() {
    return (
        <Layout>
            <section className="bg-accent text-accent-foreground pt-32 pb-8 sm:pt-32 sm:pb-12 text-center">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <Breadcrumbs className="mb-6" />
                    <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                        Términos y Condiciones
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
                            Bienvenido a <strong>Datelia</strong>. Al acceder y utilizar nuestro sitio web <strong>datelia.tech</strong> ("Sitio"), usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro Sitio.
                        </p>

                        <h3>1. Uso del Sitio</h3>
                        <p>
                            El contenido de este Sitio es para su información general y uso personal. Está sujeto a cambios sin previo aviso. Usted se compromete a utilizar el Sitio solo para fines legales y de una manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del Sitio por parte de cualquier tercero.
                        </p>

                        <h3>2. Propiedad Intelectual</h3>
                        <p>
                            Todo el contenido presente en este Sitio, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Datelia o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual aplicables.
                        </p>

                        <h3>3. Servicios y Limitación de Responsabilidad</h3>
                        <p>
                            Datelia ofrece servicios de consultoría y desarrollo de software en Inteligencia Artificial. La información proporcionada en este Sitio sobre nuestros servicios es de carácter informativo.
                        </p>
                        <p>
                            En la medida máxima permitida por la ley, Datelia no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso del Sitio o de la información contenida en él.
                        </p>

                        <h3>4. Enlaces a Terceros</h3>
                        <p>
                            Este Sitio puede contener enlaces a otros sitios web que no son operados por nosotros. No tenemos control sobre el contenido y las prácticas de estos sitios y no asumimos ninguna responsabilidad por ellos.
                        </p>

                        <h3>5. Modificaciones</h3>
                        <p>
                            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Su uso continuado del Sitio después de cualquier cambio constituye su aceptación de los nuevos Términos.
                        </p>

                        <h3>6. Ley Aplicable y Jurisdicción</h3>
                        <p>
                            Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Cualquier disputa relacionada con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.
                        </p>

                        <h3>7. Contacto</h3>
                        <p>
                            Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en <strong>info@datelia.com.ar</strong>.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
