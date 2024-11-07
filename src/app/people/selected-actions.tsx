"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Button } from "~/app/_components/ui/button";
import { ChevronDown, Mail } from "lucide-react";
import { SendEmail } from "./send-email";
import { useState } from "react";

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
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setEmailOpen(true)}>
            <Mail /> Send Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SendEmail open={emailOpen} setOpen={setEmailOpen} />
    </>
  );
}
