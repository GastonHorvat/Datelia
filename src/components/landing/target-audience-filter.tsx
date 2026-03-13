"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Building2, Workflow, Database, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function TargetAudienceFilter() {
  const t = useTranslations("target_audience");

  const isForIcons = [Building2, Database, Network, Workflow];
  const isForItems = t.raw("is_for") as {title: string}[];
  const isFor = isForItems.map((item, idx) => ({
    title: item.title,
    icon: isForIcons[idx % isForIcons.length]
  }));

  const isNotItems = t.raw("is_not") as {title: string, desc: string}[];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SÍ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                  {t("is_for_title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isFor.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg leading-none mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("is_for_item_desc")}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* NO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
             <Card className="h-full border-destructive/20 bg-destructive/5 opacity-80">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-destructive">
                  <XCircle className="w-8 h-8" />
                  {t("is_not_title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isNotItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-destructive/10 p-2 rounded-lg text-destructive shrink-0">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg leading-none mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
