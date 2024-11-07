import { headers } from "next/headers";
import { redirect } from "next/navigation";



import { auth } from "~/server/auth";


/**
 * Redirects the user to the sign-in page if they are not authenticated.
 * @returns The user's session if they are authenticated.
 */
export async function protectedRoute() {
  const session = await auth();
  if (!session) {
    const path = (await headers()).get("x-current-path");
    redirect(
      path
        ? `/auth/signin?callbackUrl=${encodeURIComponent(path)}`
        : "/auth/signin",
    );
  }

  return session;
}

/**
 * Redirects the user to the home page if they are authenticated.
 */
export async function unauthenticatedRoute() {
  const session = await auth();
  if (session) redirect("/");
}