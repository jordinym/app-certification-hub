import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

if (!existsSync(".dev.vars")) {
  writeFileSync(".dev.vars", `# Local-only diagnostic API credential. Never commit or deploy.
LOCAL_API_TOKEN=${randomBytes(32).toString("hex")}
`, { mode: 0o600, flag: "wx" });
}

const token = readFileSync(".dev.vars", "utf8").match(/^LOCAL_API_TOKEN=(.+)$/m)?.[1];
if (!token || token.length < 32) {
  throw new Error("Set LOCAL_API_TOKEN to at least 32 random characters in .dev.vars; existing configuration was not overwritten.");
}
