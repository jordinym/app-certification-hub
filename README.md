# Certification Hub

Aplicación personal, privada y agnóstica del proveedor para preparar certificaciones.

**Estado: Sprint 0 en implementación. El runtime Docker/D1 todavía no está validado.**
Consultar [evidencia de S0](docs/S0_REPORT.md) antes de dar por ejecutados los comandos siguientes.

## Stack

Next.js App Router + TypeScript estricto + Tailwind + Zod, mediante OpenNext sobre Cloudflare Workers. D1 con Drizzle, migraciones SQL ejecutadas por Wrangler. Docker Compose proporciona Linux, Miniflare y D1 local; no se despliega Docker a producción.

## Desarrollo local

Requisitos: Docker Desktop/Engine funcional con Compose v2 y conexión de red para descargar la imagen, paquetes y Chromium. No se necesitan cuenta ni credenciales Cloudflare.

```sh
docker compose up --build
```

Objetivo: http://localhost:3000. El contenedor sincroniza dependencias con `npm ci`, aplica migraciones locales, ejecuta el seed idempotente, compila OpenNext y sirve el Worker local. El primer arranque tarda más porque incluye compilación y descarga de herramientas de pruebas.

```sh
docker compose exec app npm run typecheck
docker compose exec app npm run lint
docker compose exec app npm run test:unit
docker compose exec app npm run test:integration
docker compose exec app npm run test:e2e
```

No iniciar dos contenedores que reinstalen simultáneamente el mismo volumen de dependencias. Con la app iniciada, usar `exec`; para operaciones con la app detenida, usar `run --rm app`.

```sh
docker compose exec app npm run test:persistence -- create
docker compose down
docker compose up -d
# Esperar a que el contenedor esté healthy.
docker compose exec app npm run test:persistence -- verify
```

`down` conserva D1; `down -v` lo borra. Los fixtures de persistencia son datos locales de prueba y permanecen para demostrar el reinicio.

## Alcance actual

Página mínima de catálogo inicial y API local de diagnóstico protegida por token generado en `.dev.vars`. Los scripts remotos están deshabilitados. La aplicación no está preparada para publicación: la autenticación Cloudflare Access y su validación real se completarán antes del despliegue autorizado.

Seed: Microsoft con AZ-900, AI-901, AI-200, AZ-104, AZ-305; GitHub vacío. No se incluyen metadatos oficiales sin verificar, progreso ficticio ni preguntas. El CRUD funcional pertenece a S1.

## Documentación

- [Plan detallado S0–S4](docs/IMPLEMENTATION_PLAN.md)
- [Backlog](docs/BACKLOG.md)
- [Producto](docs/PRODUCT_SPEC.md) y [UI](docs/UI_SPEC.md)
- [Arquitectura](docs/ARCHITECTURE.md) y [decisiones](docs/DECISIONS.md)
- [Docker y operación local](docs/DOCKER_DEV.md)
- [Compatibilidad y versiones](docs/COMPATIBILITY.md)
- [Despliegue y protección](docs/DEPLOYMENT.md)
- [Resultados reales de S0](docs/S0_REPORT.md)

No crear recursos remotos, desplegar, activar servicios de pago ni avanzar de sprint sin autorización explícita.
