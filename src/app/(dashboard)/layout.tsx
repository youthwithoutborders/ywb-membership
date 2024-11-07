import { type Metadata } from "next";
import { SidebarProvider } from "~/app/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { protectedRoute } from "~/server/auth/guards";

export const metadata: Metadata = {
  title: "People - YWB Membership",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // This is a protected route
  const session = await protectedRoute();

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="max-w-full overflow-hidden"
    >
      <AppSidebar user={session.user} />
      {children}
    </SidebarProvider>
  );
}
