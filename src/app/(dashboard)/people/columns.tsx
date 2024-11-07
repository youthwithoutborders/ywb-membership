"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "~/app/_components/data-table-column-header";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { type RouterOutputs } from "~/trpc/react";

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
        className="h-[18px] w-[18px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="h-[18px] w-[18px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "ID",
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "First Name",
    },
  },
  {
    accessorKey: "preferredFirstName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Preferred First Name",
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Last Name",
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: (a) =>
      ({
        MALE: "Male",
        FEMALE: "Female",
        GENDER_DIVERSE: "Gender Diverse",
        PREFER_NOT_TO_SAY: "Prefer not to say",
      })[a.getValue() as string] ?? "Unknown",
    meta: {
      title: "Gender",
    },
  },
  {
    accessorKey: "pronouns",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Pronouns",
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Date of Birth",
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Phone",
    },
  },
  {
    accessorKey: "personalEmail",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Personal Email",
    },
  },
  {
    accessorKey: "universityEmail",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "University Email",
    },
  },
  {
    accessorKey: "companyEmail",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Company Email",
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    meta: {
      title: "Address",
    },
  },
];