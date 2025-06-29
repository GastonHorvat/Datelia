"use client";

import React, { useState, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

// Opciones para los checkboxes, haciendo el código más limpio
const sectors = [
  { id: "real-estate", label: "Real Estate" },
  { id: "educacion", label: "Educación" },
  { id: "retail", label: "Retail" },
  { id: "salud", label: "Salud" },
  { id: "logistica", label: "Logística / Operaciones" },
  { id: "otro-sector", label: "Otro" },
];

const howFoundOptions = [
  { id: "recommended", label: "Nos recomendaron" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "otro-how", label: "Otro" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    sector: [] as string[],
    mensaje: "",
    howFound: [] as string[],
  });
  
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
    sector: "",
    mensaje: "",
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  // La lógica de manejo y validación se mantiene, ya que es correcta.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: 'sector' | 'howFound', value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[name] as string[];
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter((item) => item !== value) };
      }
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { nombre: "", email: "", telefono: "", sector: "", mensaje: "" };

    if (!formData.nombre.trim()) { newErrors.nombre = "El nombre es requerido."; valid = false; }
    if (!formData.email.trim()) { newErrors.email = "El email es requerido."; valid = false; } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "El formato del email no es válido."; valid = false; }
    if (!formData.telefono.trim()) { newErrors.telefono = "El teléfono es requerido."; valid = false; }
    if (formData.sector.length === 0) { newErrors.sector = "Selecciona al menos un sector."; valid = false; }
    if (!formData.mensaje.trim()) { newErrors.mensaje = "El mensaje es requerido."; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitStatus(response.ok ? "submitted" : "error");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contacto | Hablemos de tu Próxima Solución Inteligente</title>
        <meta name="description" content="Contacta a Datelia para diseñar una solución de IA adaptada a tus procesos, impulsando la eficiencia y el crecimiento empresarial." />
      </Head>

      <section className="bg-accent text-accent-foreground pt-28 pb-12 text-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Hablemos de tu Próxima Solución Inteligente
          </h1>
          <p className="mt-4 text-lg text-accent-foreground/80 max-w-3xl mx-auto">
            Diseñamos soluciones adaptadas para optimizar procesos, eliminar tareas repetitivas y potenciar la toma de decisiones estratégicas.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Completa el formulario</CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === "submitted" ? (
                <div className="text-center py-10">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-muted-foreground">Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Tu nombre completo*</Label>
                      <Input id="nombre" name="nombre" placeholder="Ingresa tu nombre completo" value={formData.nombre} onChange={handleInputChange} />
                      {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Tu correo electrónico*</Label>
                      <Input id="email" name="email" type="email" placeholder="Ingresa tu correo electrónico" value={formData.email} onChange={handleInputChange} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono*</Label>
                      <Input id="telefono" name="telefono" type="tel" placeholder="Déjanos tu número de contacto" value={formData.telefono} onChange={handleInputChange} />
                      {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input id="empresa" name="empresa" placeholder="Nombre y web de la empresa" value={formData.empresa} onChange={handleInputChange} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sector*</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {sectors.map(sector => (
                        <div key={sector.id} className="flex items-center gap-2">
                          <Checkbox id={sector.id} onCheckedChange={(checked) => handleCheckboxChange('sector', sector.label, !!checked)} />
                          <Label htmlFor={sector.id} className="font-normal">{sector.label}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.sector && <p className="text-sm text-destructive">{errors.sector}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Tu mensaje aquí*</Label>
                    <Textarea id="mensaje" name="mensaje" placeholder="Describe tu desafío o consulta..." value={formData.mensaje} onChange={handleInputChange} rows={6} />
                    {errors.mensaje && <p className="text-sm text-destructive">{errors.mensaje}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>¿Cómo llegaste a nosotros?</Label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {howFoundOptions.map(option => (
                        <div key={option.id} className="flex items-center gap-2">
                          <Checkbox id={option.id} onCheckedChange={(checked) => handleCheckboxChange('howFound', option.label, !!checked)} />
                          <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={submitStatus === "submitting"}>
                    {submitStatus === "submitting" ? "Enviando..." : "Enviar Solicitud"}
                  </Button>

                  {submitStatus === "error" && (
                     <div className="flex items-center justify-center gap-2 text-destructive font-medium">
                       <AlertCircle className="h-4 w-4" />
                       <p>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>
                     </div>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}