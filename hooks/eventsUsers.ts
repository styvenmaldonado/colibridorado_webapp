import type { EventsUserInterface } from "~/inteface/EventsUserInterface";

export function useListEventUsers(input: {
  eventId?: string;
  userId?: string;
}) {
  return useAsyncData<{ count: number; data: EventsUserInterface[] }>(
    "listEventsUsers",
    () =>
      $fetch("/api/eventsUsers", {
        method: "POST",
        body: {
          eventId: input.eventId,
          userId: input.userId,
        },
      })
  );
}
