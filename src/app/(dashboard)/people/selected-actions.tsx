"use client";

import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";

import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { SendEmail } from "./send-email";

export function SelectedActions() {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Actions <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem onClick={() => setEmailOpen(true)}>
            <Mail /> Send Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SendEmail open={emailOpen} setOpen={setEmailOpen} />
    </>
  );
}
