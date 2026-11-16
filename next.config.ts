import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

export default function config(phase: string): NextConfig {
  // Production build is dynamic and must not start a dev proxy or read D1.
  if (phase === PHASE_DEVELOPMENT_SERVER) void initOpenNextCloudflareForDev();
  return {
    poweredByHeader: false,
    experimental: { cpus: 2 },
  };
}
