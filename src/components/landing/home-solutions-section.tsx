import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Receipt, ClipboardList, FileSpreadsheet, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SOLUTIONS = [
  { icon: Receipt, slug: "rendicion-de-gastos", key: "rendicion" },
  { icon: ClipboardList, slug: "pedidos-y-presupuestos", key: "pedidos" },
  { icon: FileSpreadsheet, slug: "facturas-y-proveedores", key: "facturas" },
  { icon: LayoutDashboard, slug: "tableros-de-gestion", key: "tableros" },
];

export function HomeSolutionsSection() {
  const t = useTranslations("home_solutions");
  const tCards = useTranslations("solutions_overview.cards");
  const locale = useLocale();

  return (
    <section className="py-20 sm:py-24 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-accent-foreground/80">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {SOLUTIONS.map(({ icon: Icon, slug, key }) => (
            <Link key={slug} href={`/${locale}/soluciones/${slug}`} className="block group h-full">
              <Card className="h-full flex flex-col bg-background border-transparent hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg leading-snug">{tCards(`${key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm flex-grow">{tCards(`${key}.description`)}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="bg-background text-foreground hover:bg-background/90 hover:text-foreground">
            <Link href={`/${locale}/soluciones`}>{t("cta_button")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
