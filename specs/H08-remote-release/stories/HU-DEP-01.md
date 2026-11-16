# HU-DEP-01 — Como propietario quiero desplegar Certification Hub privado en Cloudflare sin exponer datos

> **Borrador SDD; requiere HITL.** Hito `H08`; fuente original `S4-07`. No implementar sin autorización de una tarea identificada.

## Historia
Como propietario quiero desplegar Certification Hub privado en Cloudflare sin exponer datos.

## Resultado observable
Access protege hosts y D1 remota es la elegida.

## Escenarios de aceptación vinculados
- **AC-H08-01 — Autorización:** Dada ausencia de aprobación GR, cuando se inicia H08, entonces ningún comando remoto se ejecuta.
- **AC-H08-02 — Protección:** Dado Worker remoto creado, cuando usuario anónimo llama URL de prod o preview, entonces no accede a datos ni escrituras.

Todos los escenarios del hito siguen siendo obligatorios en conjunto: [`spec.md`](../spec.md). La selección anterior es la vinculación principal, no una renuncia de otros AC.

## Diseño y datos
- Pantallas/API: Worker remoto protegido y D1 remota, acceso con identidad aprobada.
- Dependencias: H07 aceptado; autorización remota separada con cuenta, nombres, costes, bindings, plan de reversión.
- Datos y servicios: Recursos mínimos revisados, migraciones/seed remoto explícitos, deploy manual, validación acceso/persistencia y runbook.
- Validación servidor y autorización para cualquier escritura; no confundir fixtures UI con persistencia D1.
- Fuera de alcance: Automatizar CI/CD sin deploy manual exitoso; borrar recursos o datos sin confirmación independiente.
- Decisión de implementación: revisar [`design.md`](../design.md) y resolver ambigüedades con HITL.

## Tareas y evidencia
- Tareas relacionadas: `H08-T01`, `H08-T02`, `H08-T03`, `H08-T04`.
- Evidencia mínima: Access protege hosts y D1 remota es la elegida y una ejecución reproducible de los AC vinculados, con PASS/FAIL/NOT RUN.
- Registro de cierre en [`verification.md`](../verification.md) con resultado, entorno, cambios y aceptación humana.
- **Estado:** PROPOSED / NO IMPLEMENTACIÓN AUTORIZADA.
