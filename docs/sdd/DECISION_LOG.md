# Registro de decisiones y HITL

No hay aprobaciones nuevas implícitas en este archivo. Rellenar después de respuestas explícitas del usuario.

| Decision ID | Fecha | Hito/Tarea | Propuesta y alternativas | Aprobado por usuario (cita breve) | Estado | Consecuencia |
|---|---|---|---|---|---|---|
| D-000 | — | H00 | Conciliar docs sin tocar código | Pendiente | PROPOSED | Ninguna ejecución autorizada |
| HITL-H00-001 | 2026-11-15 | H00 / corrección de referencia en Inputs | Sustituir `docs/agents/ROLES.md`, inexistente, por los cuatro roles vigentes de `.agents/roles/`; alternativa: recuperar el documento heredado para comparar responsabilidades. | «APRUEBO HITL-H00-001 CON OBSERVACIÓN.» | APPROVED WITH OBSERVATION | Autorizada únicamente la sustitución en Inputs de `specs/H00-governance/spec.md` por `spec-reviewer.md`, `architecture-reviewer.md`, `ui-reviewer.md` y `qa-reviewer.md` de `.agents/roles/`, y el registro de esta decisión; verificar existencia de las rutas, ejecutar `git diff --check` y presentar el diff para revisión humana. Limitación aceptada: no puede confirmarse la equivalencia completa de responsabilidades sin el documento heredado. No autoriza otros cambios, código, Docker/npm/builds/tests, subagentes, commits/push ni iniciar automáticamente H00/H01; no acepta ni cierra otros gates. |
| HITL-G0-001 | 2026-11-16 | H00 / G0 | Aprobar reconciliación y roadmap tras confirmar F01, F02, F03, F04 y F06; detener sin aprobación si falla una condición. | «apruebo la reconciliación documental de H00 y el roadmap SDD/HITL, condicionada a que la revisión final confirme las correcciones F01, F02, F03, F04 y F06» | APPROVED — condiciones documentales confirmadas | Reconciliación H00 aprobada; H01 habilitado únicamente para preparación de spec/design, sin ejecutarlo en esta intervención. Implementación y excepción presentacional no autorizadas; G1/G2 pendientes. No aprueba G3 ni GR. Evidencia, límites y hallazgos abiertos detallados abajo. |

## Corrección F01 — autorización documental anterior a G0

El usuario aceptó el informe H00 como resultado de auditoría y declaró: «No apruebo todavía el gate G0» y «Autorizo exclusivamente la corrección documental de los hallazgos F01, F02, F03, F04 y F06». Esta autorización acotada no altera D-000 ni HITL-H00-001, no activa H01 y no autoriza infraestructura. La aceptación del informe no equivale a aceptación de la reconciliación.

## Estado de gates
- [x] G0: reconciliación y roadmap aprobados por HITL-G0-001 tras confirmar las condiciones documentales el 2026-11-16.
- [ ] G1: aprobar `spec.md` y `design.md` de cada hito, incluyendo alcance, UI, datos y seguridad. Para adelantar H01 presentacional, resolver expresamente la excepción limitada respecto al cierre S0 y su entorno utilizable.
- [ ] G2: autorizar separadamente una sola tarea, con ID exacto y casilla de `tasks.md`; la casilla sola no autoriza.
- [ ] G3: aceptar humanamente evidencia real y captura UI cuando corresponda; la siguiente tarea/hito requiere autorización separada.
- [ ] GR: autorización expresa e independiente para despliegue remoto, Access, migraciones o costes, además de los gates anteriores.

La numeración se ajusta a `EXECUTION_POLICY.md`, sección Gates. No existe G4 en esa política. P0+P1 y A0-01..A0-10 siguen siendo obligatorios para cerrar S0 antes de H02 integrado (F03).

## Entrega documental F01–F04 y F06 — confirmada para HITL-G0-001

