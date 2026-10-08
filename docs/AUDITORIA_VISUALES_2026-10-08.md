# Auditoría de visuales — sitio Datelia

_2026-10-08. Hecha con `design-taste-frontend` (Sección 4.8: estrategia de assets visuales, Sección 9: AI tells) sobre el código real de cada página, no sobre supuestos. No se tocó código en esta auditoría — es un listado de propuestas._

---

## Veredicto directo

**No, el hero no es la mejor recomendación que tenemos — es solo el síntoma más visible de un problema que está en casi todo el sitio.**

Repasé los ~20 componentes de sección (home, 4 páginas de solución, 3 páginas de caso + listado, Sobre Nosotros, Contacto). Resultado:

| Tiene una imagen/foto real | No tiene ninguna |
|---|---|
| Sobre Nosotros (fotos de Gastón y Jimena) | Hero de home |
| Tableros de gestión (el screenshot que agregamos hoy) | Hero de las 4 páginas de solución (×4) |
| Integraciones ERP (logos reales de Odoo, Salesforce, etc.) | Las 3 páginas de caso + el listado de Casos (×4) |
| | Trust bar (clientes solo en texto, sin logo) |
| | Hero de Contacto |

Dos secciones bien resueltas contra quince que no tienen nada. El hero de home no está "insulso" porque esté mal diseñado — está insulso porque es la única sección de la home que intentó tener un visual propio, y lo que tiene es una composición de íconos de Lucide en cajitas, no una imagen real. El resto del sitio directamente no lo intenta.

---

## Principio que sigo para esto (de `design-taste-frontend`, sección 4.8)

