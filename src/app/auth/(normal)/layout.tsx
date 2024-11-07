import SingleView from "~/app/_components/single-view";

export default function SingleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SingleView color="primary">{children}</SingleView>;
}
