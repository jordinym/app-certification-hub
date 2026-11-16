# Matriz de aceptación visual — Referencia y comportamiento

**Fuente de aspecto:** `docs/ui-reference.png` + `docs/UI_SPEC.md`. La imagen es ilustrativa; NO son requisitos los contadores, porcentajes ni marcas adicionales que aparezcan en ella.

| Referencia | Ruta canónica | Hitos | Componentes visibles | Validación de comportamiento | Evidencias requeridas |
|---|---|---|---|---|---|
| Panel 1 dashboard | `/` | H01/H04 | shell, barra lateral, tarjetas, progreso, próximas tareas, filtro proveedor | métricas calculadas D1, sin fixtures no identificados | desktop/móvil, query real, vacío/loading/error |
| Panel 2 catálogo | `/certifications` | H01/H02 | filtros, búsqueda, cards, botón alta | búsqueda, filtro, DB persistida, datos vacíos | captura desktop/móvil, integración D1 |
| Panel 3 alta | `/certifications/new` | H02 | formulario proveedor, código, nombre, nivel opcional | validación servidor, duplicados, éxito visible | errores, persistencia, teclado |
| Pantalla detalle escrita | `/certifications/[id]` | H02 | versión, dominios, recursos | asociaciones consistentes y verificadas | screenshots y DB |
| Panel 4 plan | `/plans` | H03 | vistas semanal/calendario, tareas, minutos | edición 28 semanas y date-only, D1 | día/zona horaria y E2E |
| Panel 5 simulacro | `/simulations` y `/simulations/[attemptId]` | H05 | selección, pregunta, opciones, temporizador, envío | sin answer-key; snapshot, idempotencia | E2E sin fuga, móvil |
| Panel 6 resultados | `/results/[attemptId]` | H06 | resumen, porcentaje práctica, dominios, explicación | visible solo tras submit; score no oficial | recálculo servidor, captura |
| Ruta escrita sin panel | `/resources` | H03 | enlaces y fuentes | URL validada y fecha de verificación cuando exista | enlaces seguros, vacío |
| Ruta escrita sin panel | `/settings` | H03 | zona horaria/preferencias | persistencia y fechas correctas | pruebas y móvil |

## Condiciones para UI-only H01
- Se pueden usar fixtures **identificados visualmente** para comprobar composición; están prohibidos porcentajes que se presenten como reales.
- Aprobar H01 no aprueba H02–H06 ni el sprint S1.
- La fidelidad requiere captura local de los componentes implementados y evaluación humana frente al PNG real; no afirmar revisión visual antes de hacerla.

## Checklist común
- [ ] 1440px escritorio; 768px tableta; 390px móvil (anchos objetivo de inspección propuestos, no fidelidad pixel perfecta)
- [ ] Foco visible, tabulación, labels, contraste, semántica y navegación móvil
- [ ] loading / empty / error / success / confirmación donde aplique
- [ ] no datos ficticios presentados como reales
- [ ] captura + URL/commit + resultado real registrados en verification.md
