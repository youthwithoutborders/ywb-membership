import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const personRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.person.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        mononym: z.boolean(),
        preferredFirstName: z.string(),
        pronouns: z.string(),
        gender: z
          .enum(["MALE", "FEMALE", "GENDER_DIVERSE", "PREFER_NOT_TO_SAY"])
          .optional(),
        dateOfBirth: z.string().date().optional(),
        phone: z.string(),
        personalEmail: z.string().email().optional(),
        universityEmail: z.string().email().optional(),
        officialEmail: z.string().email().optional(),
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.person.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          mononym: input.mononym,
          preferredFirstName: input.preferredFirstName,
          pronouns: input.pronouns,
          gender: input.gender ?? null,
          dateOfBirth: input.dateOfBirth ?? null,
          phone: input.phone,
          personalEmail: input.personalEmail ?? null,
          universityEmail: input.universityEmail ?? null,
          officialEmail: input.officialEmail ?? null,
          address: input.address,
        },
      });
    }),

  byId: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.person.findUnique({
        where: { id: input.id },
      });
    }),
});
