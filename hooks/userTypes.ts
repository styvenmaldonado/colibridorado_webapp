import type { UsersTypesInterface } from "~/inteface/UsersTypesInterface";

export function useCreateUserTypes(userType: UsersTypesInterface) {
  return useAsyncData("createUserType", () => {
    return $fetch("/api/usersTypes/create", {
      method: "POST",
      body: userType,
    });
  });
}

export function useListUserTypes() {
  return useAsyncData<{ count: number; data: UsersTypesInterface[] }>(
    "usersTypes",
    () => {
      return $fetch("/api/usersTypes", {
        method: "GET",
      });
    }
  );
}

export function useDeleteUserTypes(id: string) {
  return useAsyncData<{ count: number; data: UsersTypesInterface[] }>(
    "deleteUserTypes",
    () => {
      return $fetch("/api/usersTypes/delete", {
        method: "POST",
        body: { id },
      });
    }
  );
}


export function useUpdateUserTypes(userType: UsersTypesInterface) {
  return useAsyncData("updateUserType", () => {
    return $fetch("/api/usersTypes/update", {
      method: "POST",
      body: userType,
    });
  });
}
