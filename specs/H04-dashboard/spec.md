# H04 — Dashboard y métricas reales de estudio · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** FEATURE/UI  
**IDs originales:** `S2-05`, `S2-06`  
**Dependencias:** H03 persistente; definición HITL del denominador del progreso y tareas archivadas  
**Superficies:** / (dashboard)

## Resultado de producto
Progreso agregado por proveedor/certificación, plan actual, próximas tareas y filtros.

## Historias de usuario
### HU-DASH-01 — Como usuario quiero un resumen del progreso de mi preparación para priorizar qué estudiar
- Origen: `S2-05`
- Evidencia esperada: Datos agregados desde D1

### HU-DASH-02 — Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación
- Origen: `S2-05`
- Evidencia esperada: Tareas persistidas y filtro coherente

### HU-DASH-03 — Como usuario quiero que métricas sean exactas incluso cuando reabro o archivo tareas
- Origen: `S2-06`
- Evidencia esperada: Agregados consistentes

## Criterios de aceptación verificables (Given / When / Then)
**AC-H04-01 — Sin datos**

Dado un usuario sin tareas, cuando abre el dashboard, entonces ve tarjetas vacías/0 y CTA, no porcentajes ilustrativos.

**AC-H04-02 — Progreso**

Dadas cuatro tareas elegibles y dos completadas, cuando consulto la métrica definida, entonces refleja 50 % y cambia tras reabrir una.

**AC-H04-03 — Proveedor**

Dadas tareas de distintos proveedores, cuando filtro uno, entonces los KPIs y próximas tareas usan exclusivamente ese conjunto.

**AC-H04-04 — Consistencia**

Dada una tarea cuyo estado/minutos cambian, cuando recargo, entonces resumen y plan coinciden.

**AC-H04-05 — Visual**

Dada UI de referencia, cuando veo desktop y móvil, entonces mantiene jerarquía, tarjetas y progreso semántico sin desbordamiento.

## Restricciones y límites
- Fuera de alcance: Valores ilustrativos del mockup; métricas de simulacros inexistentes; analítica predictiva.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
