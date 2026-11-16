# HU-CAT-03 — Como usuario quiero ver las versiones y dominios de examen asociados a su certificación

> **Borrador SDD; requiere HITL.** Hito `H02`; fuente original `S1-04`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero ver las versiones y dominios de examen asociados a su certificación.

## Resultado observable
Versión/domain coherentes, sin hechos supuestos.

## Escenarios de aceptación vinculados (F02)

- [AC-H02-05 — Versiones y dominios](../spec.md) → `H02-T03`, `H02-T05`.

Definiciones completas en [spec.md](../spec.md); tareas en [tasks.md](../tasks.md). Los enlaces indican entrega y evidencia, no permisos de ejecución. Todos los AC del hito permanecen obligatorios; ningún criterio se elimina por corregir su asociación.

## Diseño y datos
- Pantallas/API: /certifications, /certifications/new, /certifications/[id].
- Dependencias: H01 AppShell; S0 cerrado y aceptado mediante P0+P1 y A0-01..A0-10, incluyendo Worker/D1, migraciones y autorización probadas; aprobación de alcance S1 y G1/G2 propios de H02 (F03).
- Datos y servicios: Listado real, filtro/búsqueda, alta/edición, versiones/dominos, archivado, validación, estados y E2E.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Sin import automático de catálogos externos, planes ni simulacros, inventos de metadatos oficiales.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H02-T03`, `H02-T05`.
- Evidencia mínima: Versión/domain coherentes, sin hechos supuestos y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
