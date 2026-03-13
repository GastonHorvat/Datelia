"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ErpIntegrationSection() {
  const t = useTranslations("erp_integration");

  const integrationNodes = [
    { src: "/images/logos/odoo.svg", alt: "Odoo" },
    { src: "/images/logos/salesforce.svg", alt: "Salesforce" },
    { src: "/images/logos/hubspot.svg", alt: "HubSpot" },
    { src: "/images/logos/servicenow.svg", alt: "ServiceNow" },
    { src: "/images/logos/slack.svg", alt: "Slack" },
    { src: "/images/logos/teams.svg", alt: "Microsoft Teams" },
    { src: "/images/logos/whatsapp.svg", alt: "WhatsApp API" },
    { src: "/images/logos/notion.svg", alt: "Notion" },
    { src: "/images/logos/google.svg", alt: "Google Workspace" },
    { src: "/images/logos/stripe.svg", alt: "Stripe" },
  ];

  // Duplicamos el array para lograr el efecto loop sin cortes visuales en el carrusel
  const carouselItems = [...integrationNodes, ...integrationNodes];

  return (
    <section className="py-20 bg-white text-slate-900 overflow-hidden relative border-y border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03)_0%,transparent_80%)] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium">
            {t("description")}
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee Carousel */}
      <div className="relative w-full flex overflow-hidden group">

        {/* Gradientes laterales para difuminar la entrada y salida de los logos */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // Tiempo de ralentización del carrusel (a mayor numero, mas lento)
            repeat: Infinity,
          }}
        >
          {carouselItems.map((node, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 mx-4 cursor-default group"
            >
              <div className="w-40 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm hover:border-slate-300 hover:shadow-md transition-all relative overflow-hidden group-hover:bg-slate-50">
                <div className="relative w-[75%] h-[60%] flex items-center justify-center">
                  <Image
                    src={node.src}
                    alt={node.alt}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
