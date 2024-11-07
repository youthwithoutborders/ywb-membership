"use client";

import * as React from "react";

import { Button } from "~/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/app/_components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/app/_components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { useMediaQuery } from "~/app/_hooks/use-media-query";

interface ComboboxProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder: React.ReactNode;
  selectPlaceholder?: string;
  recommendations: string[];
}

function Combobox({
  value,
  onValueChange,
  placeholder,
  selectPlaceholder,
  recommendations,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const options = React.useMemo(() => {
    if (value === null) return recommendations;

    // Move selected to the top
    return [value, ...recommendations.filter((r) => r !== value)];
  }, [value, recommendations]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {value ? <>{value}</> : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <OptionList
            options={options}
            selectPlaceholder={selectPlaceholder}
            setOpen={setOpen}
            setSelected={onValueChange}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value ? <>{value}</> : placeholder}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            options={options}
            selectPlaceholder={selectPlaceholder}
            setOpen={setOpen}
            setSelected={onValueChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  options,
  selectPlaceholder,
  setOpen,
  setSelected,
}: {
  options: string[];
  selectPlaceholder?: string;
  setOpen: (open: boolean) => void;
  setSelected: (status: string | null) => void;
}) {
  const [filter, setFilter] = React.useState("");

  return (
    <Command>
      <CommandInput
        value={filter}
        onValueChange={setFilter}
        placeholder={selectPlaceholder}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filter && !options.includes(filter) && (
            <CommandItem
              value={filter}
              onSelect={(value) => {
                setSelected(value);
                setOpen(false);
              }}
            >
              Use &quot;{filter}&quot;
            </CommandItem>
          )}

          {options.map((status, i) => (
            <CommandItem
              key={i}
              value={status}
              onSelect={(value) => {
                setSelected(value);
                setOpen(false);
              }}
            >
              {status}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export { Combobox };
