# HU-EXAM-03 — Como usuario quiero que mi intento preserve el contenido de las preguntas aunque el banco cambie

> **Borrador SDD; requiere HITL.** Hito `H05`; fuente original `S3-03`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero que mi intento preserve el contenido de las preguntas aunque el banco cambie.

## Resultado observable
Snapshot versionado.

## Escenarios de aceptación vinculados
- **AC-H05-03 — Snapshot:** Dado intento iniciado, cuando se edita luego el banco, entonces contenido, opciones, dominio y claves usadas para ese intento permanecen congeladas.
- **AC-H05-04 — Respuesta segura:** Dado intento activo, cuando el cliente inspecciona HTML/RSC/JSON, entonces no obtiene respuestas correctas ni explicaciones prematuras.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /simulations y /simulations/[attemptId].
- Dependencias: H02 versiones; P0 autorizado/persistente; aprobar editorialmente preguntas originales; definir tipos/duración/expiración.
- Datos y servicios: Pregunta revisada, selección, snapshots, navegación/reanudación, envío e idempotencia de nota calculada en servidor.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Generación IA, preguntas de exámenes reales copiadas, publicación automática sin revisión, umbral oficial no verificado.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H05-T03`.
- Evidencia mínima: Snapshot versionado y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
