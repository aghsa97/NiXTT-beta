import { z } from "zod";
import { TIME_REGEX } from "../constants";

export const TaskFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Task name must be at least 3 characters.",
    })
    .max(100),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
  dueTime: z
    .string()
    .refine((value) => value === "" || TIME_REGEX.test(value), {
      message: "Due time must be in the format HH:MM.",
    }),
});
