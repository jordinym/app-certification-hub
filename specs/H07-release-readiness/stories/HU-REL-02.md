# HU-REL-02 — Como propietario quiero una recuperación comprobable y una UI accesible antes de publicar

> **Borrador SDD; requiere HITL.** Hito `H07`; fuente original `S4-05/S4-06`. No implementar sin autorización de una tarea identificada.

## Historia
Como propietario quiero una recuperación comprobable y una UI accesible antes de publicar.

## Resultado observable
Restauración ensayada y journeys E2E.

## Escenarios de aceptación vinculados
- **AC-H07-03 — Origen alterno:** Dadas rutas preview o subdominios no previstos, cuando se intenta acceso, entonces están protegidos o deshabilitados.
- **AC-H07-04 — Restauración:** Dado backup de prueba, cuando se restaura a entorno aislado, entonces recuentos e integridad coinciden.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: Aplicación y todas las APIs; plan remoto sin ejecución.
- Dependencias: H02-H06 verificadas para journeys; P1 cerrada para reproducción Docker; HITL de diseño Access.
- Datos y servicios: Revisar lecturas y mutaciones, Access JWT/identidad, manual de protección, backup/restore y E2E responsive.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Crear DB/Worker Cloudflare, desplegar o activar costes; eso corresponde H08.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H07-T05`, `H07-T06`.
- Evidencia mínima: Restauración ensayada y journeys E2E y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
