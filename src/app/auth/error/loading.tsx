import { Skeleton } from "~/app/_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-5 w-[250px]" />
    </div>
  );
}
