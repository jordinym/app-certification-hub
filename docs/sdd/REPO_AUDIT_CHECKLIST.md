# H00 — Validación de integridad del baseline (solo lectura)

- [ ] `git status --short` capturado (incluye no rastreados).
- [ ] Identificar rama y commit actual (sin alterar archivos).
- [ ] Comparar `docs/*` original importado vs `docs/README.md` canónico.
- [ ] IDs `S0-01..S0-10`, `S1-01..S1-06`, `S2-01..S2-06`, `S3-01..S3-07`, `S4-01..S4-08`: 37/37.
- [ ] Acceptance `A0-01..A0-10`: 10/10.
- [ ] Verificar cada HU en `docs/sdd/HU_SPEC_INDEX.md` con archivo propio, AC y task vinculada.
- [ ] Comparar cada pantalla y ruta de `docs/UI_SPEC.md` con `docs/sdd/UI_ACCEPTANCE_MATRIX.md`.
- [ ] Revisar `docs/ui-reference.png` real, no únicamente la descripción.
- [ ] Corroborar estado S0 con código/commits/pruebas reales; sin nuevas ejecuciones de Docker.
- [ ] Listar contradicciones e incertidumbres, STOP para HITL.
