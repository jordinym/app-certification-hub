# HU-CAT-03 — Como usuario quiero ver las versiones y dominios de examen asociados a su certificación

> **Borrador SDD; requiere HITL.** Hito `H02`; fuente original `S1-04`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero ver las versiones y dominios de examen asociados a su certificación.

## Resultado observable
Versión/domain coherentes, sin hechos supuestos.

## Escenarios de aceptación vinculados
- **AC-H02-03 — Alta proveedor agnóstico:** Dado un proveedor no registrado, cuando lo creo junto a una certificación válida, entonces al recargar aparecen con los mismos datos sin modificar código.
- **AC-H02-04 — Validaciones:** Dado un código duplicado dentro del proveedor, cuando envío el formulario, entonces recibo un error accionable sin inserción duplicada.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /certifications, /certifications/new, /certifications/[id].
- Dependencias: H01 AppShell; P0 Worker/D1, migraciones y autorización probadas; aprobación de alcance S1.
- Datos y servicios: Listado real, filtro/búsqueda, alta/edición, versiones/dominos, archivado, validación, estados y E2E.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Sin import automático de catálogos externos, planes ni simulacros, inventos de metadatos oficiales.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H02-T03`.
- Evidencia mínima: Versión/domain coherentes, sin hechos supuestos y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
