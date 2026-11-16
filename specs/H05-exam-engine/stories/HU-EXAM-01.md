# HU-EXAM-01 — Como administrador del contenido quiero crear y revisar preguntas originales para practicar con material fiable

> **Borrador SDD; requiere HITL.** Hito `H05`; fuente original `S3-01`. No implementar sin autorización de una tarea identificada.

## Historia
Como administrador del contenido quiero crear y revisar preguntas originales para practicar con material fiable.

## Resultado observable
Estado de revisión y publicación explícita.

## Escenarios de aceptación vinculados
- **AC-H05-01 — Revisión:** Dada pregunta no revisada o sin publicación, cuando se construye un simulacro, entonces no aparece en el conjunto elegible.
- **AC-H05-02 — Sin preguntas:** Dada versión sin preguntas publicadas, cuando intento iniciar, entonces veo estado vacío y no se crea un intento inválido.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /simulations y /simulations/[attemptId].
- Dependencias: H02 versiones; P0 autorizado/persistente; aprobar editorialmente preguntas originales; definir tipos/duración/expiración.
- Datos y servicios: Pregunta revisada, selección, snapshots, navegación/reanudación, envío e idempotencia de nota calculada en servidor.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Generación IA, preguntas de exámenes reales copiadas, publicación automática sin revisión, umbral oficial no verificado.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H05-T01`.
- Evidencia mínima: Estado de revisión y publicación explícita y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
