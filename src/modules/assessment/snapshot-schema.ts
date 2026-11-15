import { z } from "zod";

// Contracts only in S0; no question bank or exam engine is implemented yet.
export const questionSnapshotSchema = z.object({
  formatVersion: z.literal(1),
  stem: z.string().min(1),
  questionType: z.enum(["single", "multiple"]),
  domain: z.object({ id: z.string().min(1), title: z.string().min(1) }).strict(),
  options: z.array(z.object({ id: z.string().min(1), body: z.string().min(1) }).strict()).min(2),
}).strict().refine((snapshot) => new Set(snapshot.options.map((option) => option.id)).size === snapshot.options.length, "Duplicate option IDs");

export const answerKeySnapshotSchema = z.object({
  formatVersion: z.literal(1),
  correctOptionIds: z.array(z.string().min(1)).min(1),
  explanation: z.string().min(1),
}).strict().refine((key) => new Set(key.correctOptionIds).size === key.correctOptionIds.length, "Duplicate correct option IDs");

export function validateSnapshotPair(question: unknown, key: unknown) {
  const content = questionSnapshotSchema.parse(question);
  const answerKey = answerKeySnapshotSchema.parse(key);
  if (answerKey.correctOptionIds.some((id) => !content.options.some((option) => option.id === id))) {
    throw new Error("Answer key references an unknown option");
  }
  if (content.questionType === "single" && answerKey.correctOptionIds.length !== 1) {
    throw new Error("Single-choice questions require exactly one correct option");
  }
  return { content, answerKey };
}
