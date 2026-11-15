# Plan detallado de implementación — Certification Hub

Fecha: 2026-11-15. Estado: **plan aprobado; S0 en implementación**.

Este documento desarrolla el backlog S0–S4. No modifica el stack aprobado ni autoriza recursos remotos, despliegues, servicios de pago o el paso al siguiente sprint. El usuario aprobó este plan y la ejecución de S0. S1–S4 y las acciones remotas mantienen sus aprobaciones independientes.

## 1. Fuentes y forma de trabajo

Fuentes de verdad: `AGENTS.md`, `CODEX_START.md`, el skill `certification-hub-mvp`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `DOCKER_DEV.md`, `COMPATIBILITY.md`, `UI_SPEC.md`, `BACKLOG.md`, `DECISIONS.md` y `agents/ROLES.md`.

- Un agente principal implementa e integra. No se planifican subagentes obligatorios.
- Ejecutar una tarea verificable por vez, respetando las dependencias indicadas.
- Registrar por tarea: estado, archivos afectados, pruebas ejecutadas, resultado y limitaciones.
- Estados: pendiente → en curso → verificada; usar bloqueada cuando exista una dependencia concreta sin resolver.
- No marcar como verificada una tarea por tener código escrito o documentación disponible.
- Al cierre de cada sprint, entregar evidencia y solicitar aprobación para el siguiente.
- Si el spike demuestra incompatibilidad Next.js/OpenNext/D1, detener la implementación y presentar evidencia y alternativas; no cambiar el stack silenciosamente.
- Las decisiones propuestas en este plan se pueden ajustar durante la revisión. Los detalles de S1–S4 se refinarán antes de aprobar cada sprint.

## 2. Alcance y límites

Monolito modular privado, de un usuario, independiente del proveedor: Next.js App Router, TypeScript estricto, Tailwind, Zod, OpenNext Cloudflare, Workers, D1 y Drizzle. Desarrollo local obligatorio con Docker Compose y Wrangler/Miniflare; pruebas con Vitest y Playwright.

Datos iniciales: proveedores Microsoft y GitHub; certificaciones Microsoft AZ-900, AI-901, AI-200, AZ-104 y AZ-305. GitHub comienza sin certificaciones. Los datos oficiales desconocidos permanecen sin completar. El plan editable de 28 semanas es personal, no un calendario oficial.

Fuera de alcance: Prisma/PostgreSQL/Firebase, SQLite como archivo de producción, microservicios, Redis, colas, múltiples usuarios, pagos, sincronización con proveedores, generación de preguntas con IA y funcionalidades extra del mockup.

## 3. Estado real al redactar el plan

| Elemento | Evidencia disponible | Pendiente |
|---|---|---|
| Lectura del paquete de diseño | Documentación e imagen revisadas íntegramente | Mantener coherencia al implementar |
| Compatibilidad | Documentación oficial y metadatos npm consultados | Instalación, build y prueba de runtime |
| Docker CLI / Compose | Se observaron Docker 24.0.2 y Compose v2.18.1 | Ejecutar build y pruebas |
| Configuración Compose actual | `docker compose config --quiet` terminó correctamente | Plantilla aún sin aplicación |
| Daemon Docker | Acceso verificado con permisos de herramienta; arquitectura x86_64, servidor 24.0.2 | Ejecución de contenedores del proyecto |
| Imagen Node candidata | Manifiesto de `node:22.23.5-bookworm-slim` incluye amd64 y arm64 | Fijar digest y probar arquitectura disponible |
| Aplicación, lockfile y esquema | No implementados al redactar este plan | S0 |
| Recursos Cloudflare | No creados | Solo con autorización separada |

La compatibilidad documental no demuestra compatibilidad ejecutable. La disponibilidad de una imagen arm64 tampoco equivale a haberla probado en Apple Silicon.

## 4. Decisiones técnicas propuestas

### 4.1 Toolchain candidato

| Componente | Candidato | Condición de aceptación |
|---|---|---|
| Node | 22.23.5, Debian bookworm-slim | Imagen exacta, digest, npm y arquitectura registrados |
| Next.js | 16.4.6 | Build y ejecución por OpenNext |
| React / React DOM | 19.3.1 | Peers compatibles e instalación reproducible |
| OpenNext Cloudflare | 1.20.17 | Binding D1 funcional desde Worker |
| Wrangler | 4.162.0 | CLI y preview verificados |
| Miniflare / workerd | Versiones transitivas de Wrangler | Fijadas en lockfile; no reemplazadas arbitrariamente |
| Drizzle ORM / Kit | 0.45.4 / 0.31.11 | SQL generado aplicable mediante Wrangler |
| TypeScript | 5.9.3 | Typecheck estricto |
| Tailwind | 4.3.5 | Integración PostCSS fijada y build correcto |
| Zod | 4.6.7 | Validaciones de entradas y snapshots probadas |
| Vitest / Playwright | 4.1.11 / 1.63.0 | Ejecución dentro de Docker |

