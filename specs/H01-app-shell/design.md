# H01 design proposal — NOT APPROVED

Build shared AppShell/sidebar/navigation in existing `src` structure, keep presentational components independent from Cloudflare specifics. Use simple empty data states; never hardcode fake progress as real values. Inspect actual source files and existing page implementation before choosing edits. A visual review should compare composition from mockup and test 3 widths (desktop/tablet/mobile). Do not create fake operational APIs merely to fill screens.

## F04 — Dependencias observadas; runtime NOT VERIFIED

Inspección estática, no ejecución:
- `src/app/page.tsx` es dinámica; obtiene headers y `getCloudflareContext().env`, aplica `isLocalRequest` y llama `readCatalog()`.
- El repositorio de catálogo usa `getDb()`; `src/server/db/client.ts` obtiene `getCloudflareContext().env.DB` y crea el cliente Drizzle/D1. La página actual no es una maqueta independiente de D1.
- `next.config.ts` importa OpenNext e invoca `initOpenNextCloudflareForDev()` en `PHASE_DEVELOPMENT_SERVER`. Por tanto, usar `next dev` no demuestra independencia del adaptador ni disponibilidad del entorno.
- No se ha iniciado ni comprobado el entorno durante esta corrección. No hay evidencia nueva de Worker, D1 o UI funcionando.

## F04 — Separación presentacional mínima propuesta, no autorizada

1. Extraer la composición visual a componentes compartidos `AppShell`/`Sidebar` que reciban contenido y estado por props y no importen repositorios, autenticación, bindings ni OpenNext.
2. Mantener la carga y protección del catálogo diagnóstico en un contenedor servidor separado. Una composición de presentación utilizaría estados vacíos o fixtures rotulados como datos locales de layout, sin simular persistencia ni sustituir los diagnósticos de S0.
3. Separar componentes no elimina por sí solo el acoplamiento global de `next.config.ts`. Antes de implementar, G1 debe elegir y acotar una forma local de previsualizar la composición sin consulta D1, o exigir un runtime P0/P1 utilizable. Cualquier eventual cambio de arranque/configuración requeriría alcance y G2 propios; no se propone un stack alternativo ni un bypass de seguridad.
4. H01-T01 puede detallar esa propuesta si se autoriza posteriormente. H01-T02/T03 no deben comenzar sin diseño aprobado y evidencia de un entorno UI utilizable. Capturas y comprobaciones futuras se registrarán en `verification.md`; su estado actual sigue NOT RUN.

## F03 — Límite de la excepción

P0 y P1 siguen pendientes y obligatorios para cerrar S0 antes de H02 integrado. Solo H01 presentacional puede adelantarse mediante excepción HITL expresa, seguida de G1/G2. Esta propuesta documental no concede dicha excepción ni habilita ejecución de infraestructura.
