"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactForm() {
    const t = useTranslations('contact_form');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        empresa: "",
        cantidadEmpleados: "",
        facturacion: "",
        ecosistema: "",
        desafio: "",
        nombre: "",
        cargo: "",
        email: "",
    });

    const employeeRanges = [
        { value: "1-10", label: "1-10" },
        { value: "11-50", label: "11-50" },
        { value: "51-200", label: "51-200" },
        { value: "201-500", label: "201-500" },
        { value: "500+", label: "500+" },
    ];

    const revenueRanges = [
        { value: "range_1", label: t('revenue.range_1') },
        { value: "range_2", label: t('revenue.range_2') },
        { value: "range_3", label: t('revenue.range_3') },
        { value: "range_4", label: t('revenue.range_4') },
    ];

    const ecosystemOptions = [
        { value: "sap", label: "SAP" },
        { value: "oracle", label: "Oracle" },
        { value: "salesforce", label: "Salesforce" },
        { value: "odoo", label: "Odoo" },
        { value: "hubspot", label: t('ecosystems.hubspot') },
        { value: "google-microsoft", label: "Google Workspace / Microsoft 365" },
        { value: "custom", label: t('ecosystems.custom') },
        { value: "multi", label: t('ecosystems.multi') }
    ];

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [leadId, setLeadId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        const actualValue = value;
        setFormData((prev) => ({ ...prev, [name]: actualValue }));
    };

    const syncLeadData = async (currentStep: number) => {
        try {
            const response = await fetch("/api/discovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadId,
                    step: currentStep,
                    data: formData
                }),
            });
            const result = await response.json();
            if (result.leadId) {
                setLeadId(result.leadId);
            }
        } catch (error) {
            console.error("Error syncing lead data:", error);
        }
    };

    const nextStep = async () => {
        if (step === 1) {
            if (!formData.empresa || !formData.cantidadEmpleados || !formData.facturacion) {
                setErrorMessage(t('errors.step1'));
                return;
            }
            await syncLeadData(1);
        }
        if (step === 2) {
            if (!formData.ecosistema || !formData.desafio) {
                setErrorMessage(t('errors.step2'));
                return;
            }
            await syncLeadData(2);
        }
        setErrorMessage("");
        setStep((s) => s + 1);
    };

    const prevStep = () => {
        setErrorMessage("");
        setStep((s) => s - 1);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.cargo || !formData.email) {
            setErrorMessage(t('errors.step3'));
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            // Final sync for Step 3
            await syncLeadData(3);

            // Trigger Resend email notification
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="max-w-2xl mx-auto mt-8 border-primary/20 bg-primary/5 text-slate-900">
                    <CardContent className="pt-8 pb-8 text-center space-y-4">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="h-20 w-20 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold font-headline tracking-tight">{t('success.title')}</h2>
                        <p className="text-slate-600 text-lg max-w-lg mx-auto">
                            {t('success.message', { name: formData.nombre, company: formData.empresa })}
                        </p>
                        <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                            {t('success.next_steps', { email: formData.email })}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto w-full">
            <Card className="border border-slate-200 shadow-xl overflow-hidden bg-white text-slate-900">
                <CardContent className="pt-8 pb-8 px-6 sm:px-10">
                    <div className="mb-10 flex items-center justify-between px-2">
                        <div className="flex space-x-2 w-full">
                            {[1, 2, 3].map((i) => (
                                <div 
                                    key={i} 
                                    className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                                        step >= i ? "bg-primary" : "bg-primary/20"
                                    }`} 
                                />
                            ))}
                        </div>
                    </div>
                    {errorMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm mb-6"
                        >
                            <AlertCircle className="h-4 w-4" />
                            <span>{errorMessage}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="relative min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {/* PASO 1 */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold tracking-tight mb-2">{t('step1.title')}</h3>
                                    <p className="text-slate-600 text-sm mb-6">{t('step1.subtitle')}</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="empresa">{t('step1.org_name')}</Label>
                                            <Input
                                                id="empresa"
                                                name="empresa"
                                                placeholder={t('step1.org_placeholder')}
                                                value={formData.empresa}
                                                onChange={handleInputChange}
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-primary h-12 text-lg md:text-lg autofill-light"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cantidadEmpleados">{t('step1.employees')}</Label>
                                            <Select
                                                name="cantidadEmpleados"
                                                value={formData.cantidadEmpleados}
                                                onValueChange={(value) => handleSelectChange("cantidadEmpleados", value)}
                                            >
                                                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus:ring-primary focus-visible:ring-primary h-12 text-lg md:text-lg">
                                                    <SelectValue placeholder={t('step1.employees_placeholder')} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                                    {employeeRanges.map((range) => (
                                                        <SelectItem key={range.value} value={range.value}>
                                                            {range.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="facturacion">{t('revenue.label')}</Label>
                                            <Select
                                                name="facturacion"
                                                value={formData.facturacion}
                                                onValueChange={(value) => handleSelectChange("facturacion", value)}
                                            >
                                                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus:ring-primary focus-visible:ring-primary h-12 text-lg md:text-lg">
                                                    <SelectValue placeholder={t('revenue.placeholder')} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                                    {revenueRanges.map((range) => (
                                                        <SelectItem key={range.value} value={range.value}>
                                                            {range.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <Button type="button" onClick={nextStep} size="lg" className="group">
                                            {t('common.next')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO 2 */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold tracking-tight mb-2">{t('step2.title')}</h3>
                                    <p className="text-slate-600 text-sm mb-6">{t('step2.subtitle')}</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ecosistema">{t('step2.ecosystem')}</Label>
                                            <Select
                                                name="ecosistema"
                                                value={formData.ecosistema}
                                                onValueChange={(value) => handleSelectChange("ecosistema", value)}
                                            >
                                                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus:ring-primary focus-visible:ring-primary h-12 text-lg md:text-lg">
                                                    <SelectValue placeholder={t('step2.ecosystem_placeholder')} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                                    {ecosystemOptions.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.label}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="desafio">{t('step2.friction')}</Label>
                                            <Textarea
                                                id="desafio"
                                                name="desafio"
                                                placeholder={t('step2.friction_placeholder')}
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-primary min-h-[120px] resize-none text-lg md:text-lg p-4 autofill-light"
                                                value={formData.desafio}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-between">
                                        <Button type="button" variant="ghost" onClick={prevStep} size="lg">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back')}
                                        </Button>
                                        <Button type="button" onClick={nextStep} size="lg" className="group">
                                            {t('common.define_contact')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* PASO 3 */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold tracking-tight mb-2">{t('step3.title')}</h3>
                                    <p className="text-slate-600 text-sm mb-6">{t('step3.subtitle')}</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">{t('step3.full_name')}</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder={t('step3.full_name_placeholder')}
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-primary h-12 text-lg md:text-lg autofill-light"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cargo">{t('step3.role')}</Label>
                                            <Input
                                                id="cargo"
                                                name="cargo"
                                                placeholder={t('step3.role_placeholder')}
                                                value={formData.cargo}
                                                onChange={handleInputChange}
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-primary h-12 text-lg md:text-lg autofill-light"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t('step3.email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder={t('step3.email_placeholder')}
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-primary h-12 text-lg md:text-lg autofill-light"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-between">
                                        <Button type="button" variant="ghost" onClick={prevStep} size="lg">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back')}
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            size="lg" 
                                            disabled={status === "loading"}
                                            className="w-[200px]"
                                        >
                                            {status === "loading" ? t('step3.processing') : t('step3.submit')}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
