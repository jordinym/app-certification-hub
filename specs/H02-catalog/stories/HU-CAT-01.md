# HU-CAT-01 — Como usuario quiero explorar las certificaciones por proveedor y encontrar un código o nombre rápidamente

> **Borrador SDD; requiere HITL.** Hito `H02`; fuente original `S1-02`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero explorar las certificaciones por proveedor y encontrar un código o nombre rápidamente.

## Resultado observable
Filtro y búsqueda con datos reales de D1 y estados vacíos.

## Escenarios de aceptación vinculados
- **AC-H02-01 — Listado D1:** Dado catálogo sembrado, cuando entro en /certifications, entonces visualizo los cinco códigos Microsoft; GitHub aparece como proveedor sin certificaciones inventadas.
- **AC-H02-02 — Búsqueda y filtro:** Dada una lista mixta, cuando filtro GitHub o busco por código/nombre, entonces se muestran solo coincidencias y un estado vacío correcto.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /certifications, /certifications/new, /certifications/[id].
- Dependencias: H01 AppShell; P0 Worker/D1, migraciones y autorización probadas; aprobación de alcance S1.
- Datos y servicios: Listado real, filtro/búsqueda, alta/edición, versiones/dominos, archivado, validación, estados y E2E.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Sin import automático de catálogos externos, planes ni simulacros, inventos de metadatos oficiales.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H02-T01`.
- Evidencia mínima: Filtro y búsqueda con datos reales de D1 y estados vacíos y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
