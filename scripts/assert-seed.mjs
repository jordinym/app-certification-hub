import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run only against the disposable, freshly bootstrapped Compose project.
const token = readFileSync(".dev.vars", "utf8").match(/^LOCAL_API_TOKEN=(.+)$/m)?.[1];
assert.ok(token);
const response = await fetch("http://localhost:3000/api/local/catalog", { headers: { authorization: `Bearer ${token}` } });
assert.equal(response.status, 200);
const { providers, certifications } = await response.json();
assert.equal(providers.length, 2);
assert.deepEqual(certifications.map((item) => item.code).sort(), ["AZ-900", "AI-901", "AI-200", "AZ-104", "AZ-305"].sort());
assert.ok(certifications.every((item) => item.providerId === "microsoft"));
assert.ok(providers.some((provider) => provider.slug === "github"));
console.log("PASS: fresh Worker contains two providers, exactly five Microsoft certifications and an empty GitHub provider.");
