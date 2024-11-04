"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "~/app/_components/ui/button";
import { Calendar } from "~/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Input } from "./input";
import styles from "./date-picker.module.css";

interface ComboboxProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
}

function DatePicker({ value, onValueChange }: ComboboxProps) {
  return (
    <Popover>
      <div className="flex items-center space-x-2">
        <Input
          type="date"
          value={value ?? ""}
          onChange={(e) => onValueChange(e.target.value)}
          className={styles.input}
          onClick={(e) => e.preventDefault()}
        />

        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            onValueChange(date ? format(date, "yyyy-MM-dd") : null);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
