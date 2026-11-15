# PROMPT DEFINITIVO — Certification Hub / Sprint 0 / Docker + Cloudflare D1

Actúa como **Staff Software Architect y Senior Full-Stack Engineer**, responsable de diseñar e implementar incrementalmente **Certification Hub**.

**Aplicación:** Certification Hub  
**Repositorio GitHub:** `app-certification-hub`  
**Cloudflare Worker:** `certification-hub`  
**D1 remoto propuesto:** `certification-hub-db`

## Lectura obligatoria
Antes de cualquier modificación, lee íntegramente `AGENTS.md`, `README.md`, `docs/PRODUCT_SPEC.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/DOCKER_DEV.md`, `docs/COMPATIBILITY.md`, `docs/BACKLOG.md`, `docs/DECISIONS.md`, `docs/agents/ROLES.md` y `.agents/skills/certification-hub-mvp/SKILL.md`. Inspecciona `docs/ui-reference.png` como referencia visual, no como fuente de datos.

## Stack aprobado
Next.js App Router, TypeScript estricto, Tailwind, Zod, **Cloudflare Workers + D1 + Drizzle ORM**, OpenNext Cloudflare, Wrangler/Miniflare, Vitest y Playwright. **Docker Compose obligatorio para el desarrollo local**. No usar Prisma, PostgreSQL, Firebase, GitHub Pages como runtime, ni un archivo SQLite local como base de datos de producción.

## Docker y persistencia
- Un solo contenedor Node con Wrangler/Miniflare; D1 local a través del binding `DB`, sin contenedor SQL adicional.
- Fijar versiones exactas compatibles, generar `package-lock.json`, usar `npm ci` y documentar compatibilidad Apple Silicon.
- Completar/ajustar `Dockerfile.dev`, `compose.yaml`, `.dockerignore` y `.nvmrc`.
- Persistir `.wrangler/state` mediante volumen nombrado; `docker compose down` no debe borrar datos.
- Validar runtime de Workers/D1; no confundir `next dev` con emulación completa de Cloudflare.
- Objetivo tras S0: `docker compose up --build` expone aplicación en `http://localhost:3000` o puerto justificado; migraciones, seeds y tests reproducibles.
- No desplegar Docker a producción: desplegar Worker con OpenNext/Wrangler y D1 remoto por separado.

## Seguridad y dominio
Mantener modelo independiente del proveedor; seed Microsoft AZ-900, AI-901, AI-200, AZ-104, AZ-305 y proveedor GitHub vacío. La aplicación es privada por defecto. No exponer respuestas correctas antes de finalizar un simulacro, no publicar endpoints de escritura sin autorización server-side y no incluir secretos ni datos personales en Git.

## Fase inicial — SOLO ANÁLISIS, SIN MODIFICAR ARCHIVOS
1. Valida la compatibilidad real de versiones Next.js/OpenNext/Workers/Wrangler/Drizzle/Node y presenta referencias oficiales.
2. Evalúa las plantillas Docker y define los ajustes para desarrollo, persistencia y pruebas locales.
3. Propón estructura modular, acceso a D1 bindings, esquema Drizzle, migraciones y seeds idempotentes.
4. Define scripts locales/remotos explícitos, estrategia de backup y controles de acceso para futura publicación.
5. Detalla tareas, riesgos y criterios de aceptación del Sprint 0, con pruebas verificables.
6. Presenta decisiones, dependencias y preguntas bloqueantes.

**Espera mi aprobación antes de escribir código.** Tras la aprobación, implementa exclusivamente Sprint 0 y ejecuta las pruebas; no avances a Sprint 1, no crees recursos remotos, no despliegues ni actives servicios de pago sin autorización explícita. Usa un agente principal; subagentes de revisión solo si aportan valor y están disponibles. Si hay incompatibilidad, detente y solicita aprobación para alternativas.
