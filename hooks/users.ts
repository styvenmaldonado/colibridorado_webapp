import { fetchAuthSession } from "aws-amplify/auth";
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

export function useDeleteUser(id: string) {
  return useAsyncData("deleteuser" + id, () =>
    $fetch("/api/users/delete", {
      method: "POST",
      body: { id },
    })
  );
}

export async function useUserInfo() {
  const session = await fetchAuthSession()
  return useAsyncData("user" + session.userSub, () =>
    $fetch("/api/users/get", {
      method: "POST",
      body: { id : session.userSub},
    })
  );
}


export function useCreateUser(user: UsersInterface) {
  return useAsyncData("userupdate", () =>
    $fetch("/api/users/create", {
      method: "POST",
      body: user,
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


export function useDelete(user: UsersInterface) {
  return useAsyncData("userdelete", () =>
    $fetch("/api/users/delete", {
      method: "POST",
      body: user,
    })
  );
}
