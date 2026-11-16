# H08 — Despliegue remoto autorizado y operación · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** RELEASE  
**IDs originales:** `S4-07`, `S4-08`  
**Dependencias:** H07 aceptado; autorización remota separada con cuenta, nombres, costes, bindings, plan de reversión  
**Superficies:** Worker remoto protegido y D1 remota, acceso con identidad aprobada

## Resultado de producto
Recursos mínimos revisados, migraciones/seed remoto explícitos, deploy manual, validación acceso/persistencia y runbook.

## Historias de usuario
### HU-DEP-01 — Como propietario quiero desplegar Certification Hub privado en Cloudflare sin exponer datos
- Origen: `S4-07`
- Evidencia esperada: Access protege hosts y D1 remota es la elegida

### HU-DEP-02 — Como usuario quiero que mis cambios remotos persistan y sigan protegidos tras una nueva publicación
- Origen: `S4-08`
- Evidencia esperada: Persistencia real y runbook operativo

## Criterios de aceptación verificables (Given / When / Then)
**AC-H08-01 — Autorización**

Dada ausencia de aprobación GR, cuando se inicia H08, entonces ningún comando remoto se ejecuta.

**AC-H08-02 — Protección**

Dado Worker remoto creado, cuando usuario anónimo llama URL de prod o preview, entonces no accede a datos ni escrituras.

**AC-H08-03 — Datos remotos**

Dado usuario autorizado, cuando crea una certificación y vuelve a cargar tras despliegue, entonces conserva ID y datos en D1 remota.

**AC-H08-04 — Separación de entornos**

Dada D1 local y remota distintas, cuando corro seed/migración remota explícita, entonces no uso la DB local por defecto.

**AC-H08-05 — Cierre**

Dado release verificado, cuando documentamos ejecución, entonces quedan runbook, rollback, backup y resultados reales, sin afirmar pruebas no realizadas.

## Restricciones y límites
- Fuera de alcance: Automatizar CI/CD sin deploy manual exitoso; borrar recursos o datos sin confirmación independiente.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
