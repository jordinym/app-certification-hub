# HU-DEP-02 — Como usuario quiero que mis cambios remotos persistan y sigan protegidos tras una nueva publicación

> **Borrador SDD; requiere HITL.** Hito `H08`; fuente original `S4-08`. No implementar sin autorización de una tarea identificada.

## Historia
Como usuario quiero que mis cambios remotos persistan y sigan protegidos tras una nueva publicación.

## Resultado observable
Persistencia real y runbook operativo.

## Escenarios de aceptación vinculados (F02)

- [AC-H08-02 — Protección](../spec.md) → `H08-T02`, `H08-T04`.
- [AC-H08-03 — Datos remotos](../spec.md) → `H08-T04`.
- [AC-H08-05 — Cierre](../spec.md) → `H08-T05`.

Definiciones completas en [spec.md](../spec.md); tareas en [tasks.md](../tasks.md). Los enlaces indican entrega y evidencia, no permisos de ejecución. Todos los AC del hito permanecen obligatorios; ningún criterio se elimina por corregir su asociación.

## Diseño y datos
- Pantallas/API: Worker remoto protegido y D1 remota, acceso con identidad aprobada.
- Dependencias: H07 aceptado; autorización remota separada con cuenta, nombres, costes, bindings, plan de reversión.
- Datos y servicios: Recursos mínimos revisados, migraciones/seed remoto explícitos, deploy manual, validación acceso/persistencia y runbook.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Automatizar CI/CD sin deploy manual exitoso; borrar recursos o datos sin confirmación independiente.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H08-T02`, `H08-T04`, `H08-T05`.
- Evidencia mínima: Persistencia real y runbook operativo y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
