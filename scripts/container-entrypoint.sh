#!/bin/sh
set -eu
if [ ! -f package-lock.json ]; then
  echo 'Missing package-lock.json; restore the committed lockfile.' >&2
  exit 1
fi
# Reconcile the Linux dependencies, including on one-off container starts.
npm ci --no-audit --no-fund
exec "$@"
