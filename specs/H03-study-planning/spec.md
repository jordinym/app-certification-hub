# H03 — Plan de estudio, tareas, recursos y preferencias · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** FEATURE/UI  
**IDs originales:** `S2-01`, `S2-02`, `S2-03`, `S2-04`, `S2-05`, `S2-06`  
**Dependencias:** H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL  
**Superficies:** /plans, /resources, /settings

## Resultado de producto
Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.

## Historias de usuario
### HU-PLAN-01 — Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas
- Origen: `S2-01`
- Evidencia esperada: Fecha solo día y zona IANA

### HU-PLAN-02 — Como usuario quiero crear y modificar un plan personal de 28 semanas para una certificación
- Origen: `S2-02`
- Evidencia esperada: Inicio, rango y tareas editables; no oficial

### HU-PLAN-03 — Como usuario quiero marcar tareas y registrar minutos reales para medir avance
- Origen: `S2-03`
- Evidencia esperada: Reabrir/editar sin duplicar minutos

### HU-PLAN-04 — Como usuario quiero organizar enlaces confiables de aprendizaje relacionados con mi certificación
- Origen: `S2-04`
- Evidencia esperada: URL validada y asociación coherente

### HU-PLAN-05 — Como usuario quiero consultar mis tareas por semana y calendario
- Origen: `S2-05`
- Evidencia esperada: Vista coherente con persistencia

## Criterios de aceptación verificables (Given / When / Then)
**AC-H03-01 — Zona horaria**

Dada una tarea 2026-11-15, cuando cambio la zona IANA o visualizo en torno a medianoche, entonces la fecha de estudio no se mueve un día.

**AC-H03-02 — Plan editable**

Dada la plantilla de 28 semanas, cuando cambio inicio, nombre o contenido, entonces guarda mis modificaciones sin volver a valores por defecto.

**AC-H03-03 — Estados**

Dada una tarea pendiente, cuando marco en curso/completada o la reabro, entonces el estado persiste tras recargar.

**AC-H03-04 — Minutos**

Dada una tarea con 45 minutos, cuando la reabro y actualizo a 60, entonces el total queda 60 según el contrato aprobado, no 105 automáticamente.

**AC-H03-05 — Recursos**

Dado un enlace no válido o alcance incompatible, cuando envío el recurso, entonces se rechaza server-side.

**AC-H03-06 — Lista vacía**

Dado que no hay plan, cuando entro en /plans, entonces aparece invitación a crear uno, sin progreso inventado.

## Restricciones y límites
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
