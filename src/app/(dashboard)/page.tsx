import { HydrateClient } from "~/trpc/server";
import { View } from "../_components/view";

export default async function PeoplePage() {
  return (
    <HydrateClient>
      <View title="Welcome" fixedHeight>
        YWB
      </View>
    </HydrateClient>
  );
}
