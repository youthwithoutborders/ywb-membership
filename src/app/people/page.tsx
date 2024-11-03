import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function People() {
  const people = await api.person.all();
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <DataTable columns={columns} data={people} />
      </main>
    </HydrateClient>
  );
}
