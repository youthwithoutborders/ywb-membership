"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/app/_components/ui/sidebar";
import { Home, Users } from "lucide-react";
import Link from "next/link";
import { SidebarUser } from "./sidebar-user";
import { type Session } from "next-auth";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Welcome",
    url: "/",
    icon: Home,
  },
  {
    title: "People",
    url: "/people",
    icon: Users,
  },
];

interface AppSidebarProps {
  user: Session["user"];
}

export function AppSidebar({ user }: AppSidebarProps) {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-12 w-full items-center gap-2 overflow-hidden p-2 text-left text-sm outline-none group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Image
                  priority
                  src="/images/logo-on-blue.svg"
                  height={24}
                  width={24}
                  alt="Youth Without Borders"
                />
              </div>

              <div className="">
                <span className="font-semibold">YWB Membership</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>YWB Membership</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={path === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarUser user={user} />
    </Sidebar>
  );
}
