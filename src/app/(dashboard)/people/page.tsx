import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { View } from "../../_components/view";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function PeoplePage() {
  const people = await api.person.all();
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <View title="People" fixedHeight>
        <DataTable columns={columns} data={people} />
      </View>
    </HydrateClient>
  );
}
