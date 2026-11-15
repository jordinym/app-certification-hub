#!/bin/sh
set -eu
node scripts/local-env.mjs
npm run cf:typegen
npm run db:migrate:local
npm run db:seed:local
exec npm run dev:cloudflare
