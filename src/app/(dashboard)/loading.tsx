import { Skeleton } from "../_components/ui/skeleton";
import { View } from "../_components/view";

export default function Loading() {
  return (
    <View loading fixedHeight>
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-5 w-[250px]" />
    </View>
  );
}
