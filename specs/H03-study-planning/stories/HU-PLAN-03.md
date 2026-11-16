# HU-PLAN-03 — Como usuario quiero marcar tareas y registrar minutos reales para medir avance

> **Borrador SDD; requiere HITL.** Hito `H03`; fuente original `S2-03`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero marcar tareas y registrar minutos reales para medir avance.

## Resultado observable
Reabrir/editar sin duplicar minutos.

## Escenarios de aceptación vinculados
- **AC-H03-03 — Estados:** Dada una tarea pendiente, cuando marco en curso/completada o la reabro, entonces el estado persiste tras recargar.
- **AC-H03-04 — Minutos:** Dada una tarea con 45 minutos, cuando la reabro y actualizo a 60, entonces el total queda 60 según el contrato aprobado, no 105 automáticamente.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /plans, /resources, /settings.
- Dependencias: H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL.
- Datos y servicios: Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H03-T03`.
- Evidencia mínima: Reabrir/editar sin duplicar minutos y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
