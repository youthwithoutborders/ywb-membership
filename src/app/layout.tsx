import "~/app/_styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "~/app/_components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { TooltipProvider } from "./_components/ui/tooltip";

export const metadata: Metadata = {
  title: "YWB Membership",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body suppressHydrationWarning={true}>
        <TRPCReactProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
