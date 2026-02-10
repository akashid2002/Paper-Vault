import { z } from "zod";

export const papersQuerySchema = z.object({
  course: z.string().optional(),
  semester: z.coerce.number().optional(),
  subject: z.string().optional(),
});
