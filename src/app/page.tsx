import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isLocalRequest } from "@/server/auth/policy";
import { readCatalog } from "@/modules/catalog/repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const host = (await headers()).get("host") ?? "";
  let hostname = "";
  try { hostname = new URL(`http://${host}`).hostname; } catch { /* reject malformed host */ }
  if (!isLocalRequest(getCloudflareContext().env, hostname)) {
    return <main><h1>Acceso restringido</h1><p>La publicación remota aún no está habilitada.</p></main>;
  }
  const catalog = await readCatalog();
  return <main className="mx-auto max-w-4xl px-6 py-12">
    <p className="mb-3 text-sm font-semibold text-blue-700">Entorno local · Sprint 0</p>
    <h1 className="text-4xl font-bold tracking-tight">Certification Hub</h1>
    <p className="mt-4 text-lg text-slate-600">Tu espacio personal para preparar certificaciones.</p>
    <section aria-labelledby="catalog-heading" className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 id="catalog-heading" className="text-xl font-semibold">Catálogo inicial</h2>
      <p className="mt-2 text-slate-600">Datos persistidos. La gestión del catálogo llegará en Sprint 1.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">{catalog.providers.map((provider) => {
        const items = catalog.certifications.filter((certification) => certification.providerId === provider.id);
        return <section key={provider.id} aria-label={provider.name}>
          <h3 className="font-semibold">{provider.name}</h3>
          {items.length ? <ul className="mt-3 space-y-2">{items.map((item) => <li key={item.id} className="rounded-lg bg-slate-50 px-4 py-2">{item.code}</li>)}</ul> : <p className="mt-3 text-slate-600">Sin certificaciones todavía.</p>}
        </section>;
      })}</div>
    </section>
    <p className="mt-6 text-sm text-slate-600">Los códigos iniciales no incluyen versiones, dominios ni puntuaciones oficiales sin verificar.</p>
  </main>;
}
