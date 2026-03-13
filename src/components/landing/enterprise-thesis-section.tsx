"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function EnterpriseThesisSection() {
  const t = useTranslations("enterprise_thesis");

  return (
    <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm text-zinc-900 border-zinc-300 dark:text-white dark:border-zinc-700 bg-transparent">
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("quote_1")} <br className="hidden md:block"/>
            <span className="text-primary">{t("quote_2")}</span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("paragraph_1")} <strong>{t("paragraph_strong")}</strong>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
