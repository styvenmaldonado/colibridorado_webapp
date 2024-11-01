import type {PaymentsInterface} from "~/inteface/PaymentsInterface";

export function usePaymentOrchestrator(eventUser: EventsUserInterface) {
  return useAsyncData("payment-orchestrator", () => {
    return $fetch("/api/payment-orchestrator", {
      method: "POST",
      body: eventUser,
    });
  });
}
export function useListPayments(input: {
  eventId?: string;
  userId?: string;
}) {
  return useAsyncData<{ count: number; data: PaymentsInterface[] }>(
      "listPayments",
      () =>
          $fetch("/api/payments", {
            method: "POST",
            query: {
              eventId: input.eventId,
              userId: input.userId,
            },
          })
  );
}
