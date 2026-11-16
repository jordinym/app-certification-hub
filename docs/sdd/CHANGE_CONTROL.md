# Procedimiento de cambio de scope

1. Identificar requisito / ID fuente (S0-01..S4-08, HU-*, AC-*). Reabrir solo archivos necesarios.
2. Declarar motivo, impacto funcional, visual, técnico y aceptación.
3. Si cambia stack, DB, seguridad, límites, rutas, datos históricos, presupuesto o alcance MVP: STOP/HITL de diseño.
4. Actualizar `specs/<hito>/spec.md` y `design.md` **primero**; luego `tasks.md`, `verification.md` y matriz.
5. No editar `S0_REPORT.md` para cambiar hechos históricos; crear evidencia nueva en execution log.
6. Una tarea aprobada no autoriza el resto del sprint ni un despliegue.

## Política de subagentes
- Default: agente único con escritura; skills de planning/review para separar responsabilidades.
- Revisores solo lectura y en tareas puntuales; consolidar conclusiones en orquestador.
- No ejecutar subagentes en paralelo por inercia: su coste adicional puede superar el ahorro de contexto.
