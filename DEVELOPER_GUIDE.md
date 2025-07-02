# Documentación Técnica del Proyecto Datelia

**Versión:** 1.0
**Fecha de última actualización:** 30 de junio de 2025

## 1. Resumen del Proyecto

Este documento detalla la arquitectura técnica, la pila tecnológica y los flujos de trabajo del sitio web de Datelia (`datelia.com.ar`). El propósito del sitio es actuar como la principal herramienta de marketing y captación de leads, mostrando los servicios de la empresa, probando su experiencia a través de casos de éxito y un blog de contenido, y facilitando el contacto.

El proyecto está diseñado bajo una arquitectura **"Headless"**, donde el contenido del blog se gestiona desde una base de datos central (Supabase) y se consume desde este sitio (y potencialmente otros, como `AutomationAI`).

---

## 2. Pila Tecnológica (Tech Stack)

#### **Framework Principal**
*   **Next.js (v14+) con App Router:** Framework de React para producción, utilizado por sus capacidades de renderizado en el servidor (SSR), componentes de servidor, generación de sitios estáticos (SSG), y optimización de rendimiento.

#### **Lenguaje**
*   **TypeScript:** Utilizado en todo el proyecto para garantizar un código robusto, escalable y con tipado seguro.

#### **Estilo y UI**
*   **Tailwind CSS:** Framework de CSS "utility-first" para un diseño rápido y consistente.
*   **shadcn/ui:** Colección de componentes de UI reutilizables (Button, Card, Badge, etc.) construidos sobre Tailwind CSS y Radix UI, que sirven como base de nuestro sistema de diseño.
*   **`@tailwindcss/typography` (`prose`):** Plugin para estilizar automáticamente bloques de texto largos (como posts de blog y páginas legales) con una tipografía hermosa y legible.
*   **lucide-react:** Librería de iconos SVG, utilizada por su diseño limpio y consistencia.

#### **Base de Datos y Backend**
*   **Supabase:** Plataforma "Backend as a Service" (BaaS) que provee:
    *   **Base de Datos PostgreSQL:** Para almacenar todos los posts del blog.
    *   **Storage:** Para alojar las imágenes de los posts.
    *   **APIs automáticas:** Para interactuar con la base de datos.
*   **`@supabase/supabase-js`:** La librería cliente oficial para interactuar con Supabase desde el código.

#### **Servicios de Terceros**
*   **Resend:** Servicio de API para el envío de emails transaccionales. Se utiliza para enviar los datos del formulario de contacto a `info@datelia.tech`.
*   **`html-react-parser`:** Librería para "limpiar" y renderizar de forma segura el contenido HTML de los posts del blog.

#### **Hosting y Despliegue (CI/CD)**
*   **Vercel:** Plataforma de hosting optimizada para Next.js.
*   **GitHub:** Repositorio de código fuente (`GastonHorvat/Datelia`).
*   **Flujo:** El despliegue es automático. Cada `push` a la rama `main` en GitHub activa un "webhook" que le ordena a Vercel construir y desplegar la nueva versión del sitio.

---

## 3. Estructura del Proyecto (Análisis Detallado)

La estructura sigue las convenciones del App Router de Next.js.
├── public/
│ └── images/
│ ├── logo.png
│ └── ... (otras imágenes estáticas)
├── src/
│ ├── app/
│ │ ├── api/contact/route.tsx # Backend del formulario de contacto
│ │ ├── blog/
│ │ │ ├── page.tsx # Página principal del blog
│ │ │ └── [slug]/page.tsx # Plantilla para un post individual
│ │ ├── casos-de-exito/
│ │ │ ├── page.tsx
│ │ │ └── [slug]/page.tsx
│ │ ├── contacto/page.tsx
│ │ ├── politica-de-privacidad/page.tsx
│ │ ├── sobre-nosotros/page.tsx
│ │ └── ... (otras páginas)
│ │ ├── layout.tsx # Layout principal que envuelve todo el sitio
│ │ ├── globals.css # Estilos CSS globales
│ │ └── not-found.tsx # Página 404 personalizada con Tetris
│ ├── components/
│ │ ├── blog/ # Componentes específicos del blog (tarjetas)
│ │ │ ├── BlogPostCard.tsx
│ │ │ └── FeaturedPostCard.tsx
│ │ ├── emails/ # Plantillas de email en React
│ │ │ └── ContactEmailTemplate.tsx
│ │ ├── landing/ # Componentes de la página de inicio
│ │ │ ├── header.tsx
│ │ │ └── footer.tsx
│ │ └── ui/ # Componentes base de shadcn/ui
│ │ ├── button.tsx
│ │ └── card.tsx
│ ├── lib/
│ │ ├── supabaseClient.ts # Inicialización del cliente de Supabase
│ │ └── utils.ts # Funciones de utilidad (cn, parseAndCleanHtml)
│ └── types/
│ └── blog.ts # Definición de tipos de TypeScript para el blog
├── .env.local # Variables de entorno (NO se sube a Git)
├── next.config.js # Configuración de Next.js (importante para imágenes)
└── tailwind.config.ts # Configuración de Tailwind CSS

