# Sprint 0 — Registro de verificación

Fecha: 2026-11-15. Estado: **en curso; no se ha declarado S0 completo**.

## Implementación

- Scaffold Next.js/App Router, TypeScript estricto, Tailwind y Zod.
- OpenNext, configuración local Wrangler y binding DB detrás de repositorios server-only.
- Doce tablas base Drizzle y migración inicial generada. Credenciales diferidas.
- Seed idempotente de Microsoft, cinco códigos solicitados y GitHub vacío.
- Bootstrap Docker, volumen de D1 local, API de diagnóstico autenticada y scripts remotos deshabilitados.
- Pruebas unitarias, integración D1 aislada, E2E y prueba de reinicio preparadas.

## Resultados ejecutados

| Comprobación | Entorno | Resultado |
|---|---|---|
| Manifest/pull Node 22.23.5 + digest | Docker | Correcto; imagen multiarch disponible |
| Node en contenedor sin aplicación | Linux amd64 | v22.23.5; correcto tras recuperación del daemon |
| `docker compose config --quiet` | Host | Correcto |
| Lockfile con npm 10.9.9 | Host Node fijado | Falló con `edgesOut`; reemplazado por npm 11.19.1 |
| Lockfile con npm 11.19.1 | Host Node fijado | Correcto |
| `npm ci` | Host Node fijado | Correcto; 661 paquetes |
| `npm ci` durante Docker build | Linux amd64 | Correcto; 660 paquetes (diferencias opcionales por plataforma) |
| `npm run db:generate` | Host Node fijado | Correcto; 12 tablas, SQL y metadatos generados |
| `npm run lint` inicial | Host Node fijado | 0 errores, 1 warning; export anónimo corregido posteriormente |
| `npm run test:unit` inicial | Host Node fijado | 3 archivos, 9 pruebas correctas |
| Build Docker completo | Linux amd64 | En curso |
| Build OpenNext / binding D1 | Docker | Pendiente |
| Typecheck/lint/unit finales | Docker | Pendiente |
| Migraciones/seed/integración/restauración | Docker | Pendiente |
| E2E y puerto del host | Docker/host | Pendiente |
| Persistencia tras Compose down/up | Docker | Pendiente |

## Incidencias y riesgos

Docker Desktop inicialmente dejó contenedores mínimos en estado Created y falló al reiniciarse. Tras recuperarse, ejecutó Node correctamente. No se borraron volúmenes ni contenedores ajenos al proyecto. El host macOS 12.7.6 no cumple el mínimo actual de Wrangler; las verificaciones nativas no sustituyen el runtime Linux.

`npm audit --omit=dev --json` reportó 3 entradas moderadas asociadas a OpenNext/glob/minimatch, 0 altas y 0 críticas. La instalación completa en Docker reportó 15 avisos moderados incluyendo herramientas de desarrollo. No se ejecutó `npm audit fix --force`. Revisar dependencias y exposición antes de publicación; S0 es exclusivamente local.

Apple Silicon: manifiesto disponible, ejecución no probada. Cloudflare remoto, Access, cuotas, costes, despliegue y recuperación remota: no ejecutados ni autorizados.
