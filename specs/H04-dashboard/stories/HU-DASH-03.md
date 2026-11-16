# HU-DASH-03 — Como usuario quiero que métricas sean exactas incluso cuando reabro o archivo tareas

> **Borrador SDD; requiere HITL.** Hito `H04`; fuente original `S2-06`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero que métricas sean exactas incluso cuando reabro o archivo tareas.

## Resultado observable
Agregados consistentes.

## Escenarios de aceptación vinculados
- **AC-H04-03 — Proveedor:** Dadas tareas de distintos proveedores, cuando filtro uno, entonces los KPIs y próximas tareas usan exclusivamente ese conjunto.
- **AC-H04-04 — Consistencia:** Dada una tarea cuyo estado/minutos cambian, cuando recargo, entonces resumen y plan coinciden.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: / (dashboard).
- Dependencias: H03 persistente; definición HITL del denominador del progreso y tareas archivadas.
- Datos y servicios: Progreso agregado por proveedor/certificación, plan actual, próximas tareas y filtros.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Valores ilustrativos del mockup; métricas de simulacros inexistentes; analítica predictiva.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H04-T04`.
- Evidencia mínima: Agregados consistentes y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
