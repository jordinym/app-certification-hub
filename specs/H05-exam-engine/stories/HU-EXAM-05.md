# HU-EXAM-05 — Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota

> **Borrador SDD; requiere HITL.** Hito `H05`; fuente original `S3-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota.

## Resultado observable
Grading en servidor e idempotencia.

## Escenarios de aceptación vinculados
- **AC-H05-05 — Reanudación:** Dado intento activo con respuestas, cuando recargo y navego, entonces se restauran elecciones válidas sin cambiar estado del intento.
- **AC-H05-06 — Doble envío:** Dadas dos solicitudes concurrentes para enviar el mismo intento, cuando el servidor califica, entonces existe un único resultado final inmutable.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /simulations y /simulations/[attemptId].
- Dependencias: H02 versiones; P0 autorizado/persistente; aprobar editorialmente preguntas originales; definir tipos/duración/expiración.
- Datos y servicios: Pregunta revisada, selección, snapshots, navegación/reanudación, envío e idempotencia de nota calculada en servidor.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Generación IA, preguntas de exámenes reales copiadas, publicación automática sin revisión, umbral oficial no verificado.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H05-T05`.
- Evidencia mínima: Grading en servidor e idempotencia y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
