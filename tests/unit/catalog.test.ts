import { expect, it } from "vitest";
import { certificationInput } from "../../src/shared/validation/catalog";

it("normalizes provider-independent codes", () => {
  expect(certificationInput.parse({ providerId: "github", code: " test-01 ", title: " My goal " })).toEqual({ providerId: "github", code: "TEST-01", title: "My goal" });
});

it("rejects empty values and unexpected properties", () => {
  expect(certificationInput.safeParse({ providerId: "github", code: " ", title: "Goal" }).success).toBe(false);
  expect(certificationInput.safeParse({ providerId: "github", code: "TEST", title: " ", status: "published" }).success).toBe(false);
});
