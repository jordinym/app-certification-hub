import "server-only";
import { eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { certifications, providers } from "@/server/db/schema";

export async function checkCatalogStorage() {
  await getDb().select({ id: providers.id }).from(providers).limit(1);
}

export async function readCatalog() {
  const db = getDb();
  return {
    providers: await db.select({ id: providers.id, slug: providers.slug, name: providers.name }).from(providers).orderBy(providers.name),
    certifications: await db.select({ id: certifications.id, providerId: certifications.providerId, code: certifications.code, title: certifications.title }).from(certifications).orderBy(certifications.code),
  };
}

export async function createCertification(input: { providerId: string; code: string; title: string }) {
  const db = getDb();
  const provider = await db.select({ id: providers.id }).from(providers).where(eq(providers.id, input.providerId));
  if (!provider.length) return { error: "unknown_provider" } as const;
  const id = crypto.randomUUID();
  const inserted = await db.insert(certifications).values({ id, ...input }).onConflictDoNothing({ target: [certifications.providerId, certifications.code] }).returning({ id: certifications.id });
  return inserted.length ? { id } : { error: "duplicate_code" } as const;
}
