# P1 — Docker local reproducible y cierre técnico S0 · Especificación funcional

> Estado: **BORRADOR — SIN APROBACIÓN HITL**. Estos archivos detallan requisitos del proyecto, pero **no autorizan implementar**. Las fuentes aprobadas conservan precedencia ante cualquier discrepancia: `docs/PRODUCT_SPEC.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/BACKLOG.md`, `docs/UI_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`. La evidencia de `docs/S0_REPORT.md` es histórica, no prueba vigente.

**Clasificación:** INFRA-LOCAL/QA  
**IDs originales:** `S0-04`, `S0-08`, `S0-09`, `S0-10`  
**Dependencias:** P0 aprobado; daemon operativo comprobado por fuera de app  
**Superficies:** localhost:3000 y comandos Docker Compose en entorno local

## Resultado de producto
Un comando de arranque, estado D1 persistente, backups/restauración aislados, pruebas en contenedor y reporte S0.

## Historias de usuario
### HU-P1-01 — Como desarrollador quiero levantar la aplicación local con Docker Compose para reproducir el entorno
- Origen: `S0-04`
- Evidencia esperada: Servicio en localhost y sin credenciales Cloudflare

### HU-P1-02 — Como propietario quiero conservar mis datos al reiniciar contenedores
- Origen: `S0-09`
- Evidencia esperada: Identidad y contenido del registro de prueba se mantienen

### HU-P1-03 — Como operador quiero backup y restore seguros de D1 local
- Origen: `S0-08`
- Evidencia esperada: Restaura en base aislada, sin tocar estado personal

## Criterios de aceptación verificables (Given / When / Then)
**AC-P1-01 — Arranque**

Dado Docker funcional y el checkout limpio, cuando ejecuto el comando documentado de Compose, entonces aparece una aplicación accesible en loopback sin cloud credentials.

**AC-P1-02 — Persistencia**

Dada una fila distinta del seed, cuando detengo Compose sin eliminar volúmenes y vuelvo a iniciar, entonces el registro mantiene ID y contenido.

**AC-P1-03 — Restauración**

Dado backup local, cuando lo restauro en estado aislado, entonces tablas, filas y FKs preservan integridad sin modificar D1 personal.

**AC-P1-04 — Fallos externos**

Dado Docker Desktop averiado incluso para un Node mínimo, cuando el diagnóstico prueba ese bloqueo, entonces Codex registra el incidente y se detiene sin reinstalar sucesivamente ni alterar stack.

## Restricciones y límites
- Fuera de alcance: Cloudflare remoto; CI/CD; cambios grandes de dependencia; funcionalidades S1-S4.
- Toda escritura requiere autorización servidor, validación y persistencia correspondiente al entorno; nunca se valida una integración solo con componentes simulados.
- No inventar metadatos oficiales, datos personales, notas ni avances de la imagen ilustrativa.
- En UI, usar `docs/ui-reference.png` como referencia visual de composición, no como fuente de verdad para datos o stack.

## HITL de entrada
- Confirmar el resultado y los criterios que son materialmente ambiguos antes de autorizar la implementación.
- Dejar constancia del ID de tarea concreta autorizada, nunca autorizar automáticamente todas las tareas al aprobar esta spec.
