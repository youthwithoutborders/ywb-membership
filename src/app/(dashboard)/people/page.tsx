import { type Metadata } from "next";

import { api, HydrateClient } from "~/trpc/server";
import { View } from "../../_components/view";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "People - YWB Membership",
};

export default async function PeoplePage() {
  const people = await api.person.all();

  return (
    <HydrateClient>
      <View title="People" fixedHeight>
        <DataTable columns={columns} data={people} />
      </View>
    </HydrateClient>
  );
}