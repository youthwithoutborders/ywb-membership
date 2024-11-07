import { cookies } from "next/headers";

import { AppSidebar } from "~/app/_components/sidebar/app-sidebar";
import { SidebarProvider } from "~/app/_components/ui/sidebar";
import { protectedRoute } from "~/server/auth/guards";

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
