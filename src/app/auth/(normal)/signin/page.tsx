import type { IconType } from "@icons-pack/react-simple-icons";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { AuthError } from "next-auth";

import { Button } from "~/app/_components/ui/button";
import { signIn } from "~/server/auth";
import { providerMap } from "~/server/auth/config";
import { unauthenticatedRoute } from "~/server/auth/guards";

export const metadata: Metadata = {
  title: "Sign In - YWB Membership",
};

const icons: Record<string, IconType> = {
  google: SiGoogle,
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  await unauthenticatedRoute();

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Choose an option below to sign in to your account.
        </p>
      </div>

      {Object.values(providerMap).map((provider) => {
        const Icon = icons[provider.id] ?? (() => null);

        return (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: (await searchParams)?.callbackUrl ?? "/",
                });
              } catch (error) {
                if (error instanceof AuthError)
                  return redirect(`/error?error=${error.type}`);

                throw error;
              }
            }}
          >
            <Button className="w-full" type="submit">
              <Icon />
              Sign in with {provider.name}
            </Button>
          </form>
        );
      })}
    </>
  );
}