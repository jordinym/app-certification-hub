import { expect, it } from "vitest";
import { questionSnapshotSchema, validateSnapshotPair } from "../../src/modules/assessment/snapshot-schema";
import { dateOnly, timezone } from "../../src/shared/validation/dates";

const content = { formatVersion: 1, stem: "Original fixture", questionType: "single", domain: { id: "d1", title: "Fixture domain" }, options: [{ id: "a", body: "Option A" }, { id: "b", body: "Option B" }] };
const key = { formatVersion: 1, correctOptionIds: ["a"], explanation: "Fixture explanation" };

it("keeps answer keys and explanations out of the public snapshot contract", () => {
  expect(questionSnapshotSchema.safeParse({ ...content, explanation: key.explanation }).success).toBe(false);
  expect(questionSnapshotSchema.safeParse({ ...content, options: [{ id: "a", body: "A", isCorrect: true }, { id: "b", body: "B" }] }).success).toBe(false);
  expect(validateSnapshotPair(content, key).content).not.toHaveProperty("correctOptionIds");
});

it("rejects inconsistent keys and duplicate options", () => {
  expect(() => validateSnapshotPair(content, { ...key, correctOptionIds: ["missing"] })).toThrow();
  expect(() => validateSnapshotPair(content, { ...key, correctOptionIds: ["a", "b"] })).toThrow();
  expect(questionSnapshotSchema.safeParse({ ...content, options: [content.options[0], content.options[0]] }).success).toBe(false);
});

it("validates calendar dates and timezones without shifting dates", () => {
  expect(dateOnly.parse("2028-02-29")).toBe("2028-02-29");
  expect(dateOnly.safeParse("2026-02-29").success).toBe(false);
  expect(dateOnly.safeParse("2026-13-01").success).toBe(false);
  expect(timezone.parse("America/Lima")).toBe("America/Lima");
  expect(timezone.safeParse("invalid/timezone").success).toBe(false);
});
