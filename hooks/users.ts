import type { UsersInterface } from "~/inteface/UsersInterface";

interface UseListParams {
  q?: string;
}

export function useListUser(params: UseListParams) {
  return useAsyncData(
    "users",
    () =>
      $fetch("/api/users", {
        method: "GET",
        query: {},
      }),
    {
      watch: [params],
    }
  );
}
