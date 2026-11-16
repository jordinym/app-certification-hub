# HU-PLAN-01 — Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas

> **Borrador SDD; requiere HITL.** Hito `H03`; fuente original `S2-01`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas.

## Resultado observable
Fecha solo día y zona IANA.

## Escenarios de aceptación vinculados
- **AC-H03-01 — Zona horaria:** Dada una tarea 2026-11-15, cuando cambio la zona IANA o visualizo en torno a medianoche, entonces la fecha de estudio no se mueve un día.
- **AC-H03-02 — Plan editable:** Dada la plantilla de 28 semanas, cuando cambio inicio, nombre o contenido, entonces guarda mis modificaciones sin volver a valores por defecto.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /plans, /resources, /settings.
- Dependencias: H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL.
- Datos y servicios: Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H03-T01`.
- Evidencia mínima: Fecha solo día y zona IANA y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
