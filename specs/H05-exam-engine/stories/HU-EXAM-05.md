# HU-EXAM-05 — Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota

> **Borrador SDD; requiere HITL.** Hito `H05`; fuente original `S3-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota.

## Resultado observable
Grading en servidor e idempotencia.

## Escenarios de aceptación vinculados (F02)

- [AC-H05-06 — Doble envío](../spec.md) → `H05-T05`, `H05-T06`.

Definiciones completas en [spec.md](../spec.md); tareas en [tasks.md](../tasks.md). Los enlaces indican entrega y evidencia, no permisos de ejecución. Todos los AC del hito permanecen obligatorios; ningún criterio se elimina por corregir su asociación.

## Diseño y datos
- Pantallas/API: /simulations y /simulations/[attemptId].
- Dependencias: H02 versiones; P0 autorizado/persistente; aprobar editorialmente preguntas originales; definir tipos/duración/expiración.
- Datos y servicios: Pregunta revisada, selección, snapshots, navegación/reanudación, envío e idempotencia de nota calculada en servidor.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Generación IA, preguntas de exámenes reales copiadas, publicación automática sin revisión, umbral oficial no verificado.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H05-T05`, `H05-T06`.
- Evidencia mínima: Grading en servidor e idempotencia y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
