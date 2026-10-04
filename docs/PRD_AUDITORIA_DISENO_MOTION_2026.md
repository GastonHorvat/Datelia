# PRD: Auditoría de Diseño y Motion — Datelia

**Fecha:** 2026-10-04
**Alcance:** Sitio público (`src/app/[locale]/...`, `src/components/landing|blog|case-studies|contact|ui`)
**Metodología:** Lectura de código (no visual/browser) contra dos skills instaladas:
- [`design-taste-frontend`](https://github.com/Leonxlnx/taste-skill) (Leonxlnx) — disciplina anti-slop para landing/portfolio
- [`design-motion-principles`](https://github.com/kylezantos/design-motion-principles) (kylezantos) — auditoría de motion por tres lentes de diseñador

**Estado:** Solo diagnóstico. Ningún archivo de código fue modificado.

---

## 1. Resumen ejecutivo

El sitio tiene una base técnica sólida (Next.js 15, tokens de shadcn, i18n, Supabase) pero el **home y las páginas de soluciones comparten literalmente el mismo patrón de motion en las 8-10 secciones** (fade + slide-up con delay escalonado), lo que es exactamente el "AI-slop" que las skills instaladas existen para detectar. Además:

- **Cero manejo de `prefers-reduced-motion`** en todo el repo (hallazgo Crítico, no opcional).
- El hero combina 4 animaciones ambientales simultáneas e infinitas (zoom de fondo, 2 blobs flotantes, 80 estrellas parpadeando, 3 "cometas") sin forma de pausarlas — carga de GPU y riesgo de accesibilidad vestibular.
- **7 componentes de landing están completamente muertos** (nunca importados en ninguna página), uno de ellos con logos de clientes falsos (`placehold.co`). Son candidatos directos a `rm`.
- El sistema de tokens de color está invertido y confunde: `:root` (el estado por defecto, sin clase `.dark`) pinta el tema **oscuro**; la clase `.dark` pinta el tema **claro**. Nadie la activa nunca, pero el nombre es una trampa para el próximo cambio.
- Varias secciones ignoran los tokens (`bg-accent`, `bg-card`) y hardcodean `slate-`/`zinc-`/`blue-500`, rompiendo el "Color Consistency Lock" que exige la skill de taste.

Ninguno de estos hallazgos es una reescritura grande. El 80% del valor está en: (1) accesibilidad de motion, (2) borrar código muerto, (3) diferenciar el ritmo de entrada entre secciones, (4) unificar tokens de color/hover.

---

## 2. Contexto y ponderación aplicada

Según la tabla Context-to-Perspective de `design-motion-principles`, un sitio de marketing/landing pondera:

- **Primario: Jakub Krehel** (pulido de producción, sutileza) — aplica a las 8 secciones del home
- **Secundario: Jhey Tompkins** (experimentación creativa) — aplica al 404 con Tetris (bien logrado, ver §4)
- **Selectivo: Emil Kowalski** (restricción, velocidad) — aplica al wizard de contacto y la navegación

Esta ponderación se usó para todos los hallazgos de motion abajo.

---

## 3. Qué está funcionando bien (no tocar sin razón)

1. **`contact-form.tsx`** — el wizard de 3 pasos usa `AnimatePresence mode="wait"` con slide direccional (0.3s) correctamente: es el mejor ejemplo de motion con propósito del repo (feedback de navegación, no decoración). Fuera del alcance de `design-taste-frontend` (sección 13: "multi-step forms" está explícitamente fuera de su alcance), pero dentro del de motion y ahí aprueba.
2. **`not-found.tsx`** (Tetris) — motion rara (404 es baja frecuencia), interactiva y con propósito lúdico. Encaja perfecto con el lente de Jhey. No requiere `prefers-reduced-motion` del mismo modo que la decoración ambiental porque es gameplay opt-in, pero sí conviene un mensaje/alternativa estática para quien tenga `reduce` activado (ver F-12).
3. **Token de shadcn vía CSS variables** (`tailwind.config.ts` + `globals.css`) — la arquitectura es correcta (un solo lugar para re-tematizar); el problema no es la arquitectura, es que no todos los componentes la usan (ver F-07).
4. **`erp-integration-section.tsx`** — marquee infinito de logos reales (no placeholders), con gradientes de desvanecido en los bordes. Patrón correcto y con un solo marquee en el home (cumple "marquee max uno por página" de la taste skill).
5. **i18n** — la mayoría de componentes usa `next-intl` correctamente (excepción documentada en F-09).

---

## 4. Hallazgos — Motion (`design-motion-principles`)

### 🔴 Crítico

**M-01. Cero soporte de `prefers-reduced-motion` en todo el repo.**
No hay ni un `useReducedMotion()`, ni un `@media (prefers-reduced-motion: reduce)` en `globals.css`, ni condicional alguno. Esto es mandatorio en ambas skills instaladas ("not optional"). Afecta a los ~12 archivos que usan `framer-motion`.
*Fix:* agregar el bloque CSS global (colapsa toda animación a 0.01ms sin romper el layout) + envolver las animaciones ambientales infinitas (hero, starfield) con `useReducedMotion()` para no montarlas directamente en vez de solo acortarlas.

**M-02. Hero con 4 capas de motion ambiental infinita simultánea, sin pausa.**
`hero-section.tsx`: zoom de fondo 1.1→1 en 10s (vestibular: "zooming" — exactamente lo que `accessibility.md` pide evitar a gran escala) + 2 `motion.div` de blur flotando en loop infinito + `starfield.tsx` con **80 `motion.div` individuales** parpadeando en loop infinito + 3 "cometas" cruzando la pantalla en loop. Nada se puede pausar; nada respeta `reduce`.
*Fix:* (a) aplicar M-01 aquí primero; (b) migrar el starfield de 80 `motion.div` (JS-driven, un re-render por frame por estrella) a CSS puro con `@keyframes` + `animation-delay` negativo por estrella, o a `<canvas>` — ver M-06 (performance).

### 🟡 Importante

**M-03. "Uniform fade-in-on-every-element" — el mismo enter en 10+ componentes.**
`initial={{opacity:0, y:20}} / whileInView={{opacity:1, y:0}}` aparece, casi textual, en: `hero-section`, `enterprise-thesis-section`, `target-audience-filter`, `architecture-section`, `live-events-section`, `erp-integration-section`, `faq-section`, `cta-section`, y se repite en `chatbots-inteligentes/page.tsx` y `agentes-de-voz/page.tsx`. El umbral de la skill para "esto es slop, no polish" es ≥4 componentes idénticos; acá hay el doble. El usuario nunca distingue qué sección es más importante porque todas "aparecen" igual.
*Fix (lente Jakub):* reservar el fade+slide para 2-3 momentos reales (hero, CTA final) y dejar que el resto del contenido aparezca sin anuncio (motion-on-mount-for-static-content, anti-checklist). Alternativa más barata: variar duración/distancia por jerarquía (headline vs. body vs. card) en vez de copiar/pegar el mismo objeto `transition`.

**M-04. "Stagger-spam" manual con delays hardcodeados.**
`architecture-section.tsx` (`delay: 0.2 + i*0.1` en dos listas distintas), `cta-section.tsx` (cadena 0.1/0.2/0.3), `live-events-section.tsx` (misma cadena). El umbral de la skill es ≥2 listas en la misma vista con stagger; acá hay 3 componentes completos usando la técnica como "polish por defecto" en vez de como un momento deliberado.
*Fix:* usar `variants` + `staggerChildren` de framer-motion en los 1-2 lugares donde el orden de aparición cuenta una historia real (ej. los puntos del Card 2 de "Modelo D.O.A."), y quitarlo del resto.

**M-05. Inconsistencia de motion entre secciones del mismo tipo.**
De los 15 componentes de `src/components/landing/`, 8 usan `framer-motion` y 7 no (`clients-section`, `results-section`, `services-section`, `problem-solution-section`, `testimonial-section`, `value-proposition-section`, `blog-section`) — aunque estos 7 están además muertos (ver F-01). Si llegaran a revivirse sin criterio, el sitio tendría secciones que "aparecen" y secciones que no, sin razón de diseño.
*Fix:* no revivir estos componentes sin pasarlos por este mismo criterio de motion (ver sección 6, "Agregar").

**M-06. Starfield: 80 animaciones JS-driven simultáneas (performance, no solo motion).**
Cada una de las 80 estrellas es un `motion.div` separado con su propio `animate`/`transition` infinito; framer-motion las orquesta todas vía React. Es decorativo puro, detrás del hero, en una sección que carga en el LCP.
*Fix:* reescribir como CSS `@keyframes twinkle` + `animation-delay: calc(var(--i) * -140ms)` por estrella (variable CSS, no re-render), o canvas con `requestAnimationFrame` nativo (sin React de por medio). Cualquiera de las dos baja el costo de ~80 nodos reconciliados por framer-motion a una sola regla CSS o un solo canvas.

**M-07. Hover feedback inconsistente (valores arbitrarios).**
12 usos de `hover:scale-*` / `hover:-translate-y-*` en el repo con 5 valores distintos sin relación entre sí: `scale-[1.02]` (hero CTAs), `scale-105` (cta-section, blog cards), `scale-110` (chatbots icon, share buttons), `-translate-y-1` (blog card), `-translate-y-2` (services-section, muerto). No hay un sistema; cada desarrollador eligió un número a ojo.
*Fix:* definir 1-2 variantes de hover en el design system (ej. "lift sutil" = `-translate-y-0.5` + sombra, "scale sutil" = `scale-[1.02]`) y aplicar una sola según el tipo de elemento (card vs. botón vs. ícono), no ambas mezcladas.

### 🟢 Oportunidad

**M-08.** Jerarquía de duración: todas las transiciones de entrada rondan 0.3-0.8s sin variar por tamaño del elemento (el anti-checklist general pide que elementos más chicos animen más rápido). No es urgente, pero al resolver M-03 es gratis aplicar esto también.

**M-09.** El botón "Procesando..." del wizard de contacto (`contact-form.tsx:386`) no tiene ningún indicador visual de loading (spinner/pulso), solo cambia el texto. Es un "motion gap" real: el usuario no tiene feedback de que algo está pasando más allá del texto.

**M-10.** La transición entre el formulario (paso 3) y la pantalla de éxito (`contact-form.tsx:149-167`) reemplaza todo el árbol sin que el formulario tenga una salida (`exit`): solo la pantalla de éxito entra con fade+scale. Se siente como un salto, no una transición.

**M-11.** El dropdown de idioma y el menú de soluciones (`header.tsx`) heredan el motion por defecto de Radix/shadcn (correcto, sin bounce en elementos utilitarios — cumple la regla de Emil "nunca bounce en acciones utilitarias"). Sin acción requerida, solo se documenta como ejemplo correcto para no "arreglar" por error.

**M-12.** El Tetris de la 404 no tiene alternativa para `prefers-reduced-motion`. No es ambiental (es gameplay opt-in), pero una caída de piezas continua en pantalla completa puede ser un problema real para usuarios con sensibilidad vestibular que llegan a una URL rota sin buscarlo. Sugerido: un mensaje simple + link de vuelta al home cuando `reduce` está activo, con el juego como mejora progresiva.

---

## 5. Hallazgos — Taste / consistencia visual (`design-taste-frontend`)

### 🔴 Crítico

**F-01. 7 componentes de landing están completamente muertos.**
`clients-section.tsx`, `results-section.tsx`, `services-section.tsx`, `problem-solution-section.tsx`, `testimonial-section.tsx`, `value-proposition-section.tsx`, `blog-section.tsx` se definen pero **no se importan en ningún lugar** (confirmado por grep de sus nombres de export en todo `src/`). `src/app/[locale]/page.tsx` solo compone: Hero, EnterpriseThesis, TargetAudienceFilter, Architecture, LiveEvents, ErpIntegration, Faq, Cta.
- `clients-section.tsx` usa **logos de cliente falsos** (`https://placehold.co/150x50.png`) — si alguna vez se reimporta por error, sale placeholder a producción.
- `results-section.tsx` y `services-section.tsx` tienen **copy hardcodeado en español**, sin pasar por `next-intl` (rompería EN/PT si se reactivaran tal cual).
- Son, casi seguro, remanentes del template genérico "AI Services Cards" que el propio grafo del sitio (`docs/blueprint.md`) identificó como predecesor conceptual del reposicionamiento D.O.A.™ actual.
*Acción:* **borrar los 7 archivos.** Si alguno tiene contenido rescatable (ver sección 6), extraerlo antes de borrar.

**F-02. Sistema de tema invertido y sin uso real.**
`globals.css`: `:root` (el estado activo por defecto, sin ninguna clase) define `--background: 0% 7%` (casi negro) — o sea, **el tema por defecto del sitio es oscuro**. La clase `.dark` define `--background: 0% 100%` (blanco), con el comentario propio del código: *"El tema claro ahora es modo 'dark' si se necesita, pero no fue solicitado"*. `tailwind.config.ts` tiene `darkMode: ['class']` pero **no existe ningún toggle ni lugar que agregue la clase `.dark`** al DOM — es código muerto con un nombre que miente.
*Riesgo:* el día que alguien (humano o agente de IA) quiera agregar un selector de tema, va a asumir que `.dark` es oscuro (porque así se llama) y va a invertir el sitio por accidente.
*Fix:* o se elimina el bloque `.dark` completo (ya que no se usa), o se renombran las variables para que `.dark` sea de verdad oscuro y `:root`/`.light` sea de verdad claro, documentando la decisión en un comentario.

### 🟡 Importante

**F-03. Color Consistency Lock roto: colores crudos de Tailwind por fuera del sistema de tokens.**
El proyecto tiene un sistema de tokens correcto (`bg-primary`, `bg-accent`, `bg-card`, etc.) pero varios componentes lo ignoran y hardcodean:
- `enterprise-thesis-section.tsx`: `bg-zinc-50 dark:bg-zinc-900`, `text-zinc-600`, `text-zinc-900`
- `live-events-section.tsx`: `bg-zinc-900 text-white` (tarjeta de agenda)
- `hero-section.tsx`: segundo blob usa `bg-blue-500/10` — un azul que no es el `--primary` del sitio (`#2d99db`, sí azul, pero no es el mismo valor ni pasa por el token)
- `contact-form.tsx` y `erp-integration-section.tsx`: fuerzan `bg-white text-slate-900 border-slate-200` en vez de usar `bg-accent`/`bg-card` (que ya representan "sección clara" en este sistema)
*Fix:* reemplazar los `zinc-`/`slate-`/`blue-500` ad hoc por los tokens equivalentes (`bg-card`, `bg-accent`, `border-border`, `text-muted-foreground`). Esto también resuelve a medias F-02, porque fuerza a pasar todo por el único lugar de verdad.

**F-04. "Uno de cada" roto en eyebrows/badges.** (regla de la taste skill: máx. 1 eyebrow cada 3 secciones)
`enterprise-thesis-section.tsx` tiene un `Badge` como eyebrow, `live-events-section.tsx` tiene un badge con ícono (`MonitorPlay`). Con 8 secciones en el home, el máximo recomendado es 3 eyebrows; hay que confirmar el total contando también los badges de `architecture-section` y `target-audience-filter` antes de decidir si hace falta recortar. No se marca como crítico porque 2-3 instancias confirmadas está en el límite aceptable, pero merece una pasada de conteo exacto antes de agregar una tercera.

**F-05. "No Duplicate CTA Intent" — a verificar.**
El botón principal del hero dice `{t('cta')}` → `/contacto`, el secundario `{t('secondary_cta')}` → ancla `#arquitectura`, y el CTA final dice `{t('button')}` → Calendly externo. Como el copy vive en `src/locales/*.json` y no en el componente, no se puede auditar el texto exacto desde este documento; **se recomienda una pasada manual sobre `src/locales/es.json`** para confirmar que "Agendar Consultoría", "Solicitar Evaluación Estructural", "Discovery Express" (vistos en el grafo de conocimiento) no sean, en los hechos, la misma intención repetida con 3 etiquetas distintas — justo el patrón que la skill prohíbe.

**F-06. Botón de WhatsApp/redes incompleto.**
`footer.tsx:19-24`: de 4 íconos de redes sociales importados (LinkedIn, Twitter, Instagram, Facebook), 3 están comentados con `href="#"` placeholder y una nota "Reemplaza '#' con tu URL real". Solo LinkedIn está activo. Es contenido a medio terminar, no un problema de diseño, pero sale en cada página del sitio (footer global).

### 🟢 Oportunidad

**F-07. `lucide-react` como librería de íconos.**
La taste skill desalienta `lucide-react` por defecto (prefiere Phosphor/HugeIcons/Radix/Tabler), pero su propia regla de excepción aplica literalmente acá: *"Acceptable only when... the project already depends on it"* — y el proyecto lo usa en decenas de archivos. **No se recomienda migrar**; el costo (reescribir todos los imports de íconos) no tiene retorno visual. Se documenta solo para que quede explícito por qué no es un hallazgo de acción.

**F-08. `framer-motion` vs. `motion` (mismo paquete, nuevo nombre).**
La skill recomienda `import {motion} from "motion/react"` en código nuevo; `framer-motion` sigue funcionando como alias legado. No requiere migración del código existente, pero cualquier componente de motion **nuevo** que se agregue debería usar el paquete `motion` si se decide adoptarlo (no es necesario para este PRD, se deja como nota para el futuro).

**F-09. Dos componentes de landing (muertos) rompen el patrón de i18n del resto del sitio.**
Ya cubierto como parte de F-01 (`results-section.tsx`, `services-section.tsx` con copy hardcodeado). Se menciona acá aparte porque, si se decide rescatar contenido de estos archivos (sección 6), ese contenido necesita pasar primero por `next-intl` antes de reutilizarse.

**F-10. Zigzag / repetición de layout families — no aplica en el estado actual.**
Con 8 secciones en el home, se revisó la regla de "no 3 secciones consecutivas con el mismo layout" (taste skill §4.7) y el home **no la viola**: Hero (full-bleed) → Thesis (centrado) → TargetAudience (2 columnas) → Architecture (2 cards) → LiveEvents (split asimétrico) → ErpIntegration (marquee) → Faq (acordeón) → Cta (centrado). Se documenta como punto a favor, no como hallazgo.

---

## 6. Qué sacaría / modificaría / agregaría

### Sacar (remover)

1. **Los 7 componentes muertos** de `src/components/landing/`: `clients-section.tsx`, `results-section.tsx`, `services-section.tsx`, `problem-solution-section.tsx`, `testimonial-section.tsx`, `value-proposition-section.tsx`, `blog-section.tsx` (F-01). Antes de borrar, revisar si `problem-solution-section.tsx` o `value-proposition-section.tsx` tienen copy/estructura reutilizable para una futura sección "Problema → Solución" real (hoy esa narrativa vive repartida en Hero + Thesis + Architecture).
2. El bloque `.dark` de `globals.css` si se confirma que no hay plan de agregar un selector de tema en el corto plazo (F-02). Si hay plan, no se saca: se corrige (ver "Modificar").
3. Los 3 íconos sociales comentados en `footer.tsx` (Twitter, Instagram, Facebook) si no hay URLs reales previstas — un footer con placeholders a medias se ve peor que un footer con un solo ícono real.

### Modificar

1. **Agregar `prefers-reduced-motion` global** en `globals.css` (M-01) — el fix de mayor impacto en accesibilidad, una sola regla CSS.
2. **Reescribir `starfield.tsx`** de 80 `motion.div` a CSS `@keyframes` o `<canvas>` (M-02, M-06) — impacto en performance del hero, que es LCP.
3. **Diferenciar el motion por sección** en vez de repetir el mismo fade+slide en 10 componentes (M-03, M-04): mantenerlo en Hero y CTA final (los dos momentos que sí justifican "anunciar" la entrada), quitarlo o variarlo en el resto.
4. **Unificar el hover feedback** a 1-2 variantes consistentes en vez de 5 valores arbitrarios de scale/translate (M-07).
5. **Reemplazar colores crudos de Tailwind por tokens** en `enterprise-thesis-section.tsx`, `live-events-section.tsx`, `hero-section.tsx` (el blob azul), `contact-form.tsx` y `erp-integration-section.tsx` (F-03).
6. **Corregir el naming del sistema de tema** en `globals.css` para que `.dark` sea oscuro de verdad, si se decide conservarlo (F-02).
7. **Agregar loading state visual** al botón de envío del formulario de contacto (M-09) y un `exit` real al paso 3 antes de mostrar éxito (M-10).
8. Completar o quitar los íconos sociales placeholder del footer (F-06).

### Agregar

1. **Hook `useReducedMotion` compartido** (o un wrapper simple) para que cada componente con motion ambiental lo consulte una sola vez, en vez de reimplementar la lógica por archivo.
2. **1-2 variantes de `staggerChildren`** reales (usando `variants` de framer-motion) para los únicos 2-3 lugares donde una secuencia de aparición cuenta una historia (ej. los ítems del Card 2 "Modelo D.O.A." en `architecture-section.tsx`), reemplazando los delays hardcodeados sueltos.
3. **Alternativa estática para el Tetris de la 404** bajo `prefers-reduced-motion` (M-12): mensaje + link al home, con el juego como mejora progresiva para quien no tenga esa preferencia activada.
4. Si se confirma necesidad real de dark mode (toggle de usuario), un componente de theme-switch explícito — hoy `darkMode: ['class']` existe en la config pero no hay forma de activarlo desde la UI.

---

## 7. Roadmap sugerido (por esfuerzo/impacto)

| Fase | Ítems | Esfuerzo | Impacto |
|---|---|---|---|
| **1 — Rápido y seguro** | F-01 (borrar muertos), M-01 (`prefers-reduced-motion` global), F-06 (footer) | Bajo | Alto (accesibilidad + limpieza) |
| **2 — Consistencia visual** | F-03 (tokens de color), M-07 (hover unificado), F-02 (tema) | Medio | Medio-alto (coherencia de marca) |
| **3 — Motion con criterio** | M-03/M-04 (diferenciar entradas), M-06 (starfield a CSS/canvas) | Medio | Medio (percepción de calidad, performance) |
| **4 — Pulido** | M-09/M-10 (feedback del form), M-12 (404 accesible), F-05 (auditoría de copy de CTAs) | Bajo-medio | Bajo-medio |

---

## 8. Archivos revisados

**Motion (framer-motion):** `hero-section.tsx`, `starfield.tsx`, `enterprise-thesis-section.tsx`, `target-audience-filter.tsx`, `architecture-section.tsx`, `live-events-section.tsx`, `erp-integration-section.tsx`, `faq-section.tsx`, `cta-section.tsx`, `contact-form.tsx`, `chatbots-inteligentes/page.tsx` (spot-check), `agentes-de-voz/page.tsx` (spot-check, mismo patrón confirmado).

**Sin motion / estáticos:** `header.tsx`, `footer.tsx`, `sectors-section.tsx`, `clients-section.tsx`, `results-section.tsx`, `services-section.tsx`, `problem-solution-section.tsx`, `testimonial-section.tsx`, `value-proposition-section.tsx`, `blog-section.tsx`.

**Sistema/config:** `tailwind.config.ts`, `globals.css`, `button.tsx`, `src/app/[locale]/page.tsx` (composición real del home), `not-found.tsx` (Tetris, lectura parcial).

**No cubierto en esta pasada** (mismo patrón esperado por muestreo, no confirmado línea por línea): las 9 páginas de `casos-de-exito/`, `blog/[slug]`, `sobre-nosotros`, páginas legales. Recomendado pasar el mismo criterio cuando se aborde la Fase 3.
