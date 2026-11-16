# HU-PLAN-02 — Como usuario quiero crear y modificar un plan personal de 28 semanas para una certificación

> **Borrador SDD; requiere HITL.** Hito `H03`; fuente original `S2-02`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero crear y modificar un plan personal de 28 semanas para una certificación.

## Resultado observable
Inicio, rango y tareas editables; no oficial.

## Escenarios de aceptación vinculados
- **AC-H03-02 — Plan editable:** Dada la plantilla de 28 semanas, cuando cambio inicio, nombre o contenido, entonces guarda mis modificaciones sin volver a valores por defecto.
- **AC-H03-03 — Estados:** Dada una tarea pendiente, cuando marco en curso/completada o la reabro, entonces el estado persiste tras recargar.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /plans, /resources, /settings.
- Dependencias: H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL.
- Datos y servicios: Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H03-T02`.
- Evidencia mínima: Inicio, rango y tareas editables; no oficial y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