- F01: gates normalizados en este registro; filas históricas intactas.
- F02: relaciones semánticas en fichas HU y `STORY_TRACEABILITY.md`; AC-H03-07 y su verificación concretan S2-05 existente. No se eliminan HU, tareas originales ni AC previos.
- F03: entrada H02 aclarada en roadmap, índice y spec/design/fichas H02; S0 cerrado exige P0+P1 y A0-01..A0-10.
- F04: dependencias observadas y separación mínima propuesta en spec/design H01. Entorno NOT VERIFIED; ningún cambio de código ni configuración autorizado por esta propuesta.
- F06: una sola definición canónica de AC-H01-01..04 en spec H01; HU-SHELL-01 enlaza criterios y tareas.

La condición de revisión final de G0 se cumplió y se registró en HITL-G0-001. La excepción H01, la elección de entorno y el diseño final requieren decisión expresa; G1/G2 siguen pendientes y no se infieren de G0. H01 queda habilitado únicamente para preparación de spec/design; no se ejecuta en esta intervención.

## HITL-G0-001 — evidencia y limitaciones

Revisión local del 2026-11-16, sin ejecutar la aplicación:
- F01: G0 reconciliación, G1 spec/design, G2 una tarea exacta, G3 aceptación de evidencia y GR remoto coinciden con `EXECUTION_POLICY.md`, sección Gates. No se conceden G1/G2/G3/GR.
- F02: inspección documental con Python confirma 37 IDs originales en el plan y ambas matrices; 32 fichas coincidentes con HU_SPEC_INDEX; 52 AC únicos referenciados por HU, presentes en las verificaciones y vinculados a tareas existentes. Revisión semántica de las relaciones, incluidos los siete AC antes sin enlace. Los 52 incluyen AC-H03-07, derivado de S2-05 existente.
- F03: roadmap, índice y spec/design/fichas H02 exigen S0 cerrado y aceptado mediante P0+P1 y A0-01..A0-10. H02 integrado sigue bloqueado.
- F04: design H01 documenta el acoplamiento de `page.tsx`, `next.config.ts` y OpenNext/D1 y una separación presentacional mínima propuesta. No acredita un entorno funcionando ni autoriza su implementación.
- F06: una definición de cada AC-H01-01..04 en spec H01; HU-SHELL-01 enlaza esos criterios y sus tareas.

Comandos de revisión: lecturas locales, `git status --short`, inspección documental Python y `git diff --check`. Los conteos y referencias resultaron PASS; la comprobación final del diff se entrega en la conversación. No son tests de aplicación. El informe H00 previamente aceptado y las correcciones documentales son la evidencia de alcance; no se declara S0 cerrado, runtime verificado ni UI aceptada.

### Hallazgos expresamente abiertos

| Hallazgo | Estado | Pendiente conservado |
|---|---|---|
| F05 | OPEN | Evidencia de aceptación P0/P1, Worker/D1, Docker, persistencia y recuperación |
| F07 | OPEN | Alta/edición de versiones y dominios: precisión de operaciones y aceptación |
| F08 | OPEN | Refinamientos funcionales de aceptación; AC-H03-07 resuelve solo la relación de calendario, no cierra F08 |
| F09 | OPEN | Lenguaje contradictorio sobre comandos permitidos en documentos H00 |
| F10 | OPEN | Estado operativo vigente en runbooks frente al reporte histórico |
| F11 | OPEN | Concretar contratos técnicos, transiciones y límites antes de G1 de cada hito |
| F12 | OPEN | Referencia legacy de roles en baseline, sin reescritura histórica |
| F13 | OPEN | Resumen P0 del roadmap omite S0-06, que continúa conservado en specs y matrices |
| F14 | OPEN | Conteo/denominación de hitos en STORY_TRACEABILITY |

Estos hallazgos no se cierran por aprobar G0. Su corrección o verificación requiere alcance autorizado independiente. No se modifican aprobaciones históricas ni se habilitan comandos de infraestructura, dependencias, publicación, commits o push.
