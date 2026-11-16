# HU-DASH-02 — Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación

> **Borrador SDD; requiere HITL.** Hito `H04`; fuente original `S2-05`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación.

## Resultado observable
Tareas persistidas y filtro coherente.

## Escenarios de aceptación vinculados
- **AC-H04-02 — Progreso:** Dadas cuatro tareas elegibles y dos completadas, cuando consulto la métrica definida, entonces refleja 50 % y cambia tras reabrir una.
- **AC-H04-03 — Proveedor:** Dadas tareas de distintos proveedores, cuando filtro uno, entonces los KPIs y próximas tareas usan exclusivamente ese conjunto.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: / (dashboard).
- Dependencias: H03 persistente; definición HITL del denominador del progreso y tareas archivadas.
- Datos y servicios: Progreso agregado por proveedor/certificación, plan actual, próximas tareas y filtros.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Valores ilustrativos del mockup; métricas de simulacros inexistentes; analítica predictiva.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H04-T01`, `H04-T02`, `H04-T03`.
- Evidencia mínima: Tareas persistidas y filtro coherente y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
