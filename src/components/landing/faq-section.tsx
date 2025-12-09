import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const faqs = [
        {
            question: "¿Cómo lo hacen? ¿Cuál es el proceso?",
            answer: (
                <div className="space-y-4">
                    <p>Lo hacemos en tres pasos simples y de bajo riesgo:</p>
                    <ul className="list-none space-y-4 pl-2">
                        <li>
                            <strong className="text-primary block mb-1">1. Discovery</strong>
                            Analizamos cómo trabajan hoy, medimos el impacto real de los cuellos de botella y priorizamos qué automatizar primero. No se cambia nada aún: solo entendemos, cuantificamos y proyectamos el ROI.
                        </li>
                        <li>
                            <strong className="text-primary block mb-1">2. MVP funcional</strong>
                            En pocas semanas desarrollamos una primera versión completamente operativa. Automatizamos los flujos críticos (turnos, reportes, pedidos, seguimiento, notificaciones) e integramos la información en un panel único. Se valida el impacto real desde el primer mes.
                        </li>
                        <li>
                            <strong className="text-primary block mb-1">3. Escalado</strong>
                            Una vez comprobado el valor, ampliamos la solución al resto de las áreas o unidades de negocio. Todo sin frenar la operación ni reemplazar los sistemas actuales.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            question: "¿Necesitan que cambiemos nuestros sistemas actuales?",
            answer: (
                <div className="space-y-2">
                    <p className="font-semibold text-primary">No.</p>
                    <p>
                        Datelia se integra con lo que ya usan: ERPs, planillas, WhatsApp, e-mail, CRMs, sistemas de gestión u otros softwares internos.
                    </p>
                    <p>
                        La implementación es incremental y sin fricción. Nuestra filosofía: la tecnología debe adaptarse a la empresa, no al revés.
                    </p>
                </div>
            ),
        },
        {
            question: "¿En cuánto tiempo vemos resultados?",
            answer: (
                <div className="space-y-2">
                    <p className="font-semibold text-primary">Los resultados se ven en semanas.</p>
                    <p>
                        El MVP funcional suele estar listo en un plazo corto y permite medir reducción de tiempos, disminución de errores y mejora en trazabilidad desde el primer mes.
                    </p>
                    <p>
                        Luego, se escala progresivamente sin afectar la operación diaria.
                    </p>
                </div>
            ),
        },
        {
            question: "¿Qué nivel de retorno podemos esperar?",
            answer: (
                <div className="space-y-4">
                    <p>En proyectos similares, las empresas obtuvieron:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>3× ROI en 60 a 90 días</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>-40% a -70% menos carga administrativa</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>Decisiones 10× más rápidas con BI</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>Respuestas a clientes en menos de 2 minutos</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>Eliminación de errores por tareas manuales</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            <span>+15 a +20 horas semanales liberadas por área</span>
                        </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                        El ROI se estima desde el Discovery y se valida en el MVP.
                    </p>
                </div>
            ),
        },
        {
            question: "¿Qué necesitamos aportar de nuestro lado?",
            answer: (
                <div className="space-y-2">
                    <p className="font-semibold text-primary">Muy poco.</p>
                    <p>
                        Solo un referente por área para entender cómo trabajan hoy y acceso a los flujos básicos: turnos, reportes, pedidos, comunicación, planillas o sistemas operativos.
                    </p>
                    <p>
                        Ustedes validan prioridades y nosotros nos encargamos del resto: diseño, desarrollo, integración, pruebas e implementación.
                    </p>
                </div>
            ),
        },
        {
            question: "¿Es seguro? ¿Cómo manejan nuestros datos?",
            answer: (
                <div className="space-y-2">
                    <p>
                        Todo proyecto incluye NDA, acceso controlado, encriptación de datos, servidores certificados y auditoría de usuarios.
                    </p>
                    <p>
                        Trabajamos bajo estándares internacionales y, cuando se requiere, incorporamos especialistas en ciberseguridad del ecosistema tecnológico y académico.
                    </p>
                    <p className="font-semibold text-primary">
                        La información del cliente sigue siendo siempre del cliente.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section id="faq" className="py-20 sm:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Resolvemos tus dudas sobre cómo implementamos IA en tu negocio.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