Estos valores proceden del análisis y **no son todavía una combinación certificada**. S0 comprobará nuevamente disponibilidad, engines, peer dependencies y avisos de seguridad relevantes antes de bloquearlos. No se usarán `latest`, `^` o `~` para dependencias directas del proyecto. Las transitivas quedarán fijadas por `package-lock.json`.

Referencias oficiales consultadas:

- [Compatibilidad de OpenNext](https://opennext.js.org/cloudflare)
- [Configuración de OpenNext](https://opennext.js.org/cloudflare/get-started)
- [CLI de OpenNext](https://opennext.js.org/cloudflare/cli)
- [Bindings de OpenNext](https://opennext.js.org/cloudflare/bindings)
- [Manifiesto del adaptador](https://github.com/opennextjs/opennextjs-cloudflare/blob/main/packages/cloudflare/package.json)
- [Requisitos de Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Compatibilidad Node.js en Workers](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Driver D1 de Drizzle](https://orm.drizzle.team/docs/get-started/d1-new)
- [Migraciones D1](https://developers.cloudflare.com/d1/reference/migrations/)
- [Comandos D1](https://developers.cloudflare.com/d1/wrangler-commands/)

La guía de Drizzle contiene ejemplos de configuración que no deben reemplazar la configuración vigente de OpenNext/Wrangler. La etiqueta prerelease de Miniflare transitivo deberá registrarse como riesgo y cubrirse con el spike.

### 4.2 Módulos y límites

```text
src/
  app/                    Rutas, layouts, acciones y handlers
  modules/
    catalog/              Proveedores, certificaciones, versiones, dominios
    planning/             Planes, tareas y registro de tiempo
    assessment/           Preguntas, intentos y calificación
    analytics/            Consultas de progreso y resultados
    settings/             Zona horaria y preferencias
  server/
    auth/                 Identidad y autorización
    db/                   Binding, cliente Drizzle y esquema
  shared/
    validation/           Contratos compartidos sin datos privados
    ui/                   Componentes presentacionales
drizzle/                  SQL versionado y metadatos de generación
scripts/                  Operaciones explícitas por entorno
tests/
  unit/
  integration/
  e2e/
```

Flujo: UI → handler/acción → autorización y Zod → servicio → repositorio → Drizzle → binding `DB`.

Los repositorios pertenecen al módulo correspondiente y solo se importan en servidor. `server/db` centraliza infraestructura. No crear capas vacías ni interfaces genéricas sin un caso de uso. Analytics inicialmente consulta datos existentes; no introduce tablas agregadas ni procesos de fondo.

Obtener el binding en contexto de petición mediante la API del adaptador. Las páginas privadas se renderizan dinámicamente; no consultar datos personales para generar HTML estático durante el build. No incorporar R2 o caché distribuida en S0.

### 4.3 Esquema e integridad

| Grupo | Tablas | Reglas que se concretarán en el esquema |
|---|---|---|
| Catálogo | providers, certifications | Slug único; código normalizado único por proveedor |
| Versionado | exam_versions, exam_domains | Etiqueta única por certificación; dominios de una versión |
| Recursos | learning_resources | Asociación coherente a certificación, versión o dominio |
| Planificación | study_plans, study_tasks | Fechas coherentes; minutos no negativos; estados restringidos |
| Banco | questions, question_options | Dominio de la versión indicada; publicación/revisión explícitas |
| Intentos | exam_attempts, attempt_questions, attempt_answers | Ordinal único por intento; respuesta única por pregunta; snapshots privados |

- IDs estables, claves foráneas, índices de relaciones y restricciones de unicidad.
- `CHECK` para estados, booleanos, minutos, rangos de pesos y contadores.
- Fechas de estudio como `YYYY-MM-DD`; eventos UTC; zona IANA en cada plan.
- Validación Zod para fechas reales, URLs y JSON; la validación TypeScript no sustituye restricciones SQL.
- Impedir relaciones entre dominios/versiones/certificaciones incompatibles mediante FKs compuestas o validación transaccional probada.
- Preferir archivado. Restringir borrados que comprometan el historial; revisar cada cascada explícitamente.
- Añadir explicación a preguntas y snapshots, necesaria para resultados aunque no figure en la tabla ilustrativa de arquitectura.
- Snapshots versionados con contenido, opciones, dominio y explicación; clave de respuesta en campo privado separado.
- Diferir `credential_records`. La persistencia concreta de preferencias se añadirá en S2 mediante migración si resulta necesaria.

El esquema base se implementa en S0; los servicios y pantallas se incorporan en su sprint. Las invariantes de publicación, transición de intentos y calificación se prueban al implementar S3.

### 4.4 Migraciones y datos iniciales

Fuente de verdad: esquema Drizzle → SQL generado y revisado → ejecución exclusivamente con Wrangler. No mezclar `push`, migrador runtime y Wrangler sobre la misma base.

- Configurar directorio/patrón según la salida real de Drizzle Kit.
- Aplicar migraciones a base vacía y verificar segunda ejecución sin cambios.
- Mantener cambios ya aplicados inmutables; corregir mediante nuevas migraciones.
- Evolución aditiva cuando sea posible; backup y ensayo previo para cambios destructivos.
- Seed idempotente con IDs deterministas y manejo específico de conflictos; no sobrescribir personalizaciones.
- Sembrar dos proveedores y cinco certificaciones; no inventar versiones, dominios, preguntas, porcentajes ni metadatos oficiales.
- Usar títulos provisionales basados en códigos cuando no exista verificación de nombres.
- Bases local, pruebas y remota explícitamente separadas. No inventar un identificador remoto para habilitar desarrollo local.

## 5. S0 — Runtime, Docker y persistencia

**Objetivo:** desde un clon limpio, `docker compose up --build` expone la aplicación en `http://localhost:3000`, con Worker real local, D1 persistente, esquema y seed reproducibles.

| ID | Tarea y entregable | Depende de | Aceptación |
|---|---|---|---|
| S0-01 | Verificar y fijar toolchain, imagen, npm, package.json y lockfile | Revisión del plan | Instalación sin conflictos; versiones exactas registradas |
| S0-02 | Scaffold mínimo Next/App Router/TS/Tailwind/Zod y configuración OpenNext/Wrangler | S0-01 | Build de Worker correcto, sin crear recursos remotos |
| S0-03 | Spike de petición → repositorio → Drizzle → DB; lectura y escritura mínima | S0-02 | Fila creada y recuperada desde el Worker, no solo desde CLI |
| S0-04 | Completar Dockerfile, Compose, ignores, .nvmrc y bootstrap local | S0-03 | Arranque en un comando desde volumen vacío |
| S0-05 | Esquema base, SQL versionado y pruebas de restricciones | S0-03 | Migraciones aplican; FKs/duplicados inválidos se rechazan |
| S0-06 | Seed de catálogo idempotente y no destructivo | S0-05 | Dos proveedores y cinco certificaciones; repetir no duplica ni sobrescribe |
| S0-07 | Frontera de autorización y DTOs server-only; página mínima de estado | S0-03 | Denegación por defecto fuera del modo local explícito |
| S0-08 | Scripts de desarrollo, validación, backup y restauración local | S0-04–07 | Ejecución dentro de Docker y restauración en base aislada |
| S0-09 | Pruebas integradas de arranque, persistencia y navegación | S0-08 | Matriz de aceptación completa con resultados reales |
| S0-10 | Actualizar README, compatibilidad, Docker y operación; informe de cierre | S0-09 | Instrucciones reproducibles y limitaciones documentadas |

### Arranque y volúmenes

Un servicio de aplicación; sin servidor SQL separado. Directorio `/workspace`, volumen `node_modules` y volumen persistente para `.wrangler/state`. Alinear configuración y ruta de persistencia en todos los comandos.

El bootstrap final ejecutará secuencialmente: comprobar lockfile → `npm ci` → migraciones locales → seed local → build OpenNext → preview. Fallar inmediatamente si falla una etapa; no ocultar errores ni continuar con esquema incompleto. Los scripts operativos también funcionarán mediante `docker compose run --rm app ...` tras el build, sin depender de un arranque previo exitoso.

Publicar el puerto en loopback del host y escuchar en `0.0.0.0` dentro del contenedor. Mantener `init: true`; verificar apagado y reinicio. No forzar `NODE_ENV=development` durante el build de Next. Incluir healthcheck sin información privada. No prometer hot reload del preview; `next dev` queda como vía opcional de UI, no como evidencia de Workers.

La imagen debe permitir pruebas de navegador con Chromium y sus dependencias, mediante target de pruebas si conviene. No mezclar módulos nativos de macOS con Linux. No forzar amd64 en equipos arm64 sin evidencia de necesidad.

### Contrato de scripts

Los siguientes nombres son propuestos; aún no existen. Verificar flags con el CLI fijado antes de documentarlos como ejecutables.

| Script | Responsabilidad |
|---|---|
| dev:cloudflare | Build OpenNext y preview local en puerto 3000 |
| dev:next | Desarrollo UI opcional |
| build / build:worker | Build Next invocado por OpenNext / artefacto Worker |
| cf:typegen | Tipos de bindings generados por Wrangler |
| db:generate | Generación SQL con Drizzle Kit |
| db:migrate:local | Migración con `--local`, configuración y persistencia explícitas |
| db:seed:local | Seed con selección local explícita |
| db:backup:local | Exportación SQL fuera de Git y del contexto Docker |
| db:restore:local | Restauración intencional, preferentemente en estado aislado |
| typecheck / lint / test:unit | TypeScript estricto, ESLint y Vitest |
| test:integration / test:e2e | Integración con D1 local y Playwright contra Worker |
| db:*:remote / deploy:remote | Contratos documentados; impedir ejecución mientras falte configuración/autorización remota |

### Matriz de aceptación S0

| ID | Prueba | Resultado exigido |
|---|---|---|
| A0-01 | `npm ci` en contenedor con lockfile | No altera lockfile ni usa módulos del host |
| A0-02 | `docker compose up --build` con estado nuevo | Aplicación disponible sin credenciales Cloudflare |
| A0-03 | Leer/escribir mediante petición al Worker | Usa binding DB y repositorio Drizzle |
| A0-04 | Migraciones y seed ejecutados dos veces | Sin duplicados, pérdida de datos ni cambios repetidos |
| A0-05 | Crear registro, `down`, `up`, consultar | Mismo ID y contenido; sin `-v` ni reseed como sustituto de persistencia |
| A0-06 | Inserciones inválidas y relaciones cruzadas | Restricciones rechazan datos incoherentes |
| A0-07 | Mutación sin autorización y modo remoto sin configurar | Denegación; no hereda acceso de desarrollo |
| A0-08 | Typecheck, lint y pruebas dentro de Docker | Todos pasan; registrar comandos y resultados |
| A0-09 | Exportar y restaurar en estado aislado | Datos y relaciones conservados |
| A0-10 | Revisar artefactos cliente y contexto de imagen | Sin secretos, estado D1 ni campos privados serializados |

Pruebas de integración en estado separado del volumen personal. La prueba de reinicio utilizará un registro distinto de los seeds. No se creará un endpoint de diagnóstico de escritura publicable sin protección.

**Fuera de S0:** CRUD completo de catálogo, dashboard funcional, plan de 28 semanas, banco de preguntas, motor de examen y despliegue. Una página mínima de diagnóstico no es la entrega de S1.

## 6. S1 — Catálogo independiente del proveedor

Entrada: S0 cerrado y aprobación de S1.

| ID | Implementación | Aceptación |
|---|---|---|
| S1-01 | AppShell, navegación accesible, tokens visuales y estados comunes | Desktop/móvil, foco y navegación por teclado |
| S1-02 | Listado `/certifications`, búsqueda y filtro por proveedor | Datos D1; estado vacío de GitHub |
| S1-03 | Alta/edición de proveedor y certificación | Crear certificación no Microsoft sin cambio de código |
| S1-04 | Detalle con versiones y dominios; validación de metadatos | Sin cruces de versiones ni hechos oficiales inventados |
| S1-05 | Archivado y errores de duplicación claros | Historial protegido; mensajes accionables |
| S1-06 | Pruebas de repositorios, autorización, formularios y E2E | Crear, editar, filtrar y recargar conserva datos |

Dependencias internas: S1-01 y repositorios/validación antes de formularios; S1-03 antes del flujo completo S1-04; S1-06 cierra el sprint. Cada mutación valida autorización y Zod en servidor. Mantener fuentes y fechas de verificación cuando se disponga de ellas.

Salida: catálogo usable y responsive; capacidad demostrada de añadir otro proveedor. No implementar planes ni simulaciones en este sprint.

## 7. S2 — Planificación, recursos y dashboard

Entrada: S1 cerrado y aprobación de S2.

| ID | Implementación | Aceptación |
|---|---|---|
| S2-01 | Preferencias de zona horaria y contrato de fechas | Fechas de estudio no cambian por conversión UTC |
| S2-02 | Crear/editar planes y plantilla personal de 28 semanas | Fechas y contenidos editables; sin presentarla como calendario oficial |
| S2-03 | Tareas con estados y minutos reales | Completar, reabrir y editar no duplica tiempo |
| S2-04 | Recursos con enlaces y procedencia | Asociaciones coherentes; URLs seguras y validación server-side |
| S2-05 | `/plans` con vistas semanal/calendario; `/` con progreso y próximas tareas | Métricas derivadas de D1, no del mockup |
| S2-06 | Pruebas de fechas, agregados, persistencia y flujos móviles | Cambio de zona, medianoche, lista vacía y reapertura cubiertos |

Decisiones a revisar al abrir S2: fecha de inicio y distribución del plan; zona por defecto; minutos acumulados frente a sesiones de estudio. Propuesta MVP: minutos por tarea, sin tabla de sesiones salvo necesidad explícita. Definir denominadores de progreso y tratamiento de tareas archivadas antes de construir métricas.

Dependencias: fechas/preferencias → planes → tareas/recursos → agregados/dashboard → E2E. No crear intentos ni datos de examen ficticios para rellenar el dashboard.

## 8. S3 — Preguntas originales, simulacros y resultados

Entrada: S2 cerrado, aprobación de S3 y contenido original revisable.

| ID | Implementación | Aceptación |
|---|---|---|
| S3-01 | Contratos de pregunta/opción/explicación y revisión editorial | Solo preguntas originales revisadas y publicadas son elegibles |
| S3-02 | Selección por certificación, versión y disponibilidad | Cero preguntas ofrece estado vacío; no inicia intento inválido |
| S3-03 | Inicio y snapshots de contenido, dominio y claves | Cambios posteriores al banco no alteran el intento |
| S3-04 | Respuesta, navegación, reanudación y confirmación de envío | Selecciones validadas y persistidas; sin claves en respuestas cliente |
| S3-05 | Calificación server-side y envío idempotente | Repetición/concurrencia no duplica ni cambia resultados |
| S3-06 | Resultados, explicaciones y desglose por dominio | Disponibles tras envío; porcentaje de práctica, no puntuación oficial |
| S3-07 | Pruebas de seguridad, concurrencia, snapshots y E2E | HTML/RSC/JSON antes del envío no contienen claves ni explicaciones reveladoras |

Definir antes de S3-03: tipos soportados, regla exacta de selección múltiple, duración y comportamiento de expiración. Propuesta a revisar: selección simple/múltiple, coincidencia exacta sin crédito parcial y temporizador basado en tiempos del servidor. No copiar duración ni umbrales del mockup como hechos oficiales.

La finalización deberá congelar respuestas y calificar de forma coherente ante peticiones concurrentes. Usar transiciones condicionales y batches D1 donde permitan atomicidad; probar fallos parciales y reintentos. No asumir transacciones interactivas SQL genéricas.

Contenido: acordar un conjunto pequeño original y su revisión humana. No generar preguntas mediante IA ni importar dumps. Si no existe contenido aprobado, entregar el flujo vacío y mantener pendiente la aceptación del simulacro completo; no declarar S3 completo con fixtures de prueba como contenido publicado.

## 9. S4 — Seguridad remota, recuperación y entrega

Entrada: S3 cerrado y aprobación de S4. Las tareas locales pueden prepararse antes de pedir autorización remota; el despliegue requiere autorización específica.

| ID | Implementación/operación | Aceptación |
|---|---|---|
| S4-01 | Auditoría de lecturas privadas, mutaciones, DTOs y errores | Denegación por defecto; no se confía en headers de identidad sin validar |
| S4-02 | Validación Access JWT e identidad autorizada | Firma, emisor, audiencia, expiración e identidad comprobados |
| S4-03 | Runbook exacto de Access, bindings, secretos y rutas | Protección de producción y previews; sin hostname alternativo desprotegido |
| S4-04 | Preparar configuración remota y revisar límites/costes | Cuenta, DB y hostname reales; recursos mínimos; no prometer coste cero permanente |
| S4-05 | Backup y restauración ensayada; migraciones revisadas | Exportación protegida y recuperación comprobable |
| S4-06 | Auditoría responsive/accesibilidad y E2E de journeys principales | Teclado, foco, estados y móvil verificados |
| S4-07 | Crear recursos, migrar, seed y desplegar tras autorización | Worker usa D1 remoto y accesos anónimos quedan denegados |
| S4-08 | Verificar persistencia, acceso y operación remotos; cierre | Evidencia real y runbook final; CI/CD solo después de despliegue manual validado |

Antes de S4-07 presentar el cambio concreto: recursos y nombres, configuración de Access, migraciones, datos de seed, límites/costes y recuperación. No ejecutar comandos remotos destructivos implícitos. Proteger la aplicación antes de exponer datos personales o endpoints de escritura.

Si no se autoriza despliegue, informar exactamente qué parte quedó preparada y qué verificación remota sigue pendiente. No afirmar que S4 remoto pasó solo por aprobar pruebas locales.

## 10. Seguridad y backups durante todos los sprints

- Autorización server-side desde la primera mutación; S4 endurece y verifica la publicación, no introduce seguridad por primera vez.
- Modo local explícito y acotado; no basar bypass únicamente en `NODE_ENV` o en headers proporcionados por el cliente.
- Zod y consultas parametrizadas; control de origen en mutaciones del navegador.
- Claves de respuesta y datos sensibles fuera de DTOs cliente, logs y archivos versionados.
- Volumen D1 para persistencia; exportación independiente para backup. `docker compose down` conserva datos; `down -v` los elimina y nunca forma parte del flujo normal.
- Backups SQL ignorados por Git y Docker, con acceso restringido. Restaurar primero en base aislada; comparar filas y relaciones antes de sustituir datos.
- Usar exportación y capacidades remotas de recuperación según disponibilidad real; registrar retención y procedimiento al preparar S4.

## 11. Riesgos, dependencias y decisiones de revisión

| Riesgo/dependencia | Respuesta | Momento |
|---|---|---|
| Adapter y APIs Node incompatibles | Spike previo; detenerse si falla sin solución dentro del stack | S0 |
| Imagen/toolchain y paquetes nativos | Verificar digest, lockfile y arquitectura real | S0 |
| Acceso a Docker o red de instalación | Registrar bloqueo del entorno; no confundirlo con fallo de arquitectura | S0 |
| Estado D1 dividido entre comandos | Una configuración y ruta persistida por entorno | S0 |
| Bootstrap sobreescribe datos | Seeds no destructivos y prueba de doble ejecución | S0 |
| Build lento o sin hot reload | Medir; documentar separación de preview y desarrollo UI | S0 |
| Relaciones cruzadas o pérdida de historial | FKs, checks, archivado y pruebas negativas | S0–S3 |
| Fechas y métricas ambiguas | Acordar semántica antes de implementar agregados | S2 |
| Contenido original no disponible | Separar fixtures de contenido publicado; revisión explícita | S3 |
| Doble envío o respuesta tardía | Transiciones condicionales y pruebas concurrentes | S3 |
| Access incompleto o bypass remoto | Denegación por defecto, JWT y pruebas por cada ruta de acceso | S4 |
| Diferencias local/producción | Verificación remota posterior a autorización | S4 |

Puntos para revisar ahora:

1. Alcance de S0: esquema base completo y página mínima de diagnóstico; catálogo funcional en S1.
2. Arranque automático con migraciones y seed **locales**, además de comandos manuales.
3. Toolchain candidato sujeto a prueba, sin certificar versiones antes de ejecutarlas.
4. Secuencia S0–S4 con aprobación independiente por sprint y para acciones remotas.

No se requieren todavía credenciales Cloudflare, dominio, cuenta de pago ni preguntas de examen. Las decisiones de contenido, calendario personal y publicación se resolverán antes del sprint que dependa de ellas.

## 12. Seguimiento y plantilla de cierre

| Sprint | Estado | Evidencia |
|---|---|---|
| S0 | En implementación; pruebas Docker pendientes por fallo del entorno | Ver `S0_REPORT.md` |
| S1 | Pendiente | — |
| S2 | Pendiente | — |
| S3 | Pendiente | — |
| S4 | Pendiente | — |

Al cerrar cada sprint registrar:

1. Tareas completadas por ID y comportamiento observable.
2. Archivos, migraciones y decisiones modificadas.
3. Comandos ejecutados, entorno, versiones y resultados.
4. Criterios pendientes, fallos y limitaciones reales.
5. Riesgos abiertos y pasos manuales necesarios.
6. Propuesta concreta del siguiente sprint para aprobación.

Este documento es la referencia de ejecución detallada; `BACKLOG.md` conserva el resumen del producto. Actualizar ambos si cambia el alcance aprobado.
