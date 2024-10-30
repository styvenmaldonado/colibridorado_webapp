import type { InterviewsInterface } from "~/inteface/InterviewsInterface";
import type { UsersTypesInterface } from "~/inteface/UsersTypesInterface";

export function useCreateInterview(interview: InterviewsInterface) {
  return useAsyncData("createInterview", () => {
    return $fetch("/api/interviews/create", {
      method: "POST",
      body: interview,
    });
  });
}

export function useListInterview(userId:string) {
  return useAsyncData<{ count: number; data: InterviewsInterface[] }>(
    "interviews",
    () => {
      return $fetch("/api/interviews", {
        method: "POST",
        body: { userId }
      });
    }
  );
}

export function useDeleteInterview(id: string) {
  return useAsyncData(
    "deleteInterviewa",
    () => {
      return $fetch("/api/interviews/delete", {
        method: "POST",
        body: { id },
      });
    }
  );
}


