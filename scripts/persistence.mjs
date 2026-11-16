import assert from "node:assert/strict";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

// Two phases deliberately separated by the operator's compose down/up.
const phase = process.argv[2];
assert.ok(["create", "verify", "cleanup"].includes(phase), "Use create, then compose down/up without -v, then verify; cleanup removes only the recorded fixture");
const token = readFileSync(".dev.vars", "utf8").match(/^LOCAL_API_TOKEN=(.+)$/m)?.[1];
assert.ok(token);
const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };
const endpoint = "http://localhost:3000/api/local/catalog";
const path = ".wrangler/persistence-proof.json";
if (phase === "create") {
  const code = `PERSIST-${Date.now()}`;
  const title = "Local persistence verification";
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify({ providerId: "github", code, title }) });
  assert.equal(response.status, 201);
  const { id } = await response.json();
  writeFileSync(path, JSON.stringify({ id, code, title }));
  console.log("Created persistence fixture. Restart Compose without -v, then verify.");
} else if (phase === "verify") {
  const expected = JSON.parse(readFileSync(path, "utf8"));
  const response = await fetch(endpoint, { headers });
  assert.equal(response.status, 200);
  const { certifications } = await response.json();
  const actual = certifications.find((item) => item.id === expected.id);
  assert.ok(actual);
  assert.equal(actual.code, expected.code);
  assert.equal(actual.title, expected.title);
  console.log("PASS: identical ID, code and title survived Compose restart.");
} else {
  const fixture = JSON.parse(readFileSync(path, "utf8"));
  assert.match(fixture.id, /^[0-9a-f-]{36}$/);
  assert.match(fixture.code, /^PERSIST-\d+$/);
  assert.equal(fixture.title, "Local persistence verification");
  const before = await fetch(endpoint, { headers });
  assert.equal(before.status, 200);
  const current = (await before.json()).certifications.find((item) => item.id === fixture.id);
  assert.ok(current && current.code === fixture.code && current.title === fixture.title, "Only the unchanged test fixture may be removed");
  const command = `DELETE FROM certifications WHERE id='${fixture.id}' AND code='${fixture.code}' AND title='Local persistence verification' AND provider_id='github'`;
  const result = JSON.parse(execFileSync("node_modules/.bin/wrangler", ["d1", "execute", "DB", "--config", "wrangler.jsonc", "--local", "--persist-to", ".wrangler/state", "--command", command, "--json"], { encoding: "utf8" }));
  assert.equal(result[0].success, true);
  const after = await fetch(endpoint, { headers });
  assert.equal(after.status, 200);
  assert.ok(!(await after.json()).certifications.some((item) => item.id === fixture.id));
  rmSync(path);
  console.log("Removed the verified persistence fixture; personal records were not targeted.");
}
