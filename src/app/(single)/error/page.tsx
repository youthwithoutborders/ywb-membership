"use client";

import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
};

export default function ErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-sm text-muted-foreground">
        {errorMap[error] || "Please contact us if this error persists."}
      </p>
    </div>
  );
}
