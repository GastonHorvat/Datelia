"use client";
import { useState, FormEvent } from "react";
import { Header } from "@/components/landing/header";
import Image from "next/image";
import { Layout } from "@/components/layout";

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
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prevFormData) => {
      const currentValues = prevFormData[name as keyof typeof prevFormData] as string[];
      if (checked) {
        return { ...prevFormData, [name]: [...currentValues, value] };
      } else {
        return {
          ...prevFormData,
          [name]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };  

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      nombre: "",
      email: "",
      telefono: "",
      sector: "",
      mensaje: "",
    };

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es requerido.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido.";
      valid = false;
    } else if (!/S+@S+.S+/.test(formData.email)) {
      newErrors.email = "El formato del correo electrónico no es válido.";
      valid = false;
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido.";
      valid = false;
    }

    if (formData.sector.length === 0) {
      newErrors.sector = "Selecciona al menos un sector.";
      valid = false;
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSubmitStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("submitted");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
 <Layout>
      <main className="relative flex flex-grow items-center justify-center py-20">
        <Image
          src="/images/background-ia.jpg" // Replace with your actual image path
 alt="AI and Technology Background" fill style={{ objectFit: 'cover' }} quality={100} className="z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Hablemos de tu próxima solución Inteligente
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Diseñamos soluciones adaptadas para optimizar procesos, eliminar
            tareas repetitivas y potenciar la toma de decisiones estratégicas,
            impulsando la eficiencia operativa y el crecimiento empresarial.
          </p>

          {/* Form Container */}
          <div className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            {/* Form implementation will go here */}
            {submitStatus === "submitted" ? (
              <div className="text-center text-green-600 font-semibold">
                <p>
                  ¡Gracias por tu mensaje! Nos pondremos en contacto contigo a
                  la brevedad.
                </p>
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-center text-red-600 font-semibold">
                <p>
                  Hubo un error al enviar tu mensaje. Por favor, inténtalo de
                  nuevo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                 <div className="mb-4">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Tu nombre completo aquí*
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ingresa tu nombre completo"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Tu correo electrónico aquí*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingresa tu correo electrónico"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                    Teléfono*
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="Déjanos tus datos"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.telefono ? "border-red-500" : ""}`}
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    placeholder="Escribí el nombre y web de la empresa"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.empresa}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Sector Checkboxes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector*
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-real-estate"
                        name="sector"
                        value="real estate"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes("real estate")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-real-estate" className="ml-2">
                        real estate
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-educacion"
                        name="sector"
                        value="educación"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes("educación")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-educacion" className="ml-2">
                        educación
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-retail"
                        name="sector"
                        value="retail"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes("retail")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-retail" className="ml-2">
                        retail
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-salud"
                        name="sector"
                        value="salud"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes("salud")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-salud" className="ml-2">
                        salud
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-logistica"
                        name="sector"
                        value="logística / operaciones"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes(
                          "logística / operaciones"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-logistica" className="ml-2">
                        logística / operaciones
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sector-otro"
                        name="sector"
                        value="Otro"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.sector.includes("Otro")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="sector-otro" className="ml-2">
                        Otro
                      </label>
                    </div>
                  </div>
                  {errors.sector && (
                    <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
                  )}
                </div>

                {/* Mensaje Textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tu mensaje aquí*
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={6}
                    placeholder="Escribí tu mensaje aquí"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                      errors.mensaje ? "border-red-500" : ""
                    }`}
                    value={formData.mensaje}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>
                  )}
                </div>

                {/* Cómo nos encontraste Checkboxes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cómo llegaste a nosotros
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="how-recommended"
                        name="howFound"
                        value="Nos recomendaron"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.howFound.includes("Nos recomendaron")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="how-recommended" className="ml-2">
                        Nos recomendaron
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="how-linkedin"
                        name="howFound"
                        value="Linkedin"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.howFound.includes("Linkedin")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="how-linkedin" className="ml-2">
                        Linkedin
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="how-otro"
                        name="howFound"
                        value="Otro"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData.howFound.includes("Otro")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="how-otro" className="ml-2">
                        Otro
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={submitStatus === "submitting"}
                  >
                    {submitStatus === "submitting" ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
 </Layout>
  );
}