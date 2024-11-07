import { type Metadata } from "next";

import { HydrateClient } from "~/trpc/server";
import { View } from "../_components/view";

export const metadata: Metadata = {
  title: "Welcome - YWB Membership",
};

export default async function PeoplePage() {
  return (
    <HydrateClient>
      <View title="Welcome" fixedHeight>
        YWB
      </View>
    </HydrateClient>
  );
}
