# HU-PLAN-05 — Como usuario quiero consultar mis tareas por semana y calendario

> **Borrador SDD; requiere HITL.** Hito `H03`; fuente original `S2-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero consultar mis tareas por semana y calendario.

## Resultado observable
Vista coherente con persistencia.

## Escenarios de aceptación vinculados
- **AC-H03-05 — Recursos:** Dado un enlace no válido o alcance incompatible, cuando envío el recurso, entonces se rechaza server-side.
- **AC-H03-06 — Lista vacía:** Dado que no hay plan, cuando entro en /plans, entonces aparece invitación a crear uno, sin progreso inventado.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: /plans, /resources, /settings.
- Dependencias: H02 funcional; P0 validado; definir fecha de inicio, zona y reglas de minutos en HITL.
- Datos y servicios: Zona horaria, fechas date-only, plantilla de 28 semanas editable, tareas, registro de minutos, fuentes de recursos y vistas semanal/calendario.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Calendario oficial de Microsoft, recordatorios, automatización, tabla de sesiones si no se autoriza.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H03-T05`.
- Evidencia mínima: Vista coherente con persistencia y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
