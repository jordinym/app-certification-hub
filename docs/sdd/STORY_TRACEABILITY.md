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
