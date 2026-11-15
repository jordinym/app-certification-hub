import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const [operation, environment, ...extra] = process.argv.slice(2);
if (environment !== "local" || !["migrate", "seed", "backup", "restore"].includes(operation)) {
  throw new Error("Explicit supported operation and local environment required");
}
const state = process.env.D1_LOCAL_STATE ?? ".wrangler/state";
const base = ["--config", "wrangler.jsonc", "--local", "--persist-to", state];
let args;
if (operation === "migrate") args = ["d1", "migrations", "apply", "DB", ...base];
if (operation === "seed") args = ["d1", "execute", "DB", ...base, "--file", "scripts/seed.sql"];
if (operation === "backup") {
  mkdirSync("backups", { recursive: true, mode: 0o700 });
  const path = extra[0] ?? `backups/local-${new Date().toISOString().replaceAll(":", "-")}.sql`;
  args = ["d1", "export", "DB", ...base, "--output", path];
}
if (operation === "restore") {
  if (!extra[0] || !process.env.D1_LOCAL_STATE || resolve(state) === resolve(".wrangler/state")) {
    throw new Error("Restore requires a backup path and D1_LOCAL_STATE pointing to an isolated target");
  }
  args = ["d1", "execute", "DB", ...base, "--file", extra[0]];
}
const result = spawnSync("node_modules/.bin/wrangler", args, { stdio: "inherit", env: process.env });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
