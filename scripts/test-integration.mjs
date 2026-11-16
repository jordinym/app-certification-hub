import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = mkdtempSync(join(tmpdir(), "certification-hub-test-"));
const sourceRoot = join(root, "source");
mkdirSync(sourceRoot);
const configPath = join(sourceRoot, "wrangler.json");
const config = JSON.parse(readFileSync("wrangler.jsonc", "utf8"));
config.name = "certification-hub-test";
config.main = resolve(".open-next/worker.js");
config.assets.directory = resolve(".open-next/assets");
config.services = [{ binding: "WORKER_SELF_REFERENCE", service: config.name }];
for (const database of config.d1_databases) database.migrations_dir = resolve("drizzle");
writeFileSync(configPath, JSON.stringify(config));
const state = join(sourceRoot, ".wrangler/state");
const restored = join(root, "restored");
const env = { ...process.env, D1_LOCAL_STATE: state, D1_LOCAL_CONFIG: configPath, WRANGLER_SEND_METRICS: "false" };
const run = (args, options = {}) => execFileSync(process.execPath, args, { env, encoding: "utf8", ...options });
const db = (operation, ...args) => run(["scripts/db.mjs", operation, "local", ...args]);
const sql = (command, target = state) => JSON.parse(execFileSync("node_modules/.bin/wrangler", ["d1", "execute", "DB", "--config", configPath, "--local", "--persist-to", target, "--command", command, "--json"], { env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
const rows = (command, target) => sql(command, target)[0].results;
const rejectSql = (command) => {
  try {
    sql(command);
    assert.fail("Expected a database constraint rejection");
  } catch (error) {
    // A syntax error, broken CLI or missing database must not count as a pass.
    assert.match(`${error.stdout ?? ""}${error.stderr ?? ""}${error.message}`, /constraint failed/i);
  }
};
let preview;
let output = "";

try {
  db("migrate");
  db("seed");
  db("migrate");
  db("seed");
  assert.equal(rows("SELECT count(*) AS n FROM providers")[0].n, 2);
  assert.equal(rows("SELECT count(*) AS n FROM certifications")[0].n, 5);
  assert.equal(rows("SELECT count(*) AS n FROM certifications WHERE provider_id='github'")[0].n, 0);
  sql("UPDATE certifications SET title='Personal title' WHERE code='AZ-900'");
  db("seed");
  assert.equal(rows("SELECT title FROM certifications WHERE code='AZ-900'")[0].title, "Personal title");
  rejectSql("INSERT INTO certifications (id,provider_id,code,title) VALUES ('bad','missing','TEST','Test')");
  rejectSql("INSERT INTO certifications (id,provider_id,code,title) VALUES ('duplicate','microsoft','AZ-900','Test')");
  rejectSql("INSERT INTO certifications (id,provider_id,code,title) VALUES ('lower','github','lower','Test')");
  sql("INSERT INTO exam_versions (id,certification_id,label) VALUES ('v1','microsoft-az-900','draft-1'), ('v2','microsoft-ai-901','draft-1')");
  sql("INSERT INTO exam_domains (id,exam_version_id,title,sort_order) VALUES ('d1','v1','Domain',0), ('d2','v2','Domain',0)");
  rejectSql("INSERT INTO exam_domains (id,exam_version_id,title,sort_order,weight_min,weight_max) VALUES ('bad-domain','v1','Bad',1,90,10)");
  rejectSql("INSERT INTO questions (id,exam_version_id,domain_id,stem,explanation,question_type) VALUES ('bad-question','v1','d2','Original fixture','Explanation','single')");
  rejectSql("INSERT INTO study_plans (id,certification_id,exam_version_id,name,start_date,end_date,timezone) VALUES ('bad-plan','microsoft-az-900','v2','Plan','2026-11-01','2026-12-01','America/Lima')");
  sql("INSERT INTO study_plans (id,certification_id,exam_version_id,name,start_date,end_date,timezone) VALUES ('p1','microsoft-az-900','v1','Plan','2026-11-01','2026-12-01','America/Lima')");
  sql("INSERT INTO study_tasks (id,study_plan_id,exam_version_id,exam_domain_id,title,due_date) VALUES ('t1','p1','v1','d1','Task','2026-11-02')");
  rejectSql("INSERT INTO study_tasks (id,study_plan_id,exam_version_id,exam_domain_id,title,due_date) VALUES ('bad-task','p1','v2','d2','Task','2026-11-02')");
  rejectSql("UPDATE study_tasks SET actual_minutes=-1 WHERE id='t1'");
  rejectSql("DELETE FROM exam_versions WHERE id='v1'");
  assert.deepEqual(rows("PRAGMA foreign_key_check"), []);

  run(["scripts/local-env.mjs"]);
  const token = readFileSync(".dev.vars", "utf8").match(/^LOCAL_API_TOKEN=(.+)$/m)?.[1];
  assert.ok(token && token.length >= 32, "Local token must be configured");
  writeFileSync(join(sourceRoot, ".dev.vars"), `LOCAL_API_TOKEN=${token}\n`, { mode: 0o600 });
  const inspectPublicArtifacts = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) inspectPublicArtifacts(path);
      else {
        const content = readFileSync(path, "utf8");
        assert.ok(!content.includes(token), `Local secret leaked in ${path}`);
        assert.doesNotMatch(content, /answer_key_snapshot_json|\bis_correct\b/, `Private schema leaked in ${path}`);
      }
    }
  };
  inspectPublicArtifacts(".open-next/assets");
  preview = spawn("node_modules/.bin/opennextjs-cloudflare", ["preview", "--config", configPath, "--ip", "127.0.0.1", "--port", "3001", "--persist-to", state], { env, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  preview.stdout.on("data", (data) => { output += data; });
  preview.stderr.on("data", (data) => { output += data; });
  const base = "http://127.0.0.1:3001";
  let ready = false;
  for (let n = 0; n < 90; n++) {
    if (preview.exitCode !== null) throw new Error(`Preview exited: ${output}`);
    try { ready = (await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(2000) })).ok; } catch { /* starting */ }
    if (ready) break;
    await delay(1000);
  }
  assert.ok(ready, `Worker did not become ready: ${output}`);
  const endpoint = `${base}/api/local/catalog`;
  const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };
  assert.equal((await fetch(endpoint)).status, 403);
  assert.equal((await fetch(endpoint, { method: "POST", headers: { ...headers, origin: "https://attacker.example" }, body: "{}" })).status, 403);
  assert.equal((await fetch(endpoint, { method: "POST", headers, body: "{}" })).status, 400);
  const body = JSON.stringify({ providerId: "github", code: "LOCAL-TEST", title: "Original test fixture" });
  const created = await fetch(endpoint, { method: "POST", headers, body });
  assert.equal(created.status, 201);
  const { id } = await created.json();
  assert.ok(id);
  assert.equal((await fetch(endpoint, { method: "POST", headers, body })).status, 409);
  const catalog = await (await fetch(endpoint, { headers })).json();
  assert.ok(!JSON.stringify(catalog).includes(token));
  assert.deepEqual(Object.keys(catalog.certifications[0]).sort(), ["code", "id", "providerId", "title"].sort());
  assert.ok(catalog.certifications.some((item) => item.id === id && item.code === "LOCAL-TEST"));
  assert.equal(rows("SELECT count(*) AS n FROM certifications WHERE code='LOCAL-TEST'")[0].n, 1, "Worker and CLI must use the same isolated D1 state");

  const backup = join(root, "backup.sql");
  db("backup", backup);
  run(["scripts/db.mjs", "restore", "local", backup], { env: { ...env, D1_LOCAL_STATE: restored } });
  for (const table of ["providers", "certifications", "exam_versions", "exam_domains", "study_plans", "study_tasks"]) {
    assert.deepEqual(rows(`SELECT * FROM ${table} ORDER BY id`, state), rows(`SELECT * FROM ${table} ORDER BY id`, restored));
  }
  assert.deepEqual(rows("PRAGMA foreign_key_check", restored), []);
  console.log("PASS: migrations, seeds, constraints, authenticated Worker read/write, isolated D1, backup and restoration");
} finally {
  if (preview?.pid) {
    try { process.kill(-preview.pid, "SIGTERM"); } catch { /* already exited */ }
    await delay(1500);
    try { process.kill(-preview.pid, "SIGKILL"); } catch { /* already exited */ }
  }
  rmSync(root, { recursive: true, force: true });
}
