import { Skeleton } from "../_components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-5 w-[250px]" />
    </div>
  );
}
