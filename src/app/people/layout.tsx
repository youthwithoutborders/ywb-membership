import "~/app/_styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "People - YWB Membership",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
