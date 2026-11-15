# Evidencia de compatibilidad — Sprint 0

Fecha de trabajo: 2026-11-15. **Compatibilidad ejecutable completa todavía no verificada.**

## Versiones fijadas

| Componente | Versión |
|---|---|
| Node | 22.23.5 |
| Imagen | node:22.23.5-bookworm-slim |
| Digest de imagen | sha256:e9f565d32859f0cbfb52125eafe8be39390f24dac302dc3cdf566e8ba3ab21ee |
| npm | 11.19.1 |
| Next.js | 16.4.6 |
| React / React DOM | 19.3.1 |
| OpenNext Cloudflare | 1.20.17 |
| Wrangler | 4.162.0 |
| Miniflare (transitiva) | 5.20261113.0-beta |
| workerd (transitiva) | 1.20261113.1 |
| Drizzle ORM / Kit | 0.45.4 / 0.31.11 |
| TypeScript | 5.9.3 |
| Tailwind / plugin PostCSS | 4.3.5 |
| Zod | 4.6.7 |
| Vitest / Vite resuelto | 4.1.11 / 8.3.8 |
| Playwright | 1.63.0 |
| ESLint / eslint-config-next | 9.39.5 / 16.4.6 |

`package-lock.json` fija transitivas. Miniflare tiene etiqueta beta y no se sustituye independientemente de Wrangler. El mínimo de Node de Wrangler es 22.12.0; el Node elegido lo satisface. OpenNext declara Next >=15.5.29 <16 o >=16.4.5 y Wrangler ^4.148.0; las versiones elegidas cumplen esos rangos.

npm 10.9.9, incluido en la imagen Node, falló generando el lockfile con `Cannot read properties of null (reading 'edgesOut')`. Se fijó npm 11.19.1 y la generación terminó correctamente. No se usaron `--force` ni `--legacy-peer-deps` para omitir conflictos.

## Entorno observado

- macOS 12.7.6, x86_64.
- Docker CLI/Engine 24.0.2; Compose v2.18.1.
- Motor Docker con 4 GiB de memoria asignada.
- Imagen descargada; manifiestos amd64 y arm64 disponibles. No se ha probado arm64.
- Los contenedores mínimos quedaron en estado Created; tras reinicio Docker Desktop devolvió errores internos y ausencia de sockets del backend.
- Node 22.23.5 para comprobaciones estáticas se descargó temporalmente, verificando SHA256 contra SHASUMS256 oficial. No se sustituyó el Node global del usuario.
- La instalación y las pruebas nativas no sustituyen `npm ci`, build y tests en Docker.

## Configuración elegida

Next utiliza runtime Node.js con OpenNext; no `runtime: edge`. Build inicial con Webpack. Wrangler usa fecha de compatibilidad 2026-11-13, binding DB local y rutas públicas deshabilitadas. Mantener `nodejs_compat` explícito según la recomendación del adaptador; verificar cualquier advertencia con el CLI fijado antes de cerrar el spike.

No se configuran R2, queues, caché distribuida ni recursos remotos. El acceso D1 usa `getCloudflareContext().env.DB` y `drizzle-orm/d1`; las páginas son dinámicas. La base local tiene un identificador deliberadamente local, no un UUID remoto fabricado.

## Referencias

- [OpenNext: soporte](https://opennext.js.org/cloudflare), [configuración](https://opennext.js.org/cloudflare/get-started), [bindings](https://opennext.js.org/cloudflare/bindings), [CLI](https://opennext.js.org/cloudflare/cli).
- [Manifiesto del adaptador](https://github.com/opennextjs/opennextjs-cloudflare/blob/main/packages/cloudflare/package.json).
- [Wrangler: requisitos](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
- [Workers: APIs Node](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).
- [Drizzle con D1](https://orm.drizzle.team/docs/get-started/d1-new).
- [D1: migraciones](https://developers.cloudflare.com/d1/reference/migrations/) y [foreign keys](https://developers.cloudflare.com/d1/sql-api/foreign-keys/).
- [Node: descargas](https://nodejs.org/en/download).

Resultados por comando y aceptación pendiente: [S0_REPORT.md](S0_REPORT.md). Si el spike falla por incompatibilidad de la combinación seleccionada, detener y revisar alternativas antes de continuar; un fallo del daemon no demuestra incompatibilidad del stack.
