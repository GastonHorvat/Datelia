# Auditoría de diseño visual — Datelia (2026-10-16)

Inspección en vivo (navegador, servidor local, desktop 1440px) de home, soluciones (overview + rendición de gastos), casos (overview + CEDSA), sobre-nosotros y contacto. Complementada con lectura de código para los puntos que la pantalla sola no prueba (contraste exacto, `prefers-reduced-motion`, componentes huérfanos). El pase de viewport mobile no dio resultados confiables por una limitación de la herramienta de resize en este entorno — no hay hallazgos mobile-específicos en este informe; el código de navegación responsive (`Sheet` + `md:hidden` en `header.tsx`) se revisó por lectura y está implementado correctamente.

## Resumen ejecutivo

1. **El botón primario de todo el sitio falla contraste WCAG AA.** `--primary` en `globals.css` (hsl 201 69% 51%, ≈ `#2d99db`) con texto blanco da **2.94:1** — contra el mínimo de 4.5:1 para texto normal. Afecta el botón "Agendar diagnóstico" en el nav, el hero, el CTA de soluciones, el footer y "Enviar" del formulario: es decir, la única acción que el sitio quiere que hagas, en todas partes.
2. **El carrusel de logos de integraciones ignora `prefers-reduced-motion`.** Es la única animación infinita del sitio y la única que no respeta la preferencia de sistema — viola WCAG 2.2.2.
3. **El wordmark del logo de CEDSA es casi ilegible sobre fondo claro** (`/images/logos/cedsa.png`) — es un problema del archivo de imagen, no de CSS.
4. **No hay componentes huérfanos.** Se revisaron `landing/`, `solutions/`, `case-studies/`, `contact/`, `email/` — todo lo que existe se usa. El rediseño de octubre dejó el código limpio.
5. **No se encontraron secciones faltantes respecto al mapa de `docs/WEB.md`** — las 4 soluciones, los 3 casos, "Cómo trabajamos", "Sobre Nosotros", Blog y Contacto están todos presentes y en el orden esperado.
6. La entrada animada del hero tarda **~0.95s en asentarse del todo** (6 elementos con delays escalonados de hasta 0.45s) — más coreografía de la que un sitio "confirmá que hiciste bien en venir" necesita.
7. El formulario de contacto tiene labels bien asociados (`htmlFor`/`id`), pero **el mensaje de error no está vinculado al campo** (`aria-describedby`/`aria-invalid` ausentes) y no hay foco automático al primer campo con error.
8. Paleta, tipografía (sans-serif consistente, sin serif gratuito) y densidad visual están bien resueltas y son consistentes página a página — nada que corregir ahí.
9. El resto del movimiento del sitio (secciones scroll-triggered, hover states) está bien implementado: usa `whileInView` + `viewport={{once:true}}` correctamente y no repite animaciones al re-scrollear.

## Hallazgos de contraste

| Elemento | Archivo | Contraste medido | Umbral WCAG AA | Estado |
|---|---|---|---|---|
| Botón "Agendar diagnóstico" (nav) | `src/app/globals.css:13-14` (`--primary`/`--primary-foreground`) | 2.94:1 | 4.5:1 (texto normal) | **Falla** |
| Botón "Agendá un diagnóstico sin costo" (hero) | mismo token | 2.94:1 | 4.5:1 | **Falla** |
| Botón "Agendar en Calendly" / "Enviar" (contacto) | mismo token | 2.94:1 | 4.5:1 | **Falla** |
| H1 hero, subtítulo, "Ver casos reales" | — | 17.95:1 / 7.43:1 / 17.95:1 | 4.5:1 | OK (verificado, no es el problema que parece a simple vista en una captura comprimida) |
| Botón oscuro dentro de la franja CTA azul ("¿Qué tarea...") | — | 4.94:1 | 4.5:1 | OK — variante bien resuelta, usalo como referencia |
| Wordmark "CEDSA" en el logo | `/images/logos/cedsa.png` (asset, no CSS) | Ilegible a simple vista sobre fondo blanco | — | **Falla** (ver sección de consistencia) |

**Causa raíz del hallazgo #1:** `src/app/globals.css` define `--primary: 201 69% 51%` con un comentario que dice *"White for better contrast on blue"* — la intención era correcta, el valor no alcanza. Oscurecer `--primary` a aproximadamente **201 69% 40-42%** debería llevar el contraste con blanco a 4.5:1+ sin cambiar el tono de marca. Es un cambio de una línea que arregla el botón en todo el sitio a la vez, porque todos usan el mismo token vía `buttonVariants.default` (`bg-primary text-primary-foreground`, `src/components/ui/button.tsx:13`).

## Hallazgos de movimiento y animación

