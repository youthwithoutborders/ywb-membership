import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { personCreateSchema } from "~/validators/person";

export const personRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.person.findMany();
  }),

  create: protectedProcedure
    .input(personCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.person.create({
        data: {
          firstName: input.firstName,
          preferredFirstName: input.preferredFirstName,
          lastName: input.lastName,
          gender: input.gender,
          pronouns: input.pronouns,
          dateOfBirth: input.dateOfBirth,
          phone: input.phone,
          personalEmail: input.personalEmail,
          universityEmail: input.universityEmail,
          companyEmail: input.companyEmail,
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
