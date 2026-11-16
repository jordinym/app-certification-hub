# H06 — Resultados, revisión y dominio débil · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** FEATURE/UI  
**IDs originales:** `S3-06`, `S3-07`  
**Dependencias:** H05 envío/calificación validado; snapshots privados intactos  
**Superficies:** /results/[attemptId]

## Resultado de producto
Puntuación de práctica, explicaciones posteriores al envío, revisión por pregunta y desglose por dominio.

## Historias de usuario
### HU-RES-01 — Como usuario quiero ver mi porcentaje de práctica y un resumen del intento terminado
- Origen: `S3-06`
- Evidencia esperada: Sólo después de envío

### HU-RES-02 — Como usuario quiero revisar explicaciones para aprender de cada pregunta
- Origen: `S3-06`
- Evidencia esperada: Contenido respaldado por snapshot

### HU-RES-03 — Como usuario quiero identificar dominios de menor desempeño para priorizar estudio
- Origen: `S3-06/S3-07`
- Evidencia esperada: Conteo correcto por dominio

## Criterios de aceptación verificables (Given / When / Then)
**AC-H06-01 — Preenvío**

Dado intento en curso, cuando solicito /results/id, entonces no veo notas, claves ni explicaciones.

**AC-H06-02 — Postenvío**

Dado intento terminado, cuando entro en resultados, entonces veo preguntas calificadas, explicación y porcentaje de práctica coherente.

**AC-H06-03 — Dominio**

Dadas preguntas de dos dominios, cuando consulto desglose, entonces el denominador y el número correcto por dominio respetan el snapshot.

**AC-H06-04 — Integridad**

Dado banco modificado después del intento, cuando consulto resultados históricos, entonces se mantienen resultados y explicaciones congeladas.

**AC-H06-05 — Responsive**

Dada pantalla de referencia, cuando reviso móvil, entonces desglose y navegación por respuestas permanecen legibles y accesibles.

## Restricciones y límites
- Fuera de alcance: Puntuación escalada oficial, recomendaciones automáticas no aprobadas, revisión pre-envío.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