Auditoría completa (3 lentes, demo-cards) en `motion-audits/datelia-2026-10-16.html` — generada con la skill `design-motion-principles` en modo audit, ponderando Jakub Krehel como lente primario (pulido de producción) y Emil Kowalski como secundario (restricción), por tratarse de un sitio de marketing B2B en producción, no una herramienta ni un portfolio creativo.

- **Critical:** el carrusel infinito de logos (`erp-integration-section.tsx:52-59`, loop de 35s) no verifica `useReducedMotion()` — es la única animación continua del sitio y la única sin ese guard, mientras que hero, CTA, problems-section y el template de soluciones sí lo tienen correctamente conectado.
- **Important:** la entrada del hero (`hero-section.tsx:31-117`) escalona 6 elementos con delays de 0 a 0.45s + 0.5s de duración cada uno — el último elemento del collage recién se asienta a los ~0.95s. Para una página cuyo objetivo declarado es confirmar en menos de un minuto que vale la pena quedarse, es más coreografía de la necesaria.
- **Lo que ya está bien:** `problems-section.tsx`, `erp-integration-section.tsx` (el título) y `cta-section.tsx` usan `whileInView` + `viewport={{once:true}}` — no repiten la animación al re-scrollear. No hay abuso de `hover:scale` en el sitio (solo en cards de blog e íconos de compartir, donde corresponde). No hay pulsos de atención en ningún lado.

## Secciones faltantes o sobrantes

- **Nada falta.** El mapa vigente de `docs/WEB.md` (Inicio, Soluciones ×4, Casos ×3, Cómo trabajamos, Nosotros, Blog, Contacto) está completo y en orden en el sitio real.
- **Nada sobra.** No hay componentes `landing/`, `solutions/`, `case-studies/`, `contact/` o `email/` sin usar — verificado por grep cruzado contra todos los imports de `src/app` y `src/components`. El rediseño de octubre no dejó código muerto.
- **Posible hueco de contenido, no de código:** no hay ninguna sección en el sitio que muestre precio o alcance de la oferta comercial (esto ya estaba señalado en el backlog de la auditoría de visibilidad — se confirma que sigue así al día de hoy).

## Consistencia visual

- **Color:** un solo acento (`--primary`, el azul de marca) usado consistentemente en todo el sitio — correcto. El problema no es inconsistencia, es que el valor exacto del acento falla contraste con texto blanco (ver arriba).
- **Tipografía:** sans-serif en todo el sitio, sin reaches a serif decorativo — correcto para un sitio de PyME, no de agencia creativa.
- **Forma:** radios de borde consistentes entre cards, botones e inputs — no se detectó mezcla de escalas.
- **Densidad:** apropiadamente restringida para un sitio B2B trust-first — ni vacío ni sobrecargado.
- **Logo de CEDSA:** el único activo visual con un problema real — el wordmark "CEDSA" dentro del archivo de imagen está en un gris muy claro, casi invisible sobre el fondo blanco de la página de caso y la card de "Casos reales". No es arreglable por CSS porque el texto es parte del archivo PNG, no HTML. Opciones: pedir una versión del logo con el texto en un tono más oscuro, o no depender del wordmark embebido y agregar "CEDSA" como texto real de la página al lado del ícono (ya se hace así en la card de `/casos`, pero no en la página individual del caso).

## Accesibilidad rápida

- Labels del formulario de contacto correctamente asociados vía `htmlFor`/`id` (`contact-form.tsx:103,113,123,133`) — correcto.
- El mensaje de error del formulario se muestra en un bloque genérico arriba del formulario, no vinculado a un campo específico (`aria-describedby`, `aria-invalid` ausentes) y sin foco automático al primer campo inválido.
- Jerarquía de headings: un solo `<h1>` por página en las páginas revisadas, sin saltos (h1→h2→h3) irregulares.
- `useReducedMotion()` presente en 4 de 5 componentes animados — la excepción es el carrusel de logos (ver sección de movimiento).

## Priorización final

**Quick wins (horas, no días):**
1. Oscurecer `--primary` en `globals.css` (una línea, arregla el botón en todo el sitio).
2. Envolver el carrusel de logos en `useReducedMotion()`.
3. Recortar los delays de la entrada del hero (0-450ms → 0-250ms).
4. Vincular el mensaje de error del formulario al campo con `aria-describedby`/`aria-invalid`.

**Trabajo más grande (días):**
5. Conseguir o rehacer el logo de CEDSA con mejor contraste en el wordmark (depende del cliente, no es un cambio de código).
6. Definir y publicar una sección de alcance/precio de la oferta comercial (ya señalado en el backlog de visibilidad, se confirma vigente).
7. Si en algún momento se customiza el acordeón de FAQ, mantenerlo en los ~200ms que ya trae Radix por default — no es un problema hoy, solo una guía a futuro.