---

## 4. Flujos de Trabajo Clave

### 4.1. Flujo de Contenido del Blog

1.  **Fuente:** El contenido reside en la tabla `posts` de la base de datos de Supabase. Se utiliza una `VIEW` (`posts_view`) para unir datos de tablas relacionadas (como `categories`) y simplificar las consultas.
2.  **Petición:** Una página (ej. `/blog` o `/blog/[slug]`) llama a una función `async` `getPosts()` o `getPostBySlug()`.
3.  **Ejecución en Servidor:** Al ser un Server Component, esta función se ejecuta en el servidor de Vercel.
4.  **Consulta:** Usa el cliente de Supabase (`/lib/supabaseClient.ts`) para hacer una petición a la base de datos.
5.  **Renderizado:** La página espera la respuesta de la base de datos y luego renderiza el HTML con los datos obtenidos. El HTML se envía ya completo al navegador, resultando en una carga muy rápida y un excelente SEO.
6.  **Contenido HTML:** El contenido de un post se guarda en formato HTML en la base de datos. Se utiliza la librería `html-react-parser` junto con la función de utilidad `parseAndCleanHtml` en `utils.ts` para limpiar y renderizar este HTML de forma segura en la página del post.

### 4.2. Flujo del Formulario de Contacto

1.  **Frontend:** La página `/contacto` contiene un formulario de React con validación en el lado del cliente para asegurar que los campos requeridos estén completos.
2.  **Petición API:** Al hacer "submit", el formulario envía una petición `POST` al endpoint de la API interna: `/api/contact`.
3.  **Backend (API Route):** El archivo `src/app/api/contact/route.tsx` recibe esta petición.
4.  **Envío de Email:** La API Route utiliza la librería `Resend` para construir y enviar un email con los datos del formulario a `info@datelia.tech`. La plantilla del email es un componente de React (`ContactEmailTemplate.tsx`).
5.  **Respuesta:** La API Route devuelve una respuesta de éxito (200) o error (500) al frontend, que muestra el mensaje correspondiente al usuario.

---

## 5. Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz para funcionar. **Este archivo es secreto y NUNCA debe subirse a GitHub.**

Credenciales para conectar con Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
Credencial para el envío de emails con Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
Generated code
**Importante:** Estas mismas variables deben ser configuradas en el dashboard de Vercel (en "Settings" > "Environment Variables") para que el sitio funcione en producción.

---

## 6. Guía de Mantenimiento

### Cómo Añadir un Nuevo Post al Blog

1.  Ve al dashboard de Supabase.
2.  Navega a la tabla `posts`.
3.  Haz clic en "Insert" > "Insert row".
4.  Rellena todos los campos. Asegúrate de que `status` esté como `Published` y la `published_at` sea una fecha actual o pasada. Marca `is_featured` si quieres que sea el post destacado.
5.  Guarda la fila. El sitio se actualizará automáticamente (puede tardar hasta una hora debido al `revalidate`, o puedes hacer un "redeploy" en Vercel para verlo al instante).

### Cómo Añadir un Nuevo Caso de Éxito

1.  Crea una nueva carpeta en `src/app/casos-de-exito/` con el slug deseado (ej. `nuevo-caso-cliente`).
2.  Dentro, crea un archivo `page.tsx`.
3.  Copia el contenido de otro caso de éxito como plantilla y actualiza el texto, las métricas y las imágenes.
4.  Añade una nueva entrada al array `caseStudies` en la página principal `src/app/casos-de-exito/page.tsx` para que aparezca en la galería.

---

## 7. Scripts Disponibles

Puedes ejecutar los siguientes scripts desde la raíz del proyecto:

*   `npm run dev`: Inicia el servidor de desarrollo con Next.js y Turbopack en el puerto 9002.
*   `npm run genkit:dev`: Inicia el entorno de desarrollo de Genkit AI para las funciones de IA.
*   `npm run genkit:watch`: Inicia el entorno de Genkit AI en modo "watch", reiniciándose automáticamente con los cambios.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run start`: Inicia el servidor de producción de la versión compilada.
*   `npm run lint`: Ejecuta el linter de Next.js para encontrar problemas en el código.
*   `npm run typecheck`: Verifica los tipos de TypeScript en todo el proyecto sin generar una compilación.