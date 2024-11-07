"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

import SingleView from "~/app/_components/single-view";
import { Button } from "./_components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SingleView color="secondary">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>

        <Button className="w-full" onClick={() => reset()}>
          <RotateCcw />
          Try again
        </Button>
      </div>
    </SingleView>
  );
}
