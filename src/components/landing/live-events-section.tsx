"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function LiveEventsSection() {
  const t = useTranslations("live_events");

  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl p-8 md:p-12 shadow-sm border border-border flex flex-col md:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <MonitorPlay className="w-4 h-4 mr-2" />
              {t("badge")}
            </div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("title")} <span className="text-primary italic">{t("title_highlight")}</span>
            </motion.h2>

            <motion.p 
              className="text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("description")}
            </motion.p>
            
            <motion.div 
               className="flex flex-col sm:flex-row gap-4"
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
              <div className="flex items-center text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded-md">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                {t("date")}
              </div>
              <div className="flex items-center text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded-md">
                <Users className="w-4 h-4 mr-2 text-primary" />
                {t("audience")}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="w-full md:w-80 shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 bg-zinc-900 text-white rounded-2xl shadow-xl space-y-6">
               <div>
                  <h4 className="text-lg font-semibold mb-1">{t("agenda_title")}</h4>
                  <p className="text-sm text-zinc-400">{t("agenda_desc")}</p>
               </div>
               
               {/* #TODO-LINK: Add real webinar registration URL */}
               <Button asChild className="w-full" size="lg">
                 <Link href="#TODO-LINK-WEBINAR">
                    {t("cta")} <ArrowRight className="ml-2 w-4 h-4" />
                 </Link>
               </Button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
