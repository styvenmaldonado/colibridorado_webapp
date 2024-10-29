import { getCurrentUser } from "aws-amplify/auth";
import type { EventInteface } from "~/inteface/EventInterface";
import type { UsersInterface } from "~/inteface/UsersInterface";
import { fetchAuthSession } from 'aws-amplify/auth';


interface UseListParams {
  q?: string;
}

export async function useListEvents(params: UseListParams) {
  let token = (await fetchAuthSession()).tokens?.accessToken.toString()

  return useAsyncData<{ count: number; data: EventInteface[]}>(
    "users",
    () =>
      $fetch("/api/events", {
        method: "GET",
        query: {...params, token},
      }),
    {
      watch: [params],
    }
  );
}

export async function useGetEvent(id: string) {
  return useAsyncData<EventInteface>("event" + id, () =>
    $fetch("/api/events/get", {
      method: "POST",
      body: { id },
    })
  );
}
