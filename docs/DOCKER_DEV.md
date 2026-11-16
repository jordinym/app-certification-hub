# ADR-006 — Desarrollo local reproducible con Docker

## Estado

Configuración de S0 implementada, **pendiente de aceptación del runtime**. Consultar [S0_REPORT.md](S0_REPORT.md) para resultados ejecutados. Docker Desktop del entorno de trabajo falla incluso al iniciar un contenedor Node sin aplicación; no se declara el entorno validado.

## Requisitos y límites

Docker Engine/Desktop funcional, Compose v2 y red para descargar Node, npm y Chromium. Preferir arquitectura nativa. La imagen Node tiene manifiestos amd64 y arm64; Apple Silicon no se ha probado. Docker emula Workers/D1 mediante Wrangler/Miniflare; no emula Access ni todos los límites de Cloudflare.

No se necesita cuenta Cloudflare ni ejecutar `wrangler login`. La configuración raíz es exclusivamente local. Los scripts remotos rechazan la operación durante S0.

## Inicio

```sh
docker compose up --build
```

El servicio `app` usa la imagen exacta de Node y npm fijado. El target `test` incluye Chromium para ejecutar pruebas en el mismo entorno. La imagen ejecuta `npm ci`. El entrypoint comprueba una huella de package.json, lockfile, .npmrc, Node, npm y plataforma; ejecuta `npm ci` únicamente si no coincide y luego inicia el comando solicitado. Para reparar una modificación manual de node_modules, ejecutar `node scripts/dependencies.mjs force` con la aplicación detenida. El comando por defecto genera un token local si no existe, genera tipos de bindings, aplica migraciones, siembra el catálogo y ejecuta build/preview OpenNext.

La aplicación escucha en `0.0.0.0:3000` dentro del contenedor; Compose publica únicamente `127.0.0.1:3000` en el host. El healthcheck consulta `/api/health`, que comprueba la tabla de proveedores sin devolver datos personales.

Los cambios de código requieren recompilar/reiniciar el preview. Para iteración UI puede usarse `npm run dev:next` con el preview detenido, pero esa ejecución no demuestra compatibilidad con Workers.

## Volúmenes y dependencias

- Proyecto Compose estable: `certification-hub`.
- Código montado en `/workspace`.
- Volumen `node_modules` con dependencias Linux; oculta cualquier instalación nativa del host.
- Volumen `wrangler_state` en `/workspace/.wrangler/state`.
- Migraciones, seed y preview deben utilizar la misma configuración, binding e identidad local de base.
- No ejecutar simultáneamente dos contenedores que reinstalen el mismo volumen de dependencias. Con la app iniciada utilizar `docker compose exec app ...`.
- `docker compose down` conserva datos. `docker compose down -v` los borra: solo para un reset intencional, nunca como paso de diagnóstico rutinario.

## Operaciones explícitamente locales

Con el servicio iniciado:

```sh
docker compose exec app npm run db:migrate:local
docker compose exec app npm run db:seed:local
docker compose exec app npm run db:backup:local
```

Con el servicio detenido, después del build:

```sh
docker compose run --rm app npm run db:migrate:local
docker compose run --rm app npm run db:seed:local
```

El seed no actualiza títulos personalizados ni elimina registros. Una base nueva tiene exactamente dos proveedores y cinco certificaciones; las ejecuciones posteriores pueden contener datos de prueba adicionales.

## Pruebas

```sh
docker compose exec app npm run typecheck
docker compose exec app npm run lint
docker compose exec app npm run test:unit
docker compose exec app npm run test:integration
docker compose exec app npm run test:e2e
```

Integración usa un directorio temporal, D1 separado y preview en puerto interno 3001. Migra y siembra dos veces, prueba restricciones, escribe/lee por el Worker y exporta/restaura una base aislada. No modifica la base de desarrollo. E2E consulta el preview principal en puerto 3000.

Prueba de reinicio:

```sh
docker compose exec app npm run test:persistence -- create
docker compose down
docker compose up -d
# Esperar al estado healthy indicado por docker compose ps.
docker compose exec app npm run test:persistence -- verify
```

Comprueba el mismo ID, código y título de un registro distinto de los seeds. Después de verificar, `npm run test:persistence -- cleanup` elimina únicamente el fixture registrado y sin modificaciones; no ofrece un endpoint genérico de borrado.

## Backups y restauración

`db:backup:local` escribe SQL en `backups/`, ignorado por Git y Docker. Es una copia separada del volumen, no un sustituto de una política de retención externa. Restringir acceso a backups que contengan datos personales.

Restaurar en un estado aislado, con la app detenida:

```sh
docker compose run --rm -e D1_LOCAL_STATE=/workspace/.wrangler/restore-check app npm run db:restore:local -- backups/ARCHIVO.sql
```

El script rechaza restaurar sobre `.wrangler/state` de desarrollo o sobre el estado por defecto de la configuración elegida. Wrangler 4.162.0 no admite `--persist-to` en exportación: backup exige el estado `.wrangler/state` junto a la configuración seleccionada (`D1_LOCAL_CONFIG`, por defecto la raíz). Exporta esquema y datos por separado y los combina en ese orden, para que todas las tablas existan antes de insertar filas. No ejecutar migraciones concurrentes durante el backup. No copiar manualmente archivos SQLite activos. La prueba de integración comprueba filas y `PRAGMA foreign_key_check` tras restaurar.

## Protección y diagnóstico

`.dev.vars` contiene un token aleatorio generado localmente, con permisos restringidos; no se versiona ni se copia a la imagen. La API `/api/local/catalog` exige modo local, hostname local y bearer token; rechaza origen cruzado. Su propósito es verificar el spike, no ofrecer un catálogo remoto.

No exportar el token mediante variables `NEXT_PUBLIC_*`, logs, páginas ni argumentos de comandos compartidos. Los tests lo leen desde el archivo sin imprimirlo. La configuración remota y Cloudflare Access se implementarán/verificarán antes de cualquier despliegue autorizado.

Si Docker no inicia ni `docker run --rm --network none node:22.23.5-bookworm-slim node --version`, resolver primero Docker Desktop. No cambiar el stack ni borrar volúmenes para encubrir ese fallo. El host macOS 12.7.6 observado no satisface el mínimo actual de Wrangler; la aceptación requiere Linux dentro de Docker.
