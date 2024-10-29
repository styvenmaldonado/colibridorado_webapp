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
        query: params,
      }),
    {
      watch: [params],
    }
  );
}

export function useGetUser(id: string) {
  return useAsyncData("user" + id, () =>
    $fetch("/api/users/get", {
      method: "POST",
      body: { id },
    })
  );
}

export function useUpdateUser(user: UsersInterface) {
  return useAsyncData("userupdate", () =>
    $fetch("/api/users/update", {
      method: "POST",
      body: user,
    })
  );
}
