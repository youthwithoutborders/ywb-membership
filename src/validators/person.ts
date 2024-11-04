import { z } from "zod";

const emptyStringToNull = () =>
  z
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v));

export const personCreateSchema = z.object({
  firstName: z.string().min(1, "This is required."),
  lastName: emptyStringToNull(),
  preferredFirstName: emptyStringToNull(),
  gender: z.enum(["MALE", "FEMALE", "GENDER_DIVERSE", "PREFER_NOT_TO_SAY"], {
    required_error: "This is required.",
  }),
  pronouns: emptyStringToNull(),
  dateOfBirth: emptyStringToNull().pipe(z.string().date().nullable()),
  phone: emptyStringToNull(),
  personalEmail: emptyStringToNull().pipe(z.string().email().nullable()),
  universityEmail: emptyStringToNull().pipe(z.string().email().nullable()),
  companyEmail: emptyStringToNull().pipe(z.string().email().nullable()),
  address: emptyStringToNull(),
});
