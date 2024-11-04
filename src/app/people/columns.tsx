"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/trpc/react";
import { DataTableColumnHeader } from "~/app/_components/data-table-column-header";
import { Checkbox } from "~/app/_components/ui/checkbox";

export const columns: ColumnDef<RouterOutputs["person"]["all"][number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "preferredFirstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preferred First Name" />
    ),
  },
  {
    accessorKey: "pronouns",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pronouns" />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "personalEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Personal Email" />
    ),
  },
  {
    accessorKey: "universityEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="University Email" />
    ),
  },
  {
    accessorKey: "companyEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Email" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
];
