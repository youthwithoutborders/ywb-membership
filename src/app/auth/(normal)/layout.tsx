import { Suspense } from "react";

import SingleView from "~/app/_components/single-view";
import Loading from "./loading";

export default function SingleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SingleView color="primary">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </SingleView>
  );
}
