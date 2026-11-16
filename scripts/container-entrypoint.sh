#!/bin/sh
set -eu
if [ ! -f package-lock.json ]; then
  echo 'Missing package-lock.json; restore the committed lockfile.' >&2
  exit 1
fi
node scripts/dependencies.mjs
exec "$@"
