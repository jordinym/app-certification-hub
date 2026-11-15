import { describe, expect, it } from "vitest";
import { authorizeLocalApi, isLocalRequest } from "../../src/server/auth/policy";

const token = "a".repeat(64);
const env = { APP_ENV: "local", LOCAL_API_TOKEN: token };
const request = (url = "http://localhost:3000/api/local/catalog", headers = {}) => new Request(url, { method: "POST", headers });

describe("local authorization boundary", () => {
  it("requires both local configuration and local request", () => {
    expect(isLocalRequest({}, "localhost")).toBe(false);
    expect(isLocalRequest({ APP_ENV: "production" }, "localhost")).toBe(false);
    expect(isLocalRequest(env, "certification-hub.example.workers.dev")).toBe(false);
    expect(isLocalRequest(env, "localhost")).toBe(true);
  });
  it("rejects missing, wrong and unconfigured credentials", () => {
    expect(authorizeLocalApi(env, request())).toBe(false);
    expect(authorizeLocalApi(env, request(undefined, { authorization: "Bearer invalid" }))).toBe(false);
    expect(authorizeLocalApi({ APP_ENV: "local" }, request(undefined, { authorization: `Bearer ${token}` }))).toBe(false);
  });
  it("rejects cross-origin writes and remote hosts even with the local token", () => {
    const headers = { authorization: `Bearer ${token}`, origin: "https://attacker.example" };
    expect(authorizeLocalApi(env, request(undefined, headers))).toBe(false);
    expect(authorizeLocalApi(env, request("https://worker.example/api/local/catalog", { authorization: `Bearer ${token}` }))).toBe(false);
  });
  it("permits authenticated same-origin local requests", () => {
    expect(authorizeLocalApi(env, request(undefined, { authorization: `Bearer ${token}`, origin: "http://localhost:3000" }))).toBe(true);
  });
});
