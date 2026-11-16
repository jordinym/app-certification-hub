# HU-DASH-01 — Como usuario quiero un resumen del progreso de mi preparación para priorizar qué estudiar

> **Borrador SDD; requiere HITL.** Hito `H04`; fuente original `S2-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero un resumen del progreso de mi preparación para priorizar qué estudiar.

## Resultado observable
Datos agregados desde D1.

## Escenarios de aceptación vinculados (F02)

- [AC-H04-01 — Sin datos](../spec.md) → `H04-T03`, `H04-T04`.
- [AC-H04-02 — Progreso](../spec.md) → `H04-T01`, `H04-T02`, `H04-T03`, `H04-T04`.
- [AC-H04-05 — Visual](../spec.md) → `H04-T03`, `H04-T04`.

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
- Evidencia mínima: Datos agregados desde D1 y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
