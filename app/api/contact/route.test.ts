import { describe, it, expect } from "vitest";
import { InquirySchema } from "./route";

describe("InquirySchema", () => {
  it("accepts a complete leasing inquiry", () => {
    const parsed = InquirySchema.safeParse({
      intent: "lease",
      category: "luxury",
      name: "Test Person",
      company: "Maison X",
      email: "person@maisonx.com",
      message: "Interested in Prestige.",
    });
    expect(parsed.success).toBe(true);
  });
  it("rejects bad email", () => {
    const parsed = InquirySchema.safeParse({
      intent: "lease",
      name: "X",
      email: "not-an-email",
      message: "hi",
    });
    expect(parsed.success).toBe(false);
  });
  it("rejects unknown intent", () => {
    const parsed = InquirySchema.safeParse({
      intent: "delete-everything",
      name: "X",
      email: "x@y.com",
      message: "hi",
    });
    expect(parsed.success).toBe(false);
  });
});
