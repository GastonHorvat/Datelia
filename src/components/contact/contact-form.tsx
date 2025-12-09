"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Opciones para los checkboxes
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

const employeeRanges = [
    { value: "1-10", label: "1-10 empleados" },
    { value: "11-50", label: "11-50 empleados" },
    { value: "51-200", label: "51-200 empleados" },
    { value: "201-500", label: "201-500 empleados" },
    { value: "501-1000", label: "501-1000 empleados" },
    { value: "1000+", label: "Más de 1000 empleados" },
];

export function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        website: "",
        empresa: "",
        cantidadEmpleados: "",
        sector: [] as string[],
        mensaje: "",
        comoNosConociste: [] as string[],
        aceptaPoliticas: false,
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (group: "sector" | "comoNosConociste", value: string, checked: boolean) => {
        setFormData((prev) => {
            const currentList = prev[group];
            if (checked) {
                return { ...prev, [group]: [...currentList, value] };
            } else {
                return { ...prev, [group]: currentList.filter((item) => item !== value) };
            }
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        // Validación básica del lado del cliente
        if (!formData.aceptaPoliticas) {
            setStatus("error");
            setErrorMessage("Debes aceptar la política de privacidad para continuar.");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    nombre: "",
                    email: "",
                    telefono: "",
                    website: "",
                    empresa: "",
                    cantidadEmpleados: "",
                    sector: [],
                    mensaje: "",
                    comoNosConociste: [],
                    aceptaPoliticas: false,
                });
            } else {
                const data = await response.json();
                setStatus("error");
                setErrorMessage(data.error || "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Error de conexión. Por favor verifica tu internet e intenta nuevamente.");
        }
    };

    if (status === "success") {
        return (
            <Card className="max-w-2xl mx-auto mt-8 border-primary/20 bg-primary/5">
                <CardContent className="pt-6 text-center space-y-4">
                    <div className="flex justify-center">
                        <CheckCircle className="h-16 w-16 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">¡Mensaje Recibido!</h2>
                    <p className="text-muted-foreground">
                        Gracias por contactarnos, {formData.nombre}. Hemos recibido tu solicitud correctamente.
                        Nuestro equipo analizará tu caso y te contactará a la brevedad (usualmente en menos de 24 horas hábiles).
                    </p>
                    <Button onClick={() => setStatus("idle")} variant="outline" className="mt-4">
                        Enviar otro mensaje
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Cuéntanos sobre tu proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Datos Personales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre Completo *</Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Tu nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Corporativo *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nombre@empresa.com"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    placeholder="+54 9 11 ..."
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Sitio Web (Opcional)</Label>
                                <Input
                                    id="website"
                                    name="website"
                                    type="url"
                                    placeholder="https://tuempresa.com"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Datos de la Empresa */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="empresa">Nombre de la Empresa *</Label>
                                <Input
                                    id="empresa"
                                    name="empresa"
                                    placeholder="Tu Empresa S.A."
                                    required
                                    value={formData.empresa}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cantidadEmpleados">Cantidad de Empleados *</Label>
                                <Select
                                    name="cantidadEmpleados"
                                    value={formData.cantidadEmpleados}
                                    onValueChange={(value) => handleSelectChange("cantidadEmpleados", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rango" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employeeRanges.map((range) => (
                                            <SelectItem key={range.value} value={range.value}>
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Sector */}
                        <div className="space-y-3">
                            <Label>Sector de la Empresa (Selecciona los que apliquen)</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {sectors.map((sector) => (
                                    <div key={sector.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`sector-${sector.id}`}
                                            checked={formData.sector.includes(sector.label)}
                                            onCheckedChange={(checked) => handleCheckboxChange("sector", sector.label, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`sector-${sector.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {sector.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="space-y-2">
                            <Label htmlFor="mensaje">¿Cuál es tu principal desafío hoy? *</Label>
                            <Textarea
                                id="mensaje"
                                name="mensaje"
                                placeholder="Cuéntanos brevemente qué proceso te gustaría automatizar o mejorar..."
                                required
                                className="min-h-[120px]"
                                value={formData.mensaje}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Cómo nos conociste */}
                        <div className="space-y-3">
                            <Label>¿Cómo nos conociste?</Label>
                            <div className="flex flex-wrap gap-4">
                                {howFoundOptions.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`how-${option.id}`}
                                            checked={formData.comoNosConociste.includes(option.label)}
                                            onCheckedChange={(checked) => handleCheckboxChange("comoNosConociste", option.label, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`how-${option.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal y Submit */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="politicas"
                                    required
                                    checked={formData.aceptaPoliticas}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aceptaPoliticas: checked as boolean }))}
                                />
                                <label
                                    htmlFor="politicas"
                                    className="text-sm text-muted-foreground leading-tight"
                                >
                                    Acepto la <Link href="/politica-de-privacidad" className="text-primary hover:underline">Política de Privacidad</Link> y el procesamiento de mis datos para ser contactado.
                                </label>
                            </div>

                            {status === "error" && (
                                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
                                {status === "loading" ? "Enviando..." : "Solicitar Consultoría Gratuita"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
