# H06 — Diseño técnico propuesto

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

## Integración en arquitectura aprobada
- Stack: Next.js App Router, TypeScript estricto, Tailwind, Zod, OpenNext Cloudflare Workers, D1 y Drizzle. No cambiarlo sin decisión expresa.
- Respetar monolito modular: `src/modules/catalog`, `planning`, `assessment`, `analytics`, `settings`; `src/server/db`; `src/server/auth`; UI en `src/app` y componentes compartidos.
- Camino de escritura: UI/acción → autorización y Zod en servidor → servicio/repositorio → Drizzle → binding `DB` (solo si la tarea requiere persistencia).
- Ámbito: /results/[attemptId].

## Componentes y datos a diseñar
Puntuación de práctica, explicaciones posteriores al envío, revisión por pregunta y desglose por dominio.

## Decisiones que deben ratificarse
- Puntuación % de práctica, no puntuación Microsoft ni criterio oficial de aprobación.
- Explicaciones se liberan solo después de que el intento esté enviado.
- Desglose deriva de snapshot del intento, no del banco mutable actual.

## Adaptación visual
- Pantallas asociadas, si las hay: navegación general, catálogo/alta, plan, dashboard, simulacros o resultados según `UI_SPEC.md`.
- Tokens de diseño existentes: azul `#0078D4`, navy `#102A43`, fondo `#F3F6FA`; componentes reusables sin dependencias Cloudflare en UI presentacional.
- Comprobar escritorio/tablet/móvil, estados vacío/loading/error, navegación con teclado y mensajes claros.
- El PNG se debe inspeccionar directamente en el equipo cuando se implemente UI: no se ha realizado una comparación pixel por pixel de este paquete.

## Dependencias y prueba de realidad
- Dependencia inicial: H05 envío/calificación validado; snapshots privados intactos.
- Consultas de contenido siempre desde D1 en integraciones verificadas; fixtures explícitos solo en prototipo UI autorizado.
- Los procedimientos operativos siguen `docs/DOCKER_DEV.md` y `docs/DEPLOYMENT.md`; no reinterpretar comandos no ejecutados como pruebas.

## Revisión de diseño HITL
Codex entrega archivos propuestos, riesgos, dependencias, criterios pendientes y se detiene. Requiere aprobación explícita antes de cambiar aplicación, base o infraestructura.
