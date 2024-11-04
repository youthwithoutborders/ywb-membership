import { type Metadata } from "next";
import { SidebarProvider } from "~/app/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/app-sidebar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "People - YWB Membership",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="max-w-full overflow-hidden"
    >
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
