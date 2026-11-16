# HU-RES-01 — Como usuario quiero ver mi porcentaje de práctica y un resumen del intento terminado

> **Borrador SDD; requiere HITL.** Hito `H06`; fuente original `S3-06`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero ver mi porcentaje de práctica y un resumen del intento terminado.

## Resultado observable
Sólo después de envío.

## Escenarios de aceptación vinculados
- **AC-H06-01 — Preenvío:** Dado intento en curso, cuando solicito /results/id, entonces no veo notas, claves ni explicaciones.
- **AC-H06-02 — Postenvío:** Dado intento terminado, cuando entro en resultados, entonces veo preguntas calificadas, explicación y porcentaje de práctica coherente.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /results/[attemptId].
- Dependencias: H05 envío/calificación validado; snapshots privados intactos.
- Datos y servicios: Puntuación de práctica, explicaciones posteriores al envío, revisión por pregunta y desglose por dominio.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Puntuación escalada oficial, recomendaciones automáticas no aprobadas, revisión pre-envío.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H06-T01`, `H06-T02`, `H06-T03`.
- Evidencia mínima: Sólo después de envío y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
