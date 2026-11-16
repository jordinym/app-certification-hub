# Índice del paquete SDD — todas las historias y gates

**Documentos existentes conservados:** `docs/PRODUCT_SPEC.md`, `BACKLOG.md`, `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE.md`, `UI_SPEC.md`, `DECISIONS.md`, `DEPLOYMENT.md`, `DOCKER_DEV.md`, `S0_REPORT.md`, `docs/ui-reference.png`.

| Orden sugerido | Hito | Carpeta | Qué demuestra | Precondición mínima |
|---|---|---|---|---|
| 0 | H00 | `specs/H00-governance/` | Trazabilidad/HITL | Documentación |
| 1 | H01 | `specs/H01-app-shell/` | UI visible responsive | Entorno UI utilizable demostrado y excepción HITL expresa solo presentacional (F03/F04) |
| 2 | P0 | `specs/P0-worker-d1-foundation/` | Worker+D1 real y seguro | Runtime operativo |
| Antes de H02 integrado | P1 | `specs/P1-docker-reproducibility/` | Docker y aceptación S0 | P0; bloqueante para cerrar S0 y entrar en H02 integrado |
| 3 | H02 | `specs/H02-catalog/` | Catálogo CRUD real | H01 y S0 cerrado/aceptado: P0+P1 y A0-01..A0-10; aprobación S1 y G1/G2 H02 (F03) |
| 4 | H03 | `specs/H03-study-planning/` | Plan, tareas, recursos, ajustes | H02 |
| 5 | H04 | `specs/H04-dashboard/` | KPIs derivados de D1 | H03 |
| 6 | H05 | `specs/H05-exam-engine/` | Simulacro con claves privadas | Revisión editorial y P0 |
| 7 | H06 | `specs/H06-results/` | Resultados post-envío | H05 |
| 8 | H07 | `specs/H07-release-readiness/` | Auditorías y release preparado | P1 y producto verificado |
| 9 | H08 | `specs/H08-remote-release/` | Operación remota | Autorización GR independiente |

La tabla es **roadmap reconciliado aprobado en G0 por HITL-G0-001 (2026-11-16)**, no autorización automática para violar el requisito original `S0 cerrado antes de S1`; la única excepción aquí propuesta es H01 exclusivamente presentacional, mediante HITL expreso y entorno UI utilizable demostrado. H02 integrado no tiene excepción al cierre S0 (F03/F04). El cierre formal de S0 sigue requiriendo P0+P1 y A0-01..A0-10.

## Contrato común de cuatro archivos por hito
- `spec.md`: qué debe hacer y escenarios comprobables.
- `design.md`: arquitectura, componentes, decisiones HITL y exclusiones.
- `tasks.md`: tareas pequeñas con trazabilidad y stop al terminar una.
- `verification.md`: pruebas planificadas y formato de evidencia, sin marcar cumplidas antes de ejecutar.

G0 habilita H01 únicamente para preparación de spec/design; no se ejecuta H01 en el registro de esta decisión. G1/G2 y la excepción presentacional siguen pendientes. F05 y F07–F14 permanecen abiertos.

## Cómo activar
1. Aprobar por escrito un hito (spec + design) tras H00.
2. Actualizar `docs/sdd/ACTIVE_MILESTONE.md` a dicho hito con tarea y fase exacta.
3. Ejecutar SOLO esa tarea; entregar evidence y detenerse.
4. Aceptar humanamente antes de autorizar otra.
