"use client";

import { useState } from "react";
import { type Row } from "@tanstack/react-table";
import { ChevronDown, Mail } from "lucide-react";



import { Button } from "~/app/_components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/app/_components/ui/dropdown-menu";
import { type RouterOutputs } from "~/trpc/react";
import { SendEmail } from "./send-email";


interface SelectedActionsProps {
  selectedRows: Row<unknown>[];
}

export function SelectedActions({ selectedRows }: SelectedActionsProps) {
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

      <SendEmail
        selectedPeople={
          (selectedRows as Row<RouterOutputs["person"]["all"][number]>[]).map(p => p.getValue("id"))
        }
        open={emailOpen}
        setOpen={setEmailOpen}
      />
    </>
  );
}