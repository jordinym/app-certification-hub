# H03 — Tareas atómicas y autorizaciones

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Regla:** UNA sola tarea autorizada por ejecución. La casilla no equivale a aceptación hasta que exista evidencia y HITL. No abordar tareas dependientes sin gate anterior.

## Backlog de ejecución propuesto
- [ ] **H03-T01** — Formalizar contratos fecha-only, zona horaria y preferencias; tests límite. **Origen:** `S2-01`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H03-T02** — Implementar plan y plantilla editable de 28 semanas. **Origen:** `S2-02`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H03-T03** — Implementar tareas/estado/minutos con validación. **Origen:** `S2-03`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H03-T04** — Implementar recursos y procedencia con restricciones. **Origen:** `S2-04`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H03-T05** — Entregar vistas semanal/calendario y estados responsive. **Origen:** `S2-05`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.
- [ ] **H03-T06** — Probar fechas, persistencia, vacíos y móvil. **Origen:** `S2-06`. **Salida:** diff acotado + comando de comprobación + resultado real + checkpoint; detenerse al terminar.

## Condiciones de parada
- Tras la primera tarea terminada y su verificación específica: **STOP** y entregar resumen.
- Dos intentos de reparación para la misma causa raíz como máximo; si persiste, documentar bloqueo y alternativas sin ejecutar la siguiente.
- Prohibido instalar/cambiar versiones, recrear volumen, desplegar o tocar la cuenta remota sin autorización independiente.
- Si un requisito depende de infraestructura bloqueada, marcarlo `blocked`; solo avanzar tareas UI independientes con aprobación expresa.

## Protocolo de salida de cada tarea
`Task ID | legacy IDs | archivos cambiados | comandos y resultados | tests PASS/FAIL/NOT RUN | captura UI si aplica | blockers | próxima decisión HITL`.
