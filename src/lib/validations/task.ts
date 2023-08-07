import { z } from "zod";
import { DATE_REGEX, DUE_STRING_REGEX } from "../constants";

export const taskPatchSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  done: z.boolean().optional(),
  date: z.string().regex(DATE_REGEX).optional(),
  dueString: z.string().regex(DUE_STRING_REGEX).optional(),
});

export const taskPostSchema = z.object({
  title: z.string().min(3).max(100),
  // Date is iso string with regex
  date: z.string().regex(DATE_REGEX),
  // format the dueString to DB as "DD MMM, HH:MM" or "DD MMM, DDD"
  dueString: z.string().regex(DUE_STRING_REGEX),
});
