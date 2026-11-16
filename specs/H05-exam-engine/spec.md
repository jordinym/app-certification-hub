# H05 — Banco revisado y simulaciones de práctica · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** FEATURE/UI/SECURITY  
**IDs originales:** `S3-01`, `S3-02`, `S3-03`, `S3-04`, `S3-05`, `S3-07`  
**Dependencias:** H02 versiones; P0 autorizado/persistente; aprobar editorialmente preguntas originales; definir tipos/duración/expiración  
**Superficies:** /simulations y /simulations/[attemptId]

## Resultado de producto
Pregunta revisada, selección, snapshots, navegación/reanudación, envío e idempotencia de nota calculada en servidor.

## Historias de usuario
### HU-EXAM-01 — Como administrador del contenido quiero crear y revisar preguntas originales para practicar con material fiable
- Origen: `S3-01`
- Evidencia esperada: Estado de revisión y publicación explícita

### HU-EXAM-02 — Como usuario quiero seleccionar simulacro por certificación y versión según disponibilidad
- Origen: `S3-02`
- Evidencia esperada: Cero preguntas no inicia intento

### HU-EXAM-03 — Como usuario quiero que mi intento preserve el contenido de las preguntas aunque el banco cambie
- Origen: `S3-03`
- Evidencia esperada: Snapshot versionado

### HU-EXAM-04 — Como usuario quiero responder, navegar, reanudar y confirmar antes de enviar
- Origen: `S3-04`
- Evidencia esperada: Selecciones persistentes y validadas

### HU-EXAM-05 — Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota
- Origen: `S3-05`
- Evidencia esperada: Grading en servidor e idempotencia

## Criterios de aceptación verificables (Given / When / Then)
**AC-H05-01 — Revisión**

Dada pregunta no revisada o sin publicación, cuando se construye un simulacro, entonces no aparece en el conjunto elegible.

**AC-H05-02 — Sin preguntas**

Dada versión sin preguntas publicadas, cuando intento iniciar, entonces veo estado vacío y no se crea un intento inválido.

**AC-H05-03 — Snapshot**

Dado intento iniciado, cuando se edita luego el banco, entonces contenido, opciones, dominio y claves usadas para ese intento permanecen congeladas.

**AC-H05-04 — Respuesta segura**

Dado intento activo, cuando el cliente inspecciona HTML/RSC/JSON, entonces no obtiene respuestas correctas ni explicaciones prematuras.

**AC-H05-05 — Reanudación**

Dado intento activo con respuestas, cuando recargo y navego, entonces se restauran elecciones válidas sin cambiar estado del intento.

**AC-H05-06 — Doble envío**

Dadas dos solicitudes concurrentes para enviar el mismo intento, cuando el servidor califica, entonces existe un único resultado final inmutable.

**AC-H05-07 — Validación**

Dada selección de opción ajena a la pregunta, cuando se envía, entonces se rechaza sin escribir estado inválido.

## Restricciones y límites
- Fuera de alcance: Generación IA, preguntas de exámenes reales copiadas, publicación automática sin revisión, umbral oficial no verificado.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
