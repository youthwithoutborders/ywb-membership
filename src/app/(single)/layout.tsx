import { Suspense } from "react";
import Image from "next/image";

import Loading from "./loading";

export default function SingleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative mx-auto grid h-screen w-full flex-col items-center justify-center lg:grid-cols-2">
      <div className="hidden h-full bg-primary p-10 text-white dark:border-r lg:block">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            priority
            src="/images/logo-on-blue.svg"
            height={85}
            width={125}
            alt="Youth Without Borders"
          />
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-80">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
