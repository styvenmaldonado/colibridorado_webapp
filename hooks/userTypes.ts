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
  return useAsyncData<{ count: number; data: UsersTypesInterface }>(
    "usersTypes",
    () => {
      return $fetch("/api/usersTypes", {
        method: "GET",
      });
    }
  );
}
