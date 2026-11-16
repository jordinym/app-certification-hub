# HU-DASH-02 — Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación

> **Borrador SDD; requiere HITL.** Hito `H04`; fuente original `S2-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación.

## Resultado observable
Tareas persistidas y filtro coherente.

## Escenarios de aceptación vinculados (F02)

- [AC-H04-03 — Proveedor](../spec.md) → `H04-T02`, `H04-T03`, `H04-T04`.

Definiciones completas en [spec.md](../spec.md); tareas en [tasks.md](../tasks.md). Los enlaces indican entrega y evidencia, no permisos de ejecución. Todos los AC del hito permanecen obligatorios; ningún criterio se elimina por corregir su asociación.

## Diseño y datos
- Pantallas/API: / (dashboard).
- Dependencias: H03 persistente; definición HITL del denominador del progreso y tareas archivadas.
- Datos y servicios: Progreso agregado por proveedor/certificación, plan actual, próximas tareas y filtros.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Valores ilustrativos del mockup; métricas de simulacros inexistentes; analítica predictiva.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H04-T01`, `H04-T02`, `H04-T03`, `H04-T04`.
- Evidencia mínima: Tareas persistidas y filtro coherente y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
