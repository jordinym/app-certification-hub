# Certification Hub — Índice de documentación canónica (v3)

> Estado: **Reconciliación y roadmap aprobados en G0 — HITL-G0-001 (2026-11-16)**. Las specs/designs de implementación conservan sus gates G1/G2 pendientes; F05 y F07–F14 siguen abiertos. Esta documentación es la única estructura documental activa después de la instalación. No reemplaza el código ni declara las pruebas como aprobadas.

## Fuentes por responsabilidad (sin documentos competidores)
| Pregunta | Documento canónico | Estado |
|---|---|---|
| Qué producto se construye | `PRODUCT_SPEC.md` | Baseline original, conservado textual |
| Qué pantallas/rutas | `UI_SPEC.md` y `ui-reference.png` | Baseline original, conservado textual/imagen |
| Cómo se construye | `ARCHITECTURE.md`, `DECISIONS.md`, `COMPATIBILITY.md` | Baseline original |
| Cuál es el alcance aprobado S0–S4 | `BACKLOG.md`, `IMPLEMENTATION_PLAN.md` | Baseline original, IDs S0-01..S4-08 |
| Qué ocurrió realmente en S0 | `S0_REPORT.md` | Registro histórico, nunca alterar retroactivamente |
| Desarrollo y operación | `DOCKER_DEV.md`, `DEPLOYMENT.md` | Baseline original |
| Qué hito / tarea está autorizada | `sdd/ACTIVE_MILESTONE.md` y aprobación explícita en chat | H00 reconciliado; H01 solo preparación spec/design, sin implementación |
| Cómo se ejecuta sin bucles | `sdd/EXECUTION_POLICY.md` | Norma de funcionamiento |
| Cómo se relaciona cada historia con el baseline | `sdd/STORY_TRACEABILITY.md`, `sdd/HU_SPEC_INDEX.md` | Derivado, no sustituye baseline |
| Qué debe cumplir cada hito | `../specs/<hito>/{spec,design,tasks,verification}.md` | Propuesta por aprobar |
| Evidencia y decisiones de aceptación | `sdd/DECISION_LOG.md`, `sdd/EXECUTION_LOG.md` | Registrar solo evidencia real |

## Precedencia cuando existe conflicto
1. Aprobaciones y seguridad / límites expresos del usuario.
2. Baseline de requisitos original y decisiones de arquitectura.
3. Spec concreta del hito aceptada explícitamente.
4. Tasks y planes derivados.
5. Mockup ilustrativo (apariencia, no datos ni cambios de stack).

Si dos fuentes de un mismo nivel se contradicen: **STOP**, formular decisión HITL. No resolver silenciosamente.

## Reglas de estado
`DRAFT -> REVIEWED -> APPROVED -> IMPLEMENTED_UNVERIFIED -> VERIFIED -> ACCEPTED` (o `BLOCKED`). No inferir VERIFIED de commits, README, scripts o capturas ajenas.

## Navegación
- Roadmap: [sdd/MILESTONE_ROADMAP.md](sdd/MILESTONE_ROADMAP.md)
- Matriz UI: [sdd/UI_ACCEPTANCE_MATRIX.md](sdd/UI_ACCEPTANCE_MATRIX.md)
- Policy HITL: [sdd/EXECUTION_POLICY.md](sdd/EXECUTION_POLICY.md)
- Trazabilidad: [sdd/TRACEABILITY.md](sdd/TRACEABILITY.md)
- Catálogo HUs: [sdd/HU_SPEC_INDEX.md](sdd/HU_SPEC_INDEX.md)
