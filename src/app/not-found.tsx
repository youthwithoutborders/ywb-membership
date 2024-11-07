import Link from "next/link";
import { Home } from "lucide-react";

import SingleView from "~/app/_components/single-view";
import { Button } from "./_components/ui/button";

export default function NotFound() {
  return (
    <SingleView color="secondary">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Not Found</h1>
        <p className="text-sm text-muted-foreground">
          Could not find the requested page.
        </p>

        <Button className="w-full" asChild variant="link">
          <Link href="/">
            <Home />
            Return home
          </Link>
        </Button>
      </div>
    </SingleView>
  );
}
