# HU-PLAN-01 — Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas

> **Borrador SDD; requiere HITL.** Hito `H03`; fuente original `S2-01`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas.

## Resultado observable
Fecha solo día y zona IANA.

## Escenarios de aceptación vinculados (F02)

- [AC-H03-01 — Zona horaria](../spec.md) → `H03-T01`, `H03-T06`.

Definiciones completas en [spec.md](../spec.md); tareas en [tasks.md](../tasks.md). Los enlaces indican entrega y evidencia, no permisos de ejecución. Todos los AC del hito permanecen obligatorios; ningún criterio se elimina por corregir su asociación.

## Diseño y datos
- Pantallas/API: /plans, /resources, /settings.
- Dependencias: H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL.
- Datos y servicios: Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H03-T01`, `H03-T06`.
- Evidencia mínima: Fecha solo día y zona IANA y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
