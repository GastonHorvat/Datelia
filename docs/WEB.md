# Datelia — Posicionamiento y guía de contenido de la web

_2026-10-04. Reemplaza toda la documentación de marketing anterior (D.O.A.™, Arquitectura Agéntica Gobernada, holdings) — ver `CLAUDE.md` para el porqué. Si estás leyendo esto como agente de IA: **esta es la estrategia vigente**, no la que puedas encontrar en commits viejos de `docs/`._

## Objetivo del sitio

Datelia casi no recibe tráfico: los clientes llegan **por recomendación**. La web no tiene que atraer visitas, tiene que **confirmarle a quien llega recomendado que hizo bien en venir** y llevarlo a agendar una charla. Responde cuatro preguntas en menos de un minuto: qué hacen (en palabras de dueño de PyME, no de consultor), si lo hicieron antes para alguien como el visitante (casos reales y verificables), quiénes son (personas reales, no "Senior Partners"), y cuál es el siguiente paso (un botón: "Agendar diagnóstico").

## Cliente objetivo

Empresas medianas (20-500 empleados) con un ERP o planillas y mucho trabajo administrativo a mano. Perfil: CEDSA, La Francisca, La Tablada. **No** son holdings ni grupos empresariales complejos — esa era la narrativa D.O.A.™ vieja, descartada.

## Principios de contenido (no negociables)

1. **Solo cosas reales.** Ningún caso, número, testimonio, logo o integración que no se pueda demostrar. Si no hay un dato medido, no se pone un número.
2. **El idioma del cliente, no el del consultor.** "Pedidos que se cargan solos en el ERP", no "orquestación de nodos agénticos".
3. **Trato de "vos"**, siempre igual, en los 3 idiomas (adaptado: "you" en inglés, "você" en portugués).
4. **Frases cortas.** Si una frase necesita releerse, se reescribe.
5. **Sitio en 3 idiomas** (es/en/pt) — decisión explícita de mantenerlos pese a que el tráfico es bajo. Todo cambio de copy se aplica en `src/locales/es.json`, `en.json` y `pt.json`.

## Mapa del sitio vigente

```
Inicio
Soluciones
 ├─ Rendición de gastos y fondos fijos
 ├─ Pedidos y presupuestos automáticos
 ├─ Facturas y listas de proveedores
 └─ Tableros de gestión
Casos
 ├─ CEDSA
 ├─ La Francisca
 └─ La Tablada
Cómo trabajamos
Nosotros
Blog
Contacto (botón destacado: "Agendar diagnóstico")
```

## Lo que se eliminó (y por qué un dev no debería traerlo de vuelta)

- **D.O.A.™ / "Arquitectura Agéntica Gobernada" / "Senior Partners" / "holdings"**: jerga de consultora premium que contradecía a los clientes reales (PyMEs medianas). La marca D.O.A.™ sigue en trámite de registro ante el INPI a nombre de Sentido Común S.R.L. (`src/app/[locale]/legal/terminos-y-condiciones/page.tsx`) — eso no cambia, solo se dejó de usar en el copy público.
- **6 casos de éxito inventados** (retail, clínica, logística, construcción, agroindustria, servicios) con métricas falsas (+35% conversión, ROI 3× en 60 días, etc.). Reemplazados por 3 casos reales con permiso de los clientes.
- **Mención a "SOC2"**: Datelia no tiene esa certificación.
- **Página `/CCEE` y la capacitación asociada**: terminada, dada de baja con redirect 301 a home.
- **Páginas de "Agentes de Voz" y la sección de WhatsApp standalone**: sin casos reales de respaldo. Lo de WhatsApp como canal de entrada se absorbió dentro de "Pedidos y presupuestos".

## Para un dev o agente: antes de tocar contenido

1. Si vas a cambiar texto visible, tocá los 3 archivos de idioma (`src/locales/{es,en,pt}.json`), no solo español.
2. Si vas a agregar un número o un caso, preguntá primero si hay un dato real detrás. Por default, no.
3. Las citas de Clutch en inglés (`en.json`) llevan el texto **original** de Clutch, no una traducción del español.
4. Cualquier ruta que se borre necesita su redirect 301 en `next.config.ts`, para las 3 variantes de idioma.
5. Después de tocar algo en `docs/` (incluido este archivo), correr `/graphify --update` — el hook de git no detecta solo cambios en `docs/`.

## Estado de implementación

Ver `_coaching/entregables/PENDIENTES_WEB_DATELIA.md` (fuera de este repo, carpeta de gestión de Gastón) para el detalle de qué fases están hechas, qué falta, y qué depende de qué. Resumen rápido al 2026-10-04: Fases 1 y 2 completas; Fase 3 (home) y Fase 4 (soluciones/casos) en curso la misma noche; Fase 5 (nosotros/contacto) y Fase 6 (blog/SEO/Clutch/LinkedIn) pendientes.

## Auditoría de visibilidad y posicionamiento

`docs/auditoria-visibilidad/` (gitignoreada, no se commitea) tiene una auditoría integral de 28 bloques (estrategia, SEO, legal, seguridad, accesibilidad, RevOps, analítica, etc.), hecha el 16/07/2026 y re-auditada el 08/10/2026 contra el código post-rediseño. Puntuación: 37,3/100 (crítico) → 47,0/100 (débil). Cada bloque tiene su nota original y una sección "Actualización 08/10/2026" con lo resuelto/pendiente; `Datelia/README.md` es el índice, `Datelia/historial-calificaciones.md` lleva el registro de notas por fecha (nunca se sobrescribe, solo se agregan filas). Si volvés a tocar el sitio de forma sustancial, vale la pena re-auditar y agregar una fila nueva al historial — así se puede mostrar la evolución de la nota en el tiempo.