Orden de prioridad para cualquier asset visual:
1. **Herramienta de generación de imágenes** — no tengo ninguna disponible en este entorno (lo chequeé antes de escribir esto).
2. **Imágenes reales** — screenshots reales de lo que ya se entregó, fotos reales, logos reales.
3. **Último recurso: decírselo al usuario** con huecos marcados, en vez de rellenar con stock genérico o con "divs que simulan una captura de pantalla" (la skill lo marca explícitamente como el Tell #1 de diseño hecho por IA).

Para un sitio B2B que ya se limpió de casos inventados y certificaciones falsas, **recomendar stock genérico de gente sonriendo en una oficina sería un paso para atrás**, no una mejora. Por eso cada ítem de abajo pide un asset real tuyo, no un link de Unsplash para rellenar.

---

## 1. HOME — `src/components/landing/hero-section.tsx`

**Estado actual:** composición de 3 íconos (WhatsApp/mail/planilla) flotando, una esfera con un ícono de IA en el medio, y una tarjeta "ERP actualizado". Todo hecho con `lucide-react` + `motion.div`, cero imágenes. Oculto en mobile (`hidden lg:block`) — o sea, **la mitad de las visitas (celular) no ve ningún visual en el hero**, solo texto.

**Problema:** es exactamente el patrón que la skill llama "Text + gradient blob is not a hero, es un placeholder". No transmite qué hace Datelia de verdad, un prospecto no puede "reconocer" nada ahí.

**Propuesta concreta:** reemplazar la composición de íconos por un **collage de 2-3 capturas reales** de productos ya entregados (el mismo criterio que usamos en Tableros), compuestas en diagonal/superpuestas como si fueran ventanas de distintas apps: la app de rendición de gastos, un tablero, quizás el flujo de aprobación. Tratamiento: tarjetas con `rounded-xl border shadow-2xl`, superpuestas con leve rotación (±3-4°), igual que el patrón "Asymmetric Split Hero" que ya referencia la skill.

**Qué necesito de vos:** 2-3 capturas reales más, estilo `dash1.jpeg`, de otras pantallas que ya entregaste (la app de rendición de CEDSA/La Francisca, el flujo de pedidos, lo que tengas). Mobile: al menos una de esas capturas visible (hoy no hay nada en mobile).

---

## 2. HOME — Trust bar (`trust-bar-section.tsx`)

**Estado actual:** "Clientes: CEDSA · La Francisca · La Tablada" en texto plano.

**Propuesta:** logos reales en vez de nombres. Ya estaba anotado como pendiente en `PENDIENTES_WEB_DATELIA.md` ("no hay archivos de logo de CEDSA/La Francisca/La Tablada en el repo").

**Qué necesito de vos:** logo (SVG o PNG con fondo transparente) de los 3 clientes, si te dan permiso de mostrarlo. Si alguno no quiere, se queda en texto para ese cliente nomás.

---

## 3. HOME — Integraciones ERP (`erp-integration-section.tsx`)

**Estado actual:** esto ya está bien — logos reales (Odoo, Salesforce, HubSpot, etc.) vía SVG, carrusel infinito. No toco esto.

**Hallazgo aparte (no es de imágenes, es de consistencia):** esta sección usa `bg-white text-slate-900` — es la única sección de todo el sitio que se pone clara en medio de un sitio oscuro. La skill lo marca como "Page Theme Lock" roto: una sección no debería invertir el tema en medio del scroll. Lo dejo anotado, no lo toco porque no es parte de lo que preguntaste hoy.

---

## 4. HOME — Soluciones (`home-solutions-section.tsx`)

**Estado actual:** 4 tarjetas con ícono de Lucide + título + descripción. Funciona razonablemente bien como resumen rápido.

**Propuesta (secundaria, no urgente):** si en algún momento tenés más capturas reales (una por solución), cada tarjeta podría llevar una miniatura de 16:9 en vez del ícono solo. Hoy con una sola captura (Tableros) no alcanza para las 4 — lo dejo para cuando haya más material.

---

## 5. HOME — Casos (`home-cases-section.tsx`)

**Estado actual:** 3 tarjetas de texto puro (nombre del cliente + resumen), sin logo ni imagen.

**Propuesta:** mismo logo real de la sección 2 (trust bar), reutilizado acá como ícono de la tarjeta. Barato de hacer una vez que tengas los archivos.

---

## 6. HOME — Testimonios (`home-testimonials-section.tsx`)

**Estado actual:** 2 reviews de Clutch, solo texto + link. Esto está bien así — no hay foto real de quien dejó la review, y poner un avatar genérico sería peor que no poner nada (la skill lo banea explícitamente: "no generic avatars").

**Propuesta (chica):** el logo de Clutch (real, vía su sitio) al lado del link, para que se note que es una plataforma externa verificable, no una cita armada. Opcional, bajo impacto.

---

## 7. Página de Contacto (`contacto/page.tsx`)

**Estado actual:** hero 100% texto.

**Propuesta:** baja prioridad. Es una página utilitaria (el visitante ya decidió contactar, no hay que convencerlo con una imagen). No lo tocaría.

---

## 8. Sobre Nosotros (`sobre-nosotros/page.tsx`)

**Estado actual:** hero 100% texto, pero más abajo **ya tiene las fotos reales de Gastón y Jimena** (resuelto esta semana). Bien ahí.

**Propuesta:** baja prioridad también. El hero de una página "institucional" corta puede ser solo texto sin que se sienta vacío, porque las fotos reales llegan enseguida al scrollear.

---

## 9. LAS 4 PÁGINAS DE SOLUCIÓN (`solution-page-template.tsx`) — el hueco más grande después del hero de home

**Estado actual:** hero = ícono chico de Lucide en una cajita + título + subtítulo, **sin ninguna imagen**, en las 4 páginas (rendición de gastos, pedidos y presupuestos, facturas y proveedores, tableros de gestión). Es el patrón menos visual de todo el sitio.

**Lo que ya arreglamos hoy:** Tableros de gestión tiene ahora una captura real en el cuerpo de la página (entre "Cómo lo resolvemos" y "Qué incluye"). Las otras 3 siguen en cero.

**Propuesta:**
1. **Urgente, mismo patrón que Tableros:** si tenés capturas reales de la app de rendición de gastos, del flujo de pedidos o de facturas de proveedores, agrego la misma sección "Así se ve [X] real" a esas 3 páginas. Es el cambio de mayor impacto por esfuerzo de toda esta lista — ya está el componente hecho (`screenshotSrc` es opcional, reusable).
2. **Hero de las 4 páginas:** hoy ninguna tiene imagen en el hero mismo (el ícono de Lucide no cuenta). Con las capturas de arriba, se podría usar un recorte/zoom de esa misma captura como fondo sutil del hero (no la imagen completa, un recorte desenfocado o con gradiente para no competir con el texto).

**Qué necesito de vos:** capturas reales de rendición de gastos, pedidos y presupuestos, y facturas y proveedores — una por solución alcanza, como hiciste con Tableros.

---

## 10. CASOS — listado (`casos/page.tsx`) y las 3 páginas de caso (CEDSA, La Francisca, La Tablada)

**Estado actual:** el template de caso (`case-page-template.tsx`) es **texto puro de punta a punta**. Ni el hero, ni "Punto de partida", ni "Qué hicimos", ni "Resultado" tienen ninguna imagen. Es la plantilla con menos elementos visuales de todo el sitio — ni siquiera tiene el ícono chico que sí tienen las páginas de solución.

**Problema:** son las páginas que más deberían transmitir "esto es real, lo hicimos de verdad" — y son las que menos lo transmiten visualmente. Todo el peso de la prueba recae en el texto.

**Propuesta:**
1. **Logo del cliente** en el hero de cada caso (mismo archivo que pediría para la sección 2), al lado del título.
2. **Captura real del sistema entregado**, si la tenés para ese cliente específico, en la sección "Qué hicimos" — mismo patrón que Tableros.
3. Si CEDSA/La Francisca/La Tablada tienen alguna captura ya circulando (la que me pasaste hoy, ¿es de alguno de estos tres o es de otro cliente — YLaw, por lo que dice el watermark "YLAW-124" en las tarjetas?). **Importante: antes de usar esa imagen en el caso de un cliente específico, confirmame de qué cliente es** — si es de YLaw, no correspondería ponerla en el caso de Tableros atribuido a "La Francisca/La Tablada" sin aclarar la fuente real.

**Qué necesito de vos:** logo de cada cliente (si hay permiso) + una captura real del sistema entregado a cada uno, si las tenés.

---

## Resumen: qué me tenés que pasar para que esto deje de ser una lista y pase a ser código

| Asset | Para qué | Prioridad |
|---|---|---|
| 2-3 capturas reales más (rendición, pedidos, facturas) | Replicar el patrón de Tableros en esas 3 páginas de solución | **Alta** |
| 2-3 capturas (pueden ser las mismas de arriba) para el hero de home | Reemplazar los íconos flotantes por un collage real | **Alta** |
| Logos de CEDSA, La Francisca, La Tablada | Trust bar, tarjetas de casos en home, hero de cada página de caso | Media |
| Confirmar de qué cliente es `dash1.jpeg` (parece ser "YLAW" por el watermark) | Para no atribuirla mal en una página de caso específica | Antes de usarla en un caso |
| Logo de Clutch (lo puedo sacar yo de una fuente pública tipo Simple Icons) | Al lado de los testimonios | Baja, lo resuelvo yo solo |

Nada de esto lo armo con stock genérico — si no tenés el archivo real, la sección se queda como está hasta que lo tengas, en vez de rellenar con una foto de gente sonriendo en una oficina que no es la tuya.
