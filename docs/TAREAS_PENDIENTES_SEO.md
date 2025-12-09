# Tareas Pendientes - SEO Críticas
**Fecha:** 9 de Diciembre, 2025  
**Estado:** En progreso - Requieren implementación manual

---

## 🔴 CRÍTICAS - Implementar AHORA

### 1. Actualizar Google Search Console en layout.tsx ✅ (HECHO pero archivo corrupto)

**Archivo:** `src/app/layout.tsx`  
**Línea:** 56

**Cambiar:**
```tsx
verification: {
  google: 'your-google-verification-code',
},
```

**Por:**
```tsx
verification: {
  google: 'ytpBBxLlyBINteEE8kcqhq8Z_floIVvKeJvTcdasUNQ',
},
```

---

### 2. Actualizar Schema.org con datos reales de Argentina ✅ (HECHO pero archivo corrupto)

**Archivo:** `src/app/layout.tsx`  
**Líneas:** 94-108

**Cambiar:**
```tsx
"sameAs": [
  "https://linkedin.com/company/datelia",
  "https://twitter.com/datelia"
],
"contactPoint": {
  "@type": "ContactPoint",
  "telephone": "+34-XXX-XXX-XXX",
  "contactType": "customer service",
  "areaServed": "ES",
  "availableLanguage": "Spanish"
},
"address": {
  "@type": "PostalAddress",
  "addressCountry": "ES"
},
```

**Por:**
```tsx
"sameAs": [
  "https://www.linkedin.com/company/datelia/"
],
"contactPoint": {
  "@type": "ContactPoint",
  "telephone": "+54-387-585-8088",
  "contactType": "customer service",
  "areaServed": "AR",
  "availableLanguage": ["Spanish", "English"]
},
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Buenos Aires",
  "addressCountry": "AR"
},
```

---

### 3. Ocultar iconos de redes sociales no activos ✅ (HECHO pero archivo corrupto)

**Archivo:** `src/components/landing/footer.tsx`  
**Líneas:** 16-22

**Cambiar:**
```tsx
const socialLinks = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/company/datelia/", icon: Linkedin },
  { name: 'Twitter', href: "#", icon: Twitter },
  { name: 'Instagram', href: "#", icon: Instagram },
  { name: 'Facebook', href: "#", icon: Facebook },
];
```

**Por:**
```tsx
// Solo LinkedIn activo - otras redes sociales comentadas hasta tener cuentas activas
const socialLinks = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/company/datelia/", icon: Linkedin },
  // { name: 'Twitter', href: "#", icon: Twitter }, // Descomentar cuando tengan cuenta
  // { name: 'Instagram', href: "#", icon: Instagram }, // Descomentar cuando tengan cuenta
  // { name: 'Facebook', href: "#", icon: Facebook }, // Descomentar cuando tengan cuenta
];
```

---

### 4. Generar Imágenes Open Graph ⏳ PENDIENTE

**Necesitas crear imágenes de 1200x630px para:**

```
/public/images/og/og-home.jpg
/public/images/og/og-chatbots.jpg
/public/images/og/og-casos-exito.jpg
/public/images/og/og-agentes-voz.jpg
/public/images/og/og-soluciones.jpg
/public/images/og/og-sobre-nosotros.jpg
/public/images/og/og-contacto.jpg
```

**Contenido recomendado para cada imagen:**
- **og-home.jpg:** Logo de Datelia + texto "Soluciones de IA para Empresas"
- **og-chatbots.jpg:** Icono de chatbot + texto "Chatbots Inteligentes 24/7"
- **og-casos-exito.jpg:** Gráficas con métricas (+35%, -40%, etc.)
- **og-agentes-voz.jpg:** Icono de teléfono/voice + texto "Agentes de Voz con IA"
- **og-soluciones.jpg:** Grid de iconos de servicios
- **og-sobre-nosotros.jpg:** Fotos del equipo o logo profesional
- **og-contacto.jpg:** Iconos de contact + calendly

**Puedes generar con:**
- Canva Pro (recomendado)
- Figma
- IA (DALL-E, Midjourney)
- Herramientas online: og-image.vercel.app

---

### 5. Agregar Metadata a Páginas Faltantes ⏳ PENDIENTE

#### A. Página de Soluciones (`src/app/soluciones/page.tsx`)

