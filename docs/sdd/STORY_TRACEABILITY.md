# Matriz de trazabilidad — 37 tareas originales, 9 hitos funcionales/técnicos

**ESTADO: PROPUESTA SIN APROBAR.** Fuente de requisitos: `docs/IMPLEMENTATION_PLAN.md` secciones 5–9 y `docs/BACKLOG.md`. H00 es gobernanza; P0/P1 son infraestructura y datos, H01-H08 son producto y release. La asignación no reemplaza ni rebaja criterios originales.

| ID original | Hito propuesto | Fuente | Estado de aceptación |
|---|---|---|---|
| `S0-01` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-02` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-03` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-04` | P1 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-05` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-06` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-07` | P0 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-08` | P1 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-09` | P1 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S0-10` | P1 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-01` | H01 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-02` | H02 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-03` | H02 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-04` | H02 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-05` | H02 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S1-06` | H02 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-01` | H03 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-02` | H03 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-03` | H03 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-04` | H03 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-05` | H03 + H04 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S2-06` | H03 + H04 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-01` | H05 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-02` | H05 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-03` | H05 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-04` | H05 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-05` | H05 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-06` | H06 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S3-07` | H05 + H06 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-01` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-02` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-03` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-04` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-05` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-06` | H07 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-07` | H08 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |
| `S4-08` | H08 | [Fuente original](../IMPLEMENTATION_PLAN.md) | REQUIERE VERIFICACIÓN / HITL |

## Grupos de criterios originales de aceptación S0
| ID original | Hito primario | Evidencia |
|---|---|---|
| A0-01 | P1 | npm ci reproducible en contenedor |
| A0-02 | P1 | Compose inicializado y host accesible |
| A0-03 | P0 | Escritura y lectura por Worker+D1 |
| A0-04 | P0 | Migraciones/seed dobles e idempotentes |
| A0-05 | P1 | Persistencia después de down/up sin -v |
| A0-06 | P0 | Rechazo FK/unicidad inválidas |
| A0-07 | P0 | Mutación no autorizada negada |
| A0-08 | P1 | Typecheck/lint/test dentro del contenedor |
| A0-09 | P1 | Backup y restore estado aislado |
| A0-10 | P0 | Sin secretos ni estado privado en cliente |

## Reglas de reconciliación
1. Si un ID se distribuye en dos hitos (S2-05, S2-06, S3-07), cada uno cubre su parte y no se puede cerrar el original hasta verificar ambas.
2. Separar **completado en código**, **verificado** y **aceptado**. `S0_REPORT.md` afirma ejecución parcial; no debe actualizarse el estado sin nueva evidencia.
3. Los IDs nuevos HU/AC son organizativos; no sustituyen las pruebas y reglas detalladas en el plan.
4. `docs/ui-reference.png` cubre seis mockups; `/settings` y `/resources` siguen siendo requisitos escritos incluso si no figuran en PNG.
5. Mantener P0/P1 como requisitos obligatorios para cierre de S0 y CRUD real; H01 de layout solo puede adelantarse tras excepción HITL.

## Corrección documental F02 — HU → AC → tarea

Las 32 fichas mantienen sus historias e IDs originales. Cada ficha enlaza la definición canónica del AC y los IDs de entrega/verificación de `tasks.md`; esos enlaces no conceden autorización. Se corrigen relaciones por significado, no por posición numérica. La cobertura técnica de S0-01, S0-02, S0-10 y S1-06 permanece en las tareas de P0/P1/H02 aunque no tenga HU propia.

| HU | AC vinculados | Tareas relacionadas |
|---|---|---|
| [HU-SHELL-01](../../specs/H01-app-shell/stories/HU-SHELL-01.md) | AC-H01-01, AC-H01-02, AC-H01-03, AC-H01-04 | H01-T01, H01-T02, H01-T03, H01-T04 |
| [HU-CAT-01](../../specs/H02-catalog/stories/HU-CAT-01.md) | AC-H02-01, AC-H02-02 | H02-T01, H02-T05 |
| [HU-CAT-02](../../specs/H02-catalog/stories/HU-CAT-02.md) | AC-H02-03, AC-H02-04 | H02-T02, H02-T04, H02-T05 |
| [HU-CAT-03](../../specs/H02-catalog/stories/HU-CAT-03.md) | AC-H02-05 | H02-T03, H02-T05 |
| [HU-CAT-04](../../specs/H02-catalog/stories/HU-CAT-04.md) | AC-H02-04, AC-H02-06 | H02-T02, H02-T04, H02-T05 |
| [HU-PLAN-01](../../specs/H03-study-planning/stories/HU-PLAN-01.md) | AC-H03-01 | H03-T01, H03-T06 |
| [HU-PLAN-02](../../specs/H03-study-planning/stories/HU-PLAN-02.md) | AC-H03-02 | H03-T02, H03-T06 |
| [HU-PLAN-03](../../specs/H03-study-planning/stories/HU-PLAN-03.md) | AC-H03-03, AC-H03-04 | H03-T03, H03-T06 |
| [HU-PLAN-04](../../specs/H03-study-planning/stories/HU-PLAN-04.md) | AC-H03-05 | H03-T04, H03-T06 |
| [HU-PLAN-05](../../specs/H03-study-planning/stories/HU-PLAN-05.md) | AC-H03-06, AC-H03-07 | H03-T05, H03-T06 |
| [HU-DASH-01](../../specs/H04-dashboard/stories/HU-DASH-01.md) | AC-H04-01, AC-H04-02, AC-H04-05 | H04-T01, H04-T02, H04-T03, H04-T04 |
| [HU-DASH-02](../../specs/H04-dashboard/stories/HU-DASH-02.md) | AC-H04-03 | H04-T01, H04-T02, H04-T03, H04-T04 |
| [HU-DASH-03](../../specs/H04-dashboard/stories/HU-DASH-03.md) | AC-H04-02, AC-H04-04 | H04-T01, H04-T02, H04-T03, H04-T04 |
| [HU-EXAM-01](../../specs/H05-exam-engine/stories/HU-EXAM-01.md) | AC-H05-01 | H05-T01, H05-T06 |
| [HU-EXAM-02](../../specs/H05-exam-engine/stories/HU-EXAM-02.md) | AC-H05-02 | H05-T02, H05-T06 |
| [HU-EXAM-03](../../specs/H05-exam-engine/stories/HU-EXAM-03.md) | AC-H05-03, AC-H05-04 | H05-T03, H05-T04, H05-T06 |
| [HU-EXAM-04](../../specs/H05-exam-engine/stories/HU-EXAM-04.md) | AC-H05-04, AC-H05-05, AC-H05-07 | H05-T03, H05-T04, H05-T06 |
| [HU-EXAM-05](../../specs/H05-exam-engine/stories/HU-EXAM-05.md) | AC-H05-06 | H05-T05, H05-T06 |
| [HU-RES-01](../../specs/H06-results/stories/HU-RES-01.md) | AC-H06-01, AC-H06-02 | H06-T01, H06-T02, H06-T03, H06-T04 |
| [HU-RES-02](../../specs/H06-results/stories/HU-RES-02.md) | AC-H06-02, AC-H06-04 | H06-T01, H06-T02, H06-T03, H06-T04 |
| [HU-RES-03](../../specs/H06-results/stories/HU-RES-03.md) | AC-H06-03, AC-H06-04, AC-H06-05 | H06-T01, H06-T02, H06-T03, H06-T04 |
| [HU-REL-01](../../specs/H07-release-readiness/stories/HU-REL-01.md) | AC-H07-03 | H07-T03, H07-T04 |
| [HU-REL-02](../../specs/H07-release-readiness/stories/HU-REL-02.md) | AC-H07-04, AC-H07-05 | H07-T05, H07-T06 |
| [HU-SEC-01](../../specs/H07-release-readiness/stories/HU-SEC-01.md) | AC-H07-01, AC-H07-02 | H07-T01, H07-T02 |
| [HU-DEP-01](../../specs/H08-remote-release/stories/HU-DEP-01.md) | AC-H08-01, AC-H08-02, AC-H08-04 | H08-T01, H08-T02, H08-T03, H08-T04 |
| [HU-DEP-02](../../specs/H08-remote-release/stories/HU-DEP-02.md) | AC-H08-02, AC-H08-03, AC-H08-05 | H08-T02, H08-T04, H08-T05 |
| [HU-P0-01](../../specs/P0-worker-d1-foundation/stories/HU-P0-01.md) | AC-P0-01 | P0-T03 |
| [HU-P0-02](../../specs/P0-worker-d1-foundation/stories/HU-P0-02.md) | AC-P0-02, AC-P0-03 | P0-T04 |
| [HU-P0-03](../../specs/P0-worker-d1-foundation/stories/HU-P0-03.md) | AC-P0-04 | P0-T03 |
| [HU-P1-01](../../specs/P1-docker-reproducibility/stories/HU-P1-01.md) | AC-P1-01, AC-P1-04 | P1-T01, P1-T02 |
| [HU-P1-02](../../specs/P1-docker-reproducibility/stories/HU-P1-02.md) | AC-P1-02 | P1-T03, P1-T05 |
| [HU-P1-03](../../specs/P1-docker-reproducibility/stories/HU-P1-03.md) | AC-P1-03 | P1-T04 |

Los siete AC antes sin enlace explícito quedan asociados así: AC-H02-06 → HU-CAT-04; AC-H04-05 → HU-DASH-01; AC-H05-07 → HU-EXAM-04; AC-H06-05 → HU-RES-03; AC-H07-05 → HU-REL-02; AC-H08-04 → HU-DEP-01; AC-H08-05 → HU-DEP-02.

AC-H03-07 concreta las vistas semanal/calendario ya exigidas por S2-05 para HU-PLAN-05 y H03-T05/H03-T06. Se conservan los 51 AC anteriores y sus verificaciones; queda un total de 52 AC únicos en P0/P1/H01–H08. Ninguno se declara ejecutado o aceptado.

Esta corrección valida las relaciones documentales, no declara suficiente todo el diseño funcional. Los refinamientos de aceptación señalados por F07/F08/F11 (por ejemplo edición de metadatos, preferencias, reglas de métricas/examen y costes) siguen pendientes de autorización y G1 del hito correspondiente. No se sustituyen esos requisitos por un AC ajeno.

## Corrección F03 — entrada a H02

P0 y P1 son obligatorios para cerrar y aceptar S0 mediante A0-01..A0-10 antes de H02 integrado. H01 únicamente presentacional puede adelantarse con excepción HITL expresa y entorno UI utilizable demostrado; no hereda permiso H02. El entorno actual no se ha verificado (F04).
