export type LocalEnvironment = { APP_ENV?: string; LOCAL_API_TOKEN?: string };

export function isLocalRequest(env: LocalEnvironment, hostname: string) {
  return env.APP_ENV === "local" && ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
}

export function authorizeLocalApi(env: LocalEnvironment, request: Request): boolean {
  const url = new URL(request.url);
  if (!isLocalRequest(env, url.hostname) || !env.LOCAL_API_TOKEN || env.LOCAL_API_TOKEN.length < 32) return false;
  if (request.headers.get("authorization") !== `Bearer ${env.LOCAL_API_TOKEN}`) return false;
  const origin = request.headers.get("origin");
  return !origin || origin === url.origin;
}
