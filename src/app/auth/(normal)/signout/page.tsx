import { type Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "~/app/_components/ui/button";
import { signOut } from "~/server/auth";
import { protectedRoute } from "~/server/auth/guards";

export const metadata: Metadata = {
  title: "Sign Out - YWB Membership",
};

export default async function SignOutPage() {
  await protectedRoute();

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Out</h1>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to sign out?
        </p>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/auth/signin",
          });
        }}
      >
        <Button className="w-full" type="submit">
          Sign out
        </Button>
      </form>

      <Button className="w-full" asChild variant="link">
        <Link href="/">
          <Home />
          Return home
        </Link>
      </Button>
    </>
  );
}
