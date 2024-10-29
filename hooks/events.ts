import type { EventInteface } from "~/inteface/EventInterface";
import type { UsersInterface } from "~/inteface/UsersInterface";

interface UseListParams {
  q?: string;
}

export function useListEvents(params: UseListParams) {
  return useAsyncData<{ count: number; data: EventInteface[]}>(
    "users",
    () =>
      $fetch("/api/events", {
        method: "GET",
        query: params,
      }),
    {
      watch: [params],
    }
  );
}

export function useGetEvent(id: string) {
  return useAsyncData<EventInteface>("event" + id, () =>
    $fetch("/api/events/get", {
      method: "POST",
      body: { id },
    })
  );
}
