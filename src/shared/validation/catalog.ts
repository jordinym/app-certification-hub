import { z } from "zod";

export const certificationInput = z.object({
  providerId: z.string().min(1).max(80),
  code: z.string().trim().min(1).max(40).regex(/^[a-zA-Z0-9-]+$/).transform((value) => value.toUpperCase()),
  title: z.string().trim().min(1).max(200),
}).strict();
