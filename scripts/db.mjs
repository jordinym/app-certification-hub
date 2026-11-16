import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const [operation, environment, ...extra] = process.argv.slice(2);
if (environment !== "local" || !["migrate", "seed", "backup", "restore"].includes(operation)) {
  throw new Error("Explicit supported operation and local environment required");
}
const config = resolve(process.env.D1_LOCAL_CONFIG ?? "wrangler.jsonc");
const defaultState = join(dirname(config), ".wrangler/state");
const state = resolve(process.env.D1_LOCAL_STATE ?? defaultState);
const base = ["--config", config, "--local", "--persist-to", state];
let args;
if (operation === "migrate") args = ["d1", "migrations", "apply", "DB", ...base];
if (operation === "seed") args = ["d1", "execute", "DB", ...base, "--file", "scripts/seed.sql"];
if (operation === "backup") {
  // Wrangler 4.162.0 export has no --persist-to flag. Refuse to silently
  // export another DB when a non-default state was selected.
  if (state !== defaultState) throw new Error("Export requires .wrangler/state beside D1_LOCAL_CONFIG; this Wrangler version does not support export --persist-to");
  mkdirSync("backups", { recursive: true, mode: 0o700 });
  const path = extra[0] ?? `backups/local-${new Date().toISOString().replaceAll(":", "-")}.sql`;
  const scratch = mkdtempSync(join(tmpdir(), "certification-hub-export-"));
  try {
    // Export may insert children before the parent table is even created.
    // Keep all DDL before data; deferred FKs then validate the imported rows.
    for (const [part, flag] of [["schema", "--no-data"], ["data", "--no-schema"]]) {
      const result = spawnSync("node_modules/.bin/wrangler", ["d1", "export", "DB", "--config", config, "--local", flag, "--output", join(scratch, `${part}.sql`)], { stdio: "inherit", env: process.env });
      if (result.error) throw result.error;
      if (result.status !== 0) throw new Error(`Local ${part} export failed (${result.status})`);
    }
    writeFileSync(resolve(path), `PRAGMA defer_foreign_keys=ON;\n${readFileSync(join(scratch, "schema.sql"), "utf8")}\n${readFileSync(join(scratch, "data.sql"), "utf8")}\n`, { flag: "wx", mode: 0o600 });
    console.log(`Local backup written to ${path}`);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}
if (operation === "restore") {
  if (!extra[0] || !process.env.D1_LOCAL_STATE || state === defaultState || state === resolve(".wrangler/state")) {
    throw new Error("Restore requires a backup path and D1_LOCAL_STATE pointing to an isolated target");
  }
  args = ["d1", "execute", "DB", ...base, "--file", extra[0]];
}
if (args) {
  const result = spawnSync("node_modules/.bin/wrangler", args, { stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
