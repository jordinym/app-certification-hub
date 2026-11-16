# H04 — Tareas atómicas y autorizaciones

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Regla:** UNA sola tarea autorizada por ejecución. La casilla no equivale a aceptación hasta que exista evidencia y HITL. No abordar tareas dependientes sin gate anterior.

## Backlog de ejecución propuesto
- [ ] **H04-T01** — Definir fórmulas y tratamientos de vacíos/archivados mediante HITL. **Origen:** `S2-05`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H04-T02** — Implementar consultas agregadas D1 sin nuevas tablas innecesarias. **Origen:** `S2-05`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H04-T03** — Integrar tarjetas, progreso, próximas tareas y filtros. **Origen:** `S2-05`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H04-T04** — Probar fórmulas, fechas, cambios y responsive. **Origen:** `S2-06`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.

## Condiciones de parada
- Tras la primera tarea terminada y su verificación específica: **STOP** y entregar resumen.
- Dos intentos de reparación para la misma causa raíz como máximo; si persiste, documentar bloqueo y alternativas sin ejecutar la siguiente.
- Prohibido instalar/cambiar versiones, recrear volumen, desplegar o tocar la cuenta remota sin autorización independiente.
- Si un requisito depende de infraestructura bloqueada, marcarlo `blocked`; solo avanzar tareas UI independientes con aprobación expresa.

## Protocolo de salida de cada tarea
`Task ID | legacy IDs | archivos cambiados | comandos y resultados | tests PASS/FAIL/NOT RUN | captura UI si aplica | blockers | próxima decisión HITL`.
