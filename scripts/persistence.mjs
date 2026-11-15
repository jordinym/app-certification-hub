import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";

// Two phases deliberately separated by the operator's compose down/up.
const phase = process.argv[2];
assert.ok(["create", "verify"].includes(phase), "Use create, then compose down/up without -v, then verify");
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
} else {
  const expected = JSON.parse(readFileSync(path, "utf8"));
  const response = await fetch(endpoint, { headers });
  assert.equal(response.status, 200);
  const { certifications } = await response.json();
  const actual = certifications.find((item) => item.id === expected.id);
  assert.ok(actual);
  assert.equal(actual.code, expected.code);
  assert.equal(actual.title, expected.title);
  console.log("PASS: identical ID, code and title survived Compose restart.");
}
