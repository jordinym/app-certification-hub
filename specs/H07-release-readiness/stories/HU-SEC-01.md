# HU-SEC-01 — Como propietario quiero que nadie sin autorización vea datos privados o modifique datos

> **Borrador SDD; requiere HITL.** Hito `H07`; fuente original `S4-01/S4-02`. No implementar sin autorización de una tarea identificada.

## Historia
Como propietario quiero que nadie sin autorización vea datos privados o modifique datos.

## Resultado observable
Pruebas negativas de lecturas y mutaciones.

## Escenarios de aceptación vinculados
- **AC-H07-01 — Acceso denegado:** Dadas llamadas directas anónimas a endpoints privados, cuando se leen o mutan datos, entonces todos niegan acceso.
- **AC-H07-02 — JWT inválido:** Dado JWT ausente, caducado, con firma, issuer, audience o identidad inválidos, cuando se solicita servicio, entonces se deniega.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: Aplicación y todas las APIs; plan remoto sin ejecución.
- Dependencias: H02-H06 verificadas para journeys; P1 cerrada para reproducción Docker; HITL de diseño Access.
- Datos y servicios: Revisar lecturas y mutaciones, Access JWT/identidad, manual de protección, backup/restore y E2E responsive.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Crear DB/Worker Cloudflare, desplegar o activar costes; eso corresponde H08.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H07-T01`, `H07-T02`.
- Evidencia mínima: Pruebas negativas de lecturas y mutaciones y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
