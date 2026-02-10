import { z } from "zod";

export const uploadPaperSchema = z.object({
  course: z
    .string()
    .min(2, { message: "Course name must be at least 2 characters" }),

  semester: z.coerce
    .number()
    .int({ message: "Semester must be a number" })
    .min(1, { message: "Semester must be between 1 and 8" })
    .max(8, { message: "Semester must be between 1 and 8" }),

  subject: z
    .string()
    .min(2, { message: "Subject name must be at least 2 characters" }),

  exam_session: z.enum(["Winter", "Summer"], {
    message: "Exam session must be Winter or Summer",
  }),

  year: z.coerce
    .number()
    .int({ message: "Year must be a number" })
    .min(2010, { message: "Year must be after 2010" })
    .max(new Date().getFullYear(), {
      message: "Year cannot be in the future",
    }),
});

export const paperIdParamSchema = z.object({
  id: z.string().uuid("Invalid paper id"),
});
