import Image from "next/image";
import Link from "next/link";

import { cn } from "../_lib/utils";

export default function SingleView({
  color,
  children,
}: Readonly<{ color: "primary" | "secondary"; children: React.ReactNode }>) {
  return (
    <div className="relative mx-auto grid h-screen w-full flex-col items-center justify-center lg:grid-cols-2">
      <div
        className={cn(
          "hidden h-full bg-primary p-10 text-white dark:border-r lg:block",
          {
            "bg-primary": color === "primary",
            "bg-secondary": color === "secondary",
          },
        )}
      >
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <Image
              priority
              src={
                color === "primary"
                  ? "/images/logo-on-blue.svg"
                  : "/images/logo-white.svg"
              }
              height={85}
              width={125}
              alt="Youth Without Borders"
            />
          </Link>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-80">
          {children}
        </div>
      </div>
    </div>
  );
}
