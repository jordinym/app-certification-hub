# H02 — Catálogo de proveedores y certificaciones · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** FEATURE/UI  
**IDs originales:** `S1-02`, `S1-03`, `S1-04`, `S1-05`, `S1-06`  
**Dependencias:** H01 AppShell; P0 Worker/D1, migraciones y autorización probadas; aprobación de alcance S1  
**Superficies:** /certifications, /certifications/new, /certifications/[id]

## Resultado de producto
Listado real, filtro/búsqueda, alta/edición, versiones/dominos, archivado, validación, estados y E2E.

## Historias de usuario
### HU-CAT-01 — Como usuario quiero explorar las certificaciones por proveedor y encontrar un código o nombre rápidamente
- Origen: `S1-02`
- Evidencia esperada: Filtro y búsqueda con datos reales de D1 y estados vacíos

### HU-CAT-02 — Como usuario quiero registrar o editar proveedor y certificación para organizar estudios de cualquier proveedor
- Origen: `S1-03`
- Evidencia esperada: Persistencia real; Zod y errores de unicidad

### HU-CAT-03 — Como usuario quiero ver las versiones y dominios de examen asociados a su certificación
- Origen: `S1-04`
- Evidencia esperada: Versión/domain coherentes, sin hechos supuestos

### HU-CAT-04 — Como usuario quiero archivar un registro sin perder el historial ni integridad referencial
- Origen: `S1-05`
- Evidencia esperada: Archivado seguro y mensajes de error claros

## Criterios de aceptación verificables (Given / When / Then)
**AC-H02-01 — Listado D1**

Dado catálogo sembrado, cuando entro en /certifications, entonces visualizo los cinco códigos Microsoft; GitHub aparece como proveedor sin certificaciones inventadas.

**AC-H02-02 — Búsqueda y filtro**

Dada una lista mixta, cuando filtro GitHub o busco por código/nombre, entonces se muestran solo coincidencias y un estado vacío correcto.

**AC-H02-03 — Alta proveedor agnóstico**

Dado un proveedor no registrado, cuando lo creo junto a una certificación válida, entonces al recargar aparecen con los mismos datos sin modificar código.

**AC-H02-04 — Validaciones**

Dado un código duplicado dentro del proveedor, cuando envío el formulario, entonces recibo un error accionable sin inserción duplicada.

**AC-H02-05 — Versiones y dominios**

Dadas varias versiones, cuando abro detalle, entonces cada dominio corresponde a su versión y se rechaza asociación cruzada.

**AC-H02-06 — Archivado**

Dado un registro con historial, cuando lo archivo, entonces no se elimina el historial y la UI refleja estado archivado.

## Restricciones y límites
- Fuera de alcance: Sin import automático de catálogos externos, planes ni simulacros, inventos de metadatos oficiales.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