Agregar al inicio del archivo:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluciones de IA y Automatización | Chatbots y Agentes de Voz | Datelia',
  description: 'Descubre nuestras soluciones de IA: chatbots inteligentes, agentes de voz y automatización a medida. Optimiza procesos y aumenta tu ROI hasta 40%.',
  keywords: 'soluciones IA, chatbots empresariales, agentes de voz, automatización empresarial, IA a medida',
  openGraph: {
    title: 'Soluciones de IA y Automatización | Datelia',
    description: 'Chatbots 24/7, agentes de voz y automatización a medida para empresas.',
    url: 'https://datelia.tech/soluciones',
    type: 'website',
    images: [
      {
        url: '/images/og/og-soluciones.jpg',
        width: 1200,
        height: 630,
        alt: 'Soluciones de IA - Chatbots, Agentes de Voz y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluciones de IA y Automatización | Datelia',
    description: 'Chatbots, agentes de voz y automatización empresarial',
    images: ['/images/og/og-soluciones.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech/soluciones',
  },
};
```

#### B. Página Agentes de Voz (`src/app/soluciones/agentes-de-voz/page.tsx`)

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentes de Voz con IA | Automatización de Llamadas | Datelia',
  description: 'Automatiza agendamiento de citas y gestión telefónica con agentes de voz IA. Reduce no-shows hasta 40% y libera tiempo de tu equipo.',
  keywords: 'agentes de voz IA, automatización llamadas, IVR inteligente, agendamiento automático, bot telefónico',
  openGraph: {
    title: 'Agentes de Voz con IA | Datelia',
    description: 'Automatiza llamadas y reduce no-shows hasta 40% con agentes de voz inteligentes.',
    url: 'https://datelia.tech/soluciones/agentes-de-voz',
    type: 'website',
    images: [
      {
        url: '/images/og/og-agentes-voz.jpg',
        width: 1200,
        height: 630,
        alt: 'Agentes de Voz con IA - Automatización de Llamadas Telefónicas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de Voz con IA | Datelia',
    description: 'Automatiza llamadas y reduce no-shows hasta 40%',
    images: ['/images/og/og-agentes-voz.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech/soluciones/agentes-de-voz',
  },
};
```

#### C. Página Sobre Nosotros (`src/app/sobre-nosotros/page.tsx`)

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Equipo Experto en IA | Datelia',
  description: 'Conoce al equipo de expertos en IA detrás de Datelia. Jimena García Pinto y Gastón M. Horvat lideran soluciones que transforman negocios.',
  keywords: 'equipo Datelia, expertos IA Argentina, fundadores Datelia, empresa IA Buenos Aires',
  openGraph: {
    title: 'Sobre Nosotros | Datelia',
    description: 'Conoce al equipo experto detrás de las soluciones de IA que transforman negocios.',
    url: 'https://datelia.tech/sobre-nosotros',
    type: 'website',
    images: [
      {
        url: '/images/og/og-sobre-nosotros.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo de Datelia - Expertos en IA y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | Datelia',
    description: 'Conoce al equipo experto en IA',
    images: ['/images/og/og-sobre-nosotros.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech/sobre-nosotros',
  },
};
```

**NOTA:** Recuerda ELIMINAR cualquier uso de `<Head>` del componente JSX, ya que ahora usas export metadata.

---

### 6. Contacto page - Remover Head deprecado ⏳ PENDIENTE

**Archivo:** `src/app/contacto/page.tsx`

1. Agregar import:
```tsx
import { Metadata } from 'next';
```

2. ELIMINAR el import de Head:
```tsx
import Head from 'next/head'; // ❌ ELIMINAR esta línea
```

3. Agregar metadata ANTES del componente:
```tsx
export const metadata: Metadata = {
  title: 'Contacto | Agenda tu Consultoría Gratuita | Datelia',
  description: 'Contáctanos para una consultoría gratuita en IA y automatización. Descubre cómo podemos optimizar tus procesos y aumentar tu ROI.',
  keywords: 'contacto Datelia, consultoría IA gratuita, agendar demo, contacto automatización',
  openGraph: {
    title: 'Contacto | Datelia',
    description: 'Agenda una consultoría gratuita y descubre cómo la IA puede transformar tu negocio.',
    url: 'https://datelia.tech/contacto',
    type: 'website',
    images: [
      {
        url: '/images/og/og-contacto.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto Datelia - Consultoría Gratuita en IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Datelia',
    description: 'Agenda una consultoría gratuita',
    images: ['/images/og/og-contacto.jpg'],
  },
  alternates: {
    canonical: 'https://datelia.tech/contacto',
  },
};
```

4. ELIMINAR del JSX (líneas 128-131):
```tsx
<Head>  {/* ❌ ELIMINAR TODO ESTE BLOQUE */}
  <title>Contacto | Hablemos de tu Próxima Solución Inteligente</title>
  <meta name="description" content="Contacta a Datelia para diseñar una solución de IA adaptada a tus procesos, impulsando la eficiencia y el crecimiento empresarial." />
</Head>
```

---

## 🟡 MEDIA PRIORIDAD

### 7. Actualizar el documento de auditoría SEO ⏳ PENDIENTE

Marcar como completadas las tareas 1-3 en `docs/SEO_AUDIT_2025.md`

---

### 8. Auditar estructura H1-H6 ⏳ PENDIENTE

**Páginas a auditar:**
- `src/app/page.tsx` (Home)
- `src/components/landing/hero-section.tsx`
- `src/app/soluciones/page.tsx`
- `src/app/sobre-nosotros/page.tsx`

**Reglas:**
- Solo UN `<h1>` por página
- Jerarquía correcta: H1 → H2 → H3 (no saltar niveles)
- Keywords principales en H1

---

## 📋 Checklist Rápido

```
[✅] Metadata Home page
[✅] Metadata Chatbots page
[✅] Metadata Casos de Éxito
[⏳] Google Search Console verification (archivo corrupto - rehacer)  
[⏳] Schema.org datos reales (archivo corrupto - rehacer)
[⏳] Footer social links (archivo corrupto - rehacer)
[⏳] Imágenes Open Graph (pendiente genera)
[⏳] Metadata Soluciones page
[⏳] Metadata Agentes de Voz page
[⏳] Metadata Sobre Nosotros page
[⏳] Metadata Contacto page (remover Head)
[⏳] Auditar H1-H6 todas las páginas
```

---

## 🚀 Próximos Pasos Recomendados

1. **Restaurar archivos corruptos:**
   ```bash
   git checkout src/app/layout.tsx src/components/landing/footer.tsx
   ```

2. **Aplicar cambios manualmente** usando este documento

3. **Generar imágenes OG** (puede ser en batch con IA)

4. **Testear:**
   - https://cards-dev.twitter.com/validator
   - https://developers.facebook.com/tools/debug/
   - Google Rich Results Test

5. **Verificar en Google Search Console** después de deploy

---

**Documento creado:** 9 de Diciembre, 2025  
**Última actualización:** 9 de Diciembre, 2025
