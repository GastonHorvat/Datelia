"use client";

import React, { useState, useRef, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
    const t = useTranslations('contact_form');
    const shouldReduceMotion = useReducedMotion();

    const [formData, setFormData] = useState({
        nombre: "",
        empresa: "",
        contacto: "",
        tarea: "",
        website_url: "", // honeypot: debe quedar siempre vacío para un usuario real
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState<Record<"nombre" | "empresa" | "contacto", boolean>>({
        nombre: false,
        empresa: false,
        contacto: false,
    });

    const nombreRef = useRef<HTMLInputElement>(null);
    const empresaRef = useRef<HTMLInputElement>(null);
    const contactoRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name in invalidFields) {
            setInvalidFields((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const missing = {
            nombre: !formData.nombre,
            empresa: !formData.empresa,
            contacto: !formData.contacto,
        };
        if (missing.nombre || missing.empresa || missing.contacto) {
            setInvalidFields(missing);
            setErrorMessage(t('errors.required'));
            (missing.nombre ? nombreRef : missing.empresa ? empresaRef : contactoRef).current?.focus();
            return;
        }
        setInvalidFields({ nombre: false, empresa: false, contacto: false });

        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                const data = await response.json();
                setStatus("error");
                setErrorMessage(data.error || t('errors.submit_error'));
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage(t('errors.connection_error'));
        }
    };

    if (status === "success") {
        return (
            <motion.div initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="max-w-xl mx-auto border-primary/20 bg-primary/5">
                    <CardContent className="pt-8 pb-8 text-center space-y-4">
                        <div className="flex justify-center mb-2">
                            <CheckCircle className="h-16 w-16 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold font-headline tracking-tight">{t('success.title')}</h2>
                        <p className="text-muted-foreground text-lg">{t('success.message')}</p>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <Card className="max-w-xl mx-auto border border-border shadow-sm">
            <CardContent className="pt-8 pb-8 px-6 sm:px-8">
                {errorMessage && (
                    <div id="contact-form-error" role="alert" className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm mb-6">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot anti-spam: invisible para una persona, visible para un bot que completa todos los inputs */}
                    <input
                        type="text"
                        name="website_url"
                        value={formData.website_url}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                        aria-hidden="true"
                    />
                    <div className="space-y-2">
                        <Label htmlFor="nombre">{t('fields.nombre')}</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            ref={nombreRef}
                            value={formData.nombre}
                            onChange={handleChange}
                            aria-invalid={invalidFields.nombre || undefined}
                            aria-describedby={invalidFields.nombre ? "contact-form-error" : undefined}
                            className="h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="empresa">{t('fields.empresa')}</Label>
                        <Input
                            id="empresa"
                            name="empresa"
                            ref={empresaRef}
                            value={formData.empresa}
                            onChange={handleChange}
                            aria-invalid={invalidFields.empresa || undefined}
                            aria-describedby={invalidFields.empresa ? "contact-form-error" : undefined}
                            className="h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contacto">{t('fields.contacto')}</Label>
                        <Input
                            id="contacto"
                            name="contacto"
                            ref={contactoRef}
                            value={formData.contacto}
                            onChange={handleChange}
                            aria-invalid={invalidFields.contacto || undefined}
                            aria-describedby={invalidFields.contacto ? "contact-form-error" : undefined}
                            className="h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tarea">{t('fields.tarea')}</Label>
                        <Textarea
                            id="tarea"
                            name="tarea"
                            value={formData.tarea}
                            onChange={handleChange}
                            className="min-h-[100px] resize-none"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12" disabled={status === "loading"}>
                        {status === "loading" ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('sending')}
                            </>
                        ) : (
                            t('submit')
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
