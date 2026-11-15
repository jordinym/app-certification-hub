import { getCloudflareContext } from "@opennextjs/cloudflare";
import { authorizeLocalApi } from "@/server/auth/policy";
import { certificationInput } from "@/shared/validation/catalog";
import { createCertification, readCatalog } from "@/modules/catalog/repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!authorizeLocalApi(getCloudflareContext().env, request)) return Response.json({ error: "forbidden" }, { status: 403 });
  return Response.json(await readCatalog(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!authorizeLocalApi(getCloudflareContext().env, request)) return Response.json({ error: "forbidden" }, { status: 403 });
  const input = certificationInput.safeParse(await request.json().catch(() => null));
  if (!input.success) return Response.json({ error: "invalid_input" }, { status: 400 });
  const result = await createCertification(input.data);
  return Response.json(result, { status: "error" in result ? (result.error === "duplicate_code" ? 409 : 400) : 201 });
}
