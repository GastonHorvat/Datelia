import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | Datelia',
    description: 'Términos y Condiciones de uso para los servicios y el sitio web de Datelia.',
    alternates: {
        canonical: 'https://www.datelia.com.ar/legal/terminos-y-condiciones',
    },
};

const TermsAndConditionsPage = () => {
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
                        Términos y Condiciones
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
                                <h3>1. Partes y Aceptación de los Términos</h3>
                                <p>
                                    Bienvenido a Datelia. El presente sitio web (datelia.com.ar) es operado por <strong>Sentido Común S.R.L.</strong>, con nombre comercial <strong>Datelia</strong>, CUIT 30-71183694-9, con domicilio en la ciudad de Salta, provincia de Salta, República Argentina (en adelante, "Datelia").
                                </p>
                                <p>
                                    Al acceder y utilizar este sitio web y los servicios ofrecidos, el usuario acepta cumplir y quedar sujeto a los presentes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debés utilizar el sitio web ni los servicios.
                                </p>

                                <h3>2. Descripción de los Servicios</h3>
                                <p>
                                    Datelia proporciona servicios de consultoría, diseño e implementación de soluciones de Inteligencia Artificial para empresas, incluyendo pero no limitado a: arquitectura agéntica gobernada bajo metodología D.O.A.™, desarrollo de chatbots inteligentes, agentes de voz y automatización de procesos. Las especificaciones, alcances, plazos y condiciones económicas de cada servicio se detallarán en una propuesta o contrato suscripto por separado entre las partes.
                                </p>

                                <h3>3. Uso del Sitio Web</h3>
                                <p>
                                    El usuario se compromete a utilizar este sitio web únicamente con fines lícitos y de una manera que no infrinja los derechos de terceros, ni restrinja o inhiba el uso y disfrute del sitio por parte de otros usuarios. Queda expresamente prohibido el uso de este sitio para transmitir o publicar material difamatorio, ofensivo, obsceno, o que infrinja derechos de propiedad intelectual de Datelia o de terceros.
                                </p>

                                <h3>4. Propiedad Intelectual y Metodología D.O.A.™</h3>
                                <p>
                                    Todo el contenido presente en este sitio web, incluyendo textos, gráficos, logotipos, íconos, imágenes y software, es propiedad de Sentido Común S.R.L. (Datelia) o de sus proveedores de contenido, y se encuentra protegido por la Ley N° 11.723 de Propiedad Intelectual de la República Argentina y los tratados internacionales aplicables.
                                </p>
                                <p>
                                    La denominación <strong>D.O.A.™ (Diseño Operativo Agéntico)</strong> constituye una marca en proceso de registro ante el Instituto Nacional de la Propiedad Industrial (INPI) a nombre de Sentido Común S.R.L. Queda expresamente prohibida su reproducción, uso, comunicación pública o explotación comercial —total o parcial— sin autorización escrita previa de Datelia. Ninguna disposición de estos términos otorga al usuario licencia alguna sobre dicha metodología, marca o denominación.
                                </p>

                                <h3>5. Limitación de Responsabilidad</h3>
                                <p>
                                    Datelia no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar este sitio web o los servicios ofrecidos, en la máxima medida permitida por la legislación argentina aplicable. Si bien nos esforzamos por mantener información precisa y actualizada, no garantizamos que el contenido de este sitio esté libre de errores u omisiones.
                                </p>

                                <h3>6. Confidencialidad</h3>
                                <p>
                                    Toda información técnica, comercial, operativa o estratégica que el usuario comparta con Datelia en el marco de una evaluación, propuesta o contratación de servicios será tratada con carácter estrictamente confidencial. Datelia no divulgará dicha información a terceros sin consentimiento expreso del titular, salvo requerimiento legal o judicial.
                                </p>

                                <h3>7. Modificaciones a los Términos</h3>
                                <p>
                                    Datelia se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigencia a partir de su publicación en esta página, con actualización de la fecha correspondiente. El uso continuado del sitio con posterioridad a dichos cambios implica la aceptación de los términos modificados. Se recomienda revisar esta página periódicamente.
                                </p>

                                <h3>8. Ley Aplicable y Jurisdicción</h3>
                                <p>
                                    Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Para cualquier controversia o disputa que surja en relación con estos términos, los servicios o el sitio web, las partes se someten a la jurisdicción exclusiva de los tribunales ordinarios de la ciudad de <strong>Salta, provincia de Salta</strong>, con renuncia expresa a cualquier otro fuero que pudiera corresponder.
                                </p>

                                <h3>9. Contacto</h3>
                                <p>
                                    Para cualquier consulta sobre estos Términos y Condiciones, podés contactarnos en:
                                </p>
                                <ul>
                                    <li><strong>Razón social:</strong> Sentido Común S.R.L.</li>
                                    <li><strong>Nombre comercial:</strong> Datelia</li>
                                    <li><strong>CUIT:</strong> 30-71183694-9</li>
                                    <li><strong>Domicilio:</strong> Salta, provincia de Salta, Argentina</li>
                                    <li><strong>Correo electrónico:</strong> <a href="mailto:info@datelia.com.ar">info@datelia.com.ar</a></li>
                                    <li><strong>Sitio web:</strong> <a href="https://www.datelia.com.ar" target="_blank" rel="noopener noreferrer">https://www.datelia.com.ar</a></li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
};

export default TermsAndConditionsPage;
