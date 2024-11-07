import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type gmail_v1, google } from "googleapis";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";
import { gmailDraftSchema } from "~/validators/gmail";

export const gmailRouter = createTRPCRouter({
  createDraft: protectedProcedure
    .input(gmailDraftSchema)
    .mutation(async ({ ctx }) => {
      console.log(ctx.session);

      const account = await ctx.db.account.findFirst({
        where: {
          userId: ctx.session.user.id,
          provider: "google",
        },
      });
      if (account === null)
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });

      const oAuth2Client = new google.auth.OAuth2(
        env.AUTH_GOOGLE_ID,
        env.AUTH_GOOGLE_SECRET,
        // "http://localhost:3000/api/auth/callback/google",
      );

      oAuth2Client.setCredentials({
        refresh_token: account?.refresh_token,
        access_token: account?.access_token,
      });

      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      let labels: gmail_v1.Schema$Draft[] | undefined;
      try {
        const message =
          "From: test@test.com\r\n" +
          "To: test@test.com\r\n" +
          "Subject: As basic as it gets\r\n\r\n" +
          "This is the plain text body of the message.  Note the blank line between the header information and the body of the message.";
        const encodedMessage = btoa(message);
        const reallyEncodedMessage = encodedMessage
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        const res = await gmail.users.drafts.create({
          userId: "me",
          requestBody: {
            message: {
              raw: encodedMessage,
            },
          },
        });
        console.log(res);
      } catch (e) {
        console.error("Gmail API error: ", e);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return [];
    }),
});
