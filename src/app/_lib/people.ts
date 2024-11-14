import { type RouterOutputs } from "~/trpc/react";

export function getPreferredFullName(
  person: RouterOutputs["person"]["all"][number],
) {
  return `${person.preferredFirstName ?? person.firstName} ${person.lastName}`;
}

export function getPreferredFirstName(
  person: RouterOutputs["person"]["all"][number],
) {
  return person.preferredFirstName ?? person.firstName;
}
