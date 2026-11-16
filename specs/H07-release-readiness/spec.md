# H07 — Seguridad, accesibilidad y preparación de release · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** SECURITY/QA/RELEASE  
**IDs originales:** `S4-01`, `S4-02`, `S4-03`, `S4-04`, `S4-05`, `S4-06`  
**Dependencias:** H02-H06 verificadas para journeys; P1 cerrada para reproducción Docker; HITL de diseño Access  
**Superficies:** Aplicación y todas las APIs; plan remoto sin ejecución

## Resultado de producto
Revisar lecturas y mutaciones, Access JWT/identidad, manual de protección, backup/restore y E2E responsive.

## Historias de usuario
### HU-SEC-01 — Como propietario quiero que nadie sin autorización vea datos privados o modifique datos
- Origen: `S4-01/S4-02`
- Evidencia esperada: Pruebas negativas de lecturas y mutaciones

### HU-REL-01 — Como operador quiero un plan seguro de Access, secretos, bindings y costes
- Origen: `S4-03/S4-04`
- Evidencia esperada: Runbook revisado antes de recursos reales

### HU-REL-02 — Como propietario quiero una recuperación comprobable y una UI accesible antes de publicar
- Origen: `S4-05/S4-06`
- Evidencia esperada: Restauración ensayada y journeys E2E

## Criterios de aceptación verificables (Given / When / Then)
**AC-H07-01 — Acceso denegado**

Dadas llamadas directas anónimas a endpoints privados, cuando se leen o mutan datos, entonces todos niegan acceso.

**AC-H07-02 — JWT inválido**

Dado JWT ausente, caducado, con firma, issuer, audience o identidad inválidos, cuando se solicita servicio, entonces se deniega.

**AC-H07-03 — Origen alterno**

Dadas rutas preview o subdominios no previstos, cuando se intenta acceso, entonces están protegidos o deshabilitados.

**AC-H07-04 — Restauración**

Dado backup de prueba, cuando se restaura a entorno aislado, entonces recuentos e integridad coinciden.

**AC-H07-05 — Accesibilidad**

Dado flujo principal en móvil y teclado, cuando navego formularios, planes y simulacros, entonces foco, errores y acciones esenciales son utilizables.

## Restricciones y límites
- Fuera de alcance: Crear DB/Worker Cloudflare, desplegar o activar costes; eso corresponde H08.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
