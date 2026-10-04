# Datelia — Project Notes

Agencia de IA aplicada a negocios (datelia.com.ar), con foco en automatización administrativa para PyMEs medianas (20-500 empleados) con ERP/planillas. Sitio marketing + blog headless + captación de leads.

**Posicionamiento vigente: ver `docs/WEB.md`.** No es "D.O.A.™ / Arquitectura Agéntica Gobernada / holdings" — esa narrativa se discontinuó el 2026-10-04 por no coincidir con los clientes reales (PyMEs, no holdings) y por contener casos de éxito y certificaciones inventadas. Si ves referencias a D.O.A. o holdings en código viejo o en tu propio conocimiento de sesiones anteriores, son residuales: no las repitas ni las "arregles" devolviéndolas a como estaban.

## Stack
- Next.js 15 (App Router) + TypeScript, Tailwind + shadcn/ui (Radix primitives)
- next-intl: `es` (default) / `en` / `pt`, rutas con locale bajo `src/app/[locale]/...`
- Supabase: CMS headless del blog (`posts`/`categories`/`tags`) y captura de leads (`leads`); `supabaseAdmin` (service-role) para escrituras, protegido con header `x-api-key` == `API_WRITE_KEY`
- Genkit + Gemini 2.0 Flash para features de IA (`src/ai/`)
- Resend para email transaccional (formulario de contacto)
- Umami Analytics (privacy-first, se activa solo si las env vars existen)
- SEO: JSON-LD Organization+LocalBusiness, sitemap/robots dinámicos, OG por página

## Deploy
Vercel, deploy automático en cada `push` a `main` (repo `GastonHorvat/Datelia`), según `DEVELOPER_GUIDE.md`.
El proyecto arrancó en Firebase Studio/Project IDX; graphify detectó el residuo (`apphosting.yaml`, `.idx/dev.nix`, dependencia npm `firebase` sin uso, README genérico de Firebase Studio) como una conexión AMBIGUOUS entre la doc de Vercel y la config de Firebase App Hosting. Ya se limpió: se eliminaron esos archivos/dependencia y se reescribió el README.

## Estructura
- `src/app/[locale]/...` — páginas públicas (home, soluciones, casos-de-éxito, blog, contacto, legal)
- `src/app/api/*` — 7 endpoints headless: `posts` (CRUD, API-key), `categories`, `tags`, `contact` (Resend), `discovery` (wizard de lead multi-step → tabla `leads`), `ccee-lead`, `image` (upload)
- `src/components/landing|blog|case-studies|solutions/` — secciones de página; `src/components/ui/` — primitivas shadcn/Radix
- `src/app/[locale]/not-found.tsx` — 404 personalizada con un mini-Tetris jugable

## Knowledge graph (graphify)
`graphify-out/` tiene un grafo de conocimiento de todo el repo: código vía AST + docs/marketing/SEO vía extracción semántica LLM. Se excluyeron a propósito 34 imágenes decorativas (logos, screenshots de Playwright) por costo/beneficio — quedan sin indexar hasta que corras `--update` explícitamente incluyéndolas. Carpeta gitignoreada: es una herramienta local para Claude Code, no se despliega.

- **1016 nodos · 2099 edges · 89 comunidades**
- Explorar visualmente: abrir `graphify-out/graph.html`. Consultar: `/graphify query "<pregunta>"`.
- **Auto-actualización**: hook de git post-commit/post-checkout instalado (`graphify hook install`). Después de cada commit, re-extrae AST del código que cambió y reconstruye `graph.json` en background — como todo deploy en este proyecto sale de un commit+push a `main`, el grafo de código queda sincronizado con lo que se despliega automáticamente. **Los cambios en docs/imágenes NO se recogen solos** — correr `/graphify --update` a mano después de tocar algo en `.agents/`, `docs/` o `public/images/`.
- Log de rebuilds: `~/.cache/graphify-rebuild.log`.

### Hallazgos del análisis (snapshot 2026-10-04, pre-rediseño)
- **God nodes** (más conectados): `cn()` (171 edges), `react`, `next`, `Card`, `Layout()`, `Button`, `lucide-react`, `CardContent`, `next-intl`, `Breadcrumbs()`.
- `.agents/ads*` es un paquete de skills de Claude para auditoría de Ads (Google/Meta/LinkedIn/TikTok/Microsoft) — no es código del sitio, es tooling instalado para otro propósito.
- 385 nodos quedaron con ≤1 conexión (ver "Knowledge Gaps" en `GRAPH_REPORT.md`) — en su mayoría símbolos de configuración (tsconfig, eslint) sin relaciones semánticas, no es necesariamente un problema.
- `ref_next` (53 edges, nodo puente de mayor centralidad) no es acoplamiento arquitectónico real: es el target de `import ... from 'next'`, y casi todas las páginas/rutas de un proyecto App Router importan algo de `next` (`NextResponse`, tipos `Metadata`, `notFound`, etc.). Es un hub estructural propio del framework, no una señal de diseño a revisar.

⚠️ Este snapshot es de antes del rediseño de contenido del 2026-10-04 (ver `docs/WEB.md`). Los documentos de `docs/Marketing/` y `docs/blueprint.md` que el grafo original indexó ya no existen en el repo (se borraron por describir la estrategia D.O.A.™ discontinuada). Correr `/graphify --update` para refrescar este snapshot.

Reporte completo con comunidades, surprising connections y preguntas sugeridas: `graphify-out/GRAPH_REPORT.md`.
