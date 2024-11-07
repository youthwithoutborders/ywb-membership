import { people } from "googleapis/build/src/apis/people";
import { z } from "zod";

export const gmailDraftSchema = z.object({
  // people: z.array(z.number()).min(1, "This is required."),
  people: z.string().min(1, "This is required."),
  subject: z.string().min(1, "This is required."),
  body: z.string().min(1, "This is required."),
});
