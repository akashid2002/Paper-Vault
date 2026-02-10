import { z } from "zod";

export const adminPapersQuerySchema = z.object({
  page: z.coerce
    .number()
    .min(1, { message: "Page must be at least 1" })
    .default(1),

  limit: z.coerce
    .number()
    .min(1, { message: "Limit must be at least 1" })
    .max(50, { message: "Limit cannot exceed 50" })
    .default(10),

  status: z
    .enum(["approved", "pending", "all"], {
      message: "Status must be approved, pending, or all",
    })
    .default("all"),
});
