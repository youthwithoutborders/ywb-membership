import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type gmail_v1, google } from "googleapis";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

export const gmailRouter = createTRPCRouter({
  labels: protectedProcedure.query(async ({ ctx }) => {
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
      "http://localhost:3000/api/auth/callback/google",
    );

    oAuth2Client.setCredentials({
      refresh_token: account?.refresh_token,
      access_token: account?.access_token,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    let labels: gmail_v1.Schema$Draft[] | undefined;
    try {
      const res = await gmail.users.drafts.list({
        userId: "me",
      });
      labels = res.data.drafts;
    } catch (e) {
      console.error("Gmail API error: ", e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    if (!labels || labels.length === 0) {
      console.log("No labels found.");
      return;
    }

    console.log("Labels:");
    labels.forEach((label) => {
      console.log(`- ${label.id}`);
    });
    return labels;
  }),
});
