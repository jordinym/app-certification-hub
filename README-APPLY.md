# Certification Hub — paquete SDD/HITL completo v2

Este ZIP **contiene todos los specs P0, P1, H00–H08**, 4 documentos por hito y una ficha por cada una de las 32 HUs, matriz de 37 tareas, 10 criterios S0 y catálogo de historias de usuario. Se basa en los documentos publicados de GitHub el 15-11-2026 y en el paquete v1 ya preparado; **no incluye ni sobrescribe código de aplicación**.

## Aplicación recomendada
1. En raíz del repo, guardar los cambios actuales: `git status --short`; hacer backup o commit de trabajo sin secretos.
2. Extraer este paquete y COMPARAR `AGENTS.md`, `CODEX_START.md` y `.agents/skills/...` antes de reemplazar; no sobreescribir mejoras locales más recientes.
3. Conservar íntegros `docs/PRODUCT_SPEC.md`, `BACKLOG.md`, `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE.md`, `UI_SPEC.md`, `DECISIONS.md`, `S0_REPORT.md`, `ui-reference.png` y el código.
4. Comprobar `docs/sdd/COMPLETE_SPEC_INDEX.md` y `docs/sdd/STORY_TRACEABILITY.md`.
5. Ejecutar `prompts/REVIEW_ALL_SPECS_NO_CODE.md` con Codex para auditoría documental, no código.
6. Tras HITL de H00, aprobar primero `spec.md` + `design.md` del hito escogido, después autorizar **una** tarea de `tasks.md`.

## Caveats
- No se ejecutó Docker, D1 ni tests de proyecto en la preparación de este paquete. Las verificaciones están marcadas NOT RUN.
- En la referencia visual se dispone de la descripción escrita del repo; Codex deberá abrir el PNG original para comprobar la fidelidad visual en su entorno.
- Los specs son propuestas detalladas; no sustituyen los criterios fuente si hay una contradicción.
- Los hitos P0/P1 son requisitos S0, no mejoras opcionales de publicación remota.
