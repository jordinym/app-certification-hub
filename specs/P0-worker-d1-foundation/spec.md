# P0 — Worker, D1 y seguridad local mínima · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** PLATFORM  
**IDs originales:** `S0-01`, `S0-02`, `S0-03`, `S0-05`, `S0-06`, `S0-07`  
**Dependencias:** S0 existente; compatibilidad real del adaptador pendiente  
**Superficies:** API local protegida y página mínima de diagnóstico; no CRUD público

## Resultado de producto
Aplicación Next/OpenNext/Worker y D1/Drizzle reales, esquema y seed idempotente, frontera de autorización.

## Historias de usuario
### HU-P0-01 — Como desarrollador quiero ejecutar una petición en Worker que escriba y lea una fila mediante Drizzle/D1 para confirmar compatibilidad
- Origen: `S0-03`
- Evidencia esperada: Worker preview real, no solo next dev ni CLI

### HU-P0-02 — Como desarrollador quiero migraciones y seeds reproducibles sin perder datos existentes
- Origen: `S0-05/S0-06`
- Evidencia esperada: Proveedores Microsoft/GitHub; cinco códigos; reejecución segura

### HU-P0-03 — Como propietario quiero que el endpoint de diagnóstico sea accesible solo en modo local autorizado
- Origen: `S0-07`
- Evidencia esperada: Rechazo de mutaciones sin token y de ruta remota no habilitada

## Criterios de aceptación verificables (Given / When / Then)
**AC-P0-01 — Worker y D1**

Dado el Worker preview con DB local migrada, cuando una solicitud autorizada crea y consulta un registro, entonces recupera el mismo ID y contenido mediante repositorio Drizzle y binding DB.

**AC-P0-02 — Integridad**

Dado un D1 limpio, cuando se migra y siembra dos veces, entonces existen dos proveedores base y cinco certificaciones sin duplicados; valores personalizados no se sobrescriben.

**AC-P0-03 — Relaciones inválidas**

Dada una versión y dominio de otra certificación, cuando se intenta relacionarlos incorrectamente, entonces la restricción SQL o validación transaccional rechaza la operación.

**AC-P0-04 — Seguridad**

Dada una petición sin credenciales correctas o una configuración remota no aprobada, cuando intenta escribir, entonces se rechaza sin cambios persistidos.

## Restricciones y límites
- Fuera de alcance: UI catálogo completa; despliegue remoto; cambios arbitrarios de stack.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
