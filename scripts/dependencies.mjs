import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const hash = createHash("sha256");
for (const path of ["package.json", "package-lock.json", ".npmrc"]) hash.update(readFileSync(path));
hash.update(`${process.version}:${process.platform}:${process.arch}`);
hash.update(execFileSync("npm", ["--version"], { encoding: "utf8" }).trim());
const fingerprint = hash.digest("hex");
const marker = "node_modules/.certification-hub-dependencies";
const mode = process.argv[2] ?? "ensure";
if (!["ensure", "record", "force"].includes(mode)) throw new Error("Unknown dependency operation");
// record is used by Docker only after its successful npm ci layer. Do not use
// it to bypass an installation; force repairs a manually modified volume.
if (mode === "ensure" && existsSync(marker) && readFileSync(marker, "utf8") === fingerprint) {
  console.log("Dependencies match lockfile, Node, npm and platform.");
} else {
  if (mode !== "record") execFileSync("npm", ["ci", "--no-audit", "--no-fund"], { stdio: "inherit" });
  writeFileSync(marker, fingerprint);
}
