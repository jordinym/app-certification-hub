import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isLocalRequest } from "@/server/auth/policy";
import { checkCatalogStorage } from "@/modules/catalog/repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  if (!isLocalRequest(env, new URL(request.url).hostname)) return new Response(null, { status: 403 });
  try {
    await checkCatalogStorage();
    return Response.json({ status: "ready" }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
