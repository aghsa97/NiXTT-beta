import { z } from "zod";

export const taskPatchSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  done: z.boolean().optional(),
  date: z.date().optional(),
  dueString: z
    .string()
    // format the due string as "DD MMM HH:MM"
    .regex(/^\d{2} [a-zA-Z]{3} \d{2}:\d{2}$/)
    .optional(),
});
