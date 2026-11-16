# Catálogo de historias de usuario — trazables a las tareas aprobadas

**Borrador pendiente de HITL.** Cada HU se desarrolla con escenarios AC en `specs/<hito>/spec.md`. No inventa funciones del PNG.

| HU | Hito | Historia | Tareas originales | Validación principal |
|---|---|---|---|---|
| `HU-SHELL-01` | H01 | Navegar la aplicación mediante AppShell responsive y accesible | `S1-01` | Mockup visual y accesibilidad |
| `HU-P0-01` | P0 | Como desarrollador quiero ejecutar una petición en Worker que escriba y lea una fila mediante Drizzle/D1 para confirmar compatibilidad | `S0-03` | Worker preview real, no solo next dev ni CLI |
| `HU-P0-02` | P0 | Como desarrollador quiero migraciones y seeds reproducibles sin perder datos existentes | `S0-05/S0-06` | Proveedores Microsoft/GitHub; cinco códigos; reejecución segura |
| `HU-P0-03` | P0 | Como propietario quiero que el endpoint de diagnóstico sea accesible solo en modo local autorizado | `S0-07` | Rechazo de mutaciones sin token y de ruta remota no habilitada |
| `HU-P1-01` | P1 | Como desarrollador quiero levantar la aplicación local con Docker Compose para reproducir el entorno | `S0-04` | Servicio en localhost y sin credenciales Cloudflare |
| `HU-P1-02` | P1 | Como propietario quiero conservar mis datos al reiniciar contenedores | `S0-09` | Identidad y contenido del registro de prueba se mantienen |
| `HU-P1-03` | P1 | Como operador quiero backup y restore seguros de D1 local | `S0-08` | Restaura en base aislada, sin tocar estado personal |
| `HU-CAT-01` | H02 | Como usuario quiero explorar las certificaciones por proveedor y encontrar un código o nombre rápidamente | `S1-02` | Filtro y búsqueda con datos reales de D1 y estados vacíos |
| `HU-CAT-02` | H02 | Como usuario quiero registrar o editar proveedor y certificación para organizar estudios de cualquier proveedor | `S1-03` | Persistencia real; Zod y errores de unicidad |
| `HU-CAT-03` | H02 | Como usuario quiero ver las versiones y dominios de examen asociados a su certificación | `S1-04` | Versión/domain coherentes, sin hechos supuestos |
| `HU-CAT-04` | H02 | Como usuario quiero archivar un registro sin perder el historial ni integridad referencial | `S1-05` | Archivado seguro y mensajes de error claros |
| `HU-PLAN-01` | H03 | Como usuario quiero establecer mi zona horaria para que mis fechas de estudio permanezcan correctas | `S2-01` | Fecha solo día y zona IANA |
| `HU-PLAN-02` | H03 | Como usuario quiero crear y modificar un plan personal de 28 semanas para una certificación | `S2-02` | Inicio, rango y tareas editables; no oficial |
| `HU-PLAN-03` | H03 | Como usuario quiero marcar tareas y registrar minutos reales para medir avance | `S2-03` | Reabrir/editar sin duplicar minutos |
| `HU-PLAN-04` | H03 | Como usuario quiero organizar enlaces confiables de aprendizaje relacionados con mi certificación | `S2-04` | URL validada y asociación coherente |
| `HU-PLAN-05` | H03 | Como usuario quiero consultar mis tareas por semana y calendario | `S2-05` | Vista coherente con persistencia |
| `HU-DASH-01` | H04 | Como usuario quiero un resumen del progreso de mi preparación para priorizar qué estudiar | `S2-05` | Datos agregados desde D1 |
| `HU-DASH-02` | H04 | Como usuario quiero ver próximas tareas y filtrar por proveedor/certificación | `S2-05` | Tareas persistidas y filtro coherente |
| `HU-DASH-03` | H04 | Como usuario quiero que métricas sean exactas incluso cuando reabro o archivo tareas | `S2-06` | Agregados consistentes |
| `HU-EXAM-01` | H05 | Como administrador del contenido quiero crear y revisar preguntas originales para practicar con material fiable | `S3-01` | Estado de revisión y publicación explícita |
| `HU-EXAM-02` | H05 | Como usuario quiero seleccionar simulacro por certificación y versión según disponibilidad | `S3-02` | Cero preguntas no inicia intento |
| `HU-EXAM-03` | H05 | Como usuario quiero que mi intento preserve el contenido de las preguntas aunque el banco cambie | `S3-03` | Snapshot versionado |
| `HU-EXAM-04` | H05 | Como usuario quiero responder, navegar, reanudar y confirmar antes de enviar | `S3-04` | Selecciones persistentes y validadas |
| `HU-EXAM-05` | H05 | Como usuario quiero calificación coherente y que un reenvío no genere una segunda nota | `S3-05` | Grading en servidor e idempotencia |
| `HU-RES-01` | H06 | Como usuario quiero ver mi porcentaje de práctica y un resumen del intento terminado | `S3-06` | Sólo después de envío |
| `HU-RES-02` | H06 | Como usuario quiero revisar explicaciones para aprender de cada pregunta | `S3-06` | Contenido respaldado por snapshot |
| `HU-RES-03` | H06 | Como usuario quiero identificar dominios de menor desempeño para priorizar estudio | `S3-06/S3-07` | Conteo correcto por dominio |
| `HU-SEC-01` | H07 | Como propietario quiero que nadie sin autorización vea datos privados o modifique datos | `S4-01/S4-02` | Pruebas negativas de lecturas y mutaciones |
| `HU-REL-01` | H07 | Como operador quiero un plan seguro de Access, secretos, bindings y costes | `S4-03/S4-04` | Runbook revisado antes de recursos reales |
| `HU-REL-02` | H07 | Como propietario quiero una recuperación comprobable y una UI accesible antes de publicar | `S4-05/S4-06` | Restauración ensayada y journeys E2E |
| `HU-DEP-01` | H08 | Como propietario quiero desplegar Certification Hub privado en Cloudflare sin exponer datos | `S4-07` | Access protege hosts y D1 remota es la elegida |
| `HU-DEP-02` | H08 | Como usuario quiero que mis cambios remotos persistan y sigan protegidos tras una nueva publicación | `S4-08` | Persistencia real y runbook operativo |
