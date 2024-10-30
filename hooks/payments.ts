import type { EventsUserInterface } from "~/inteface/EventsUserInterface";

export function usePaymentOrchestrator(eventUser: EventsUserInterface) {
  return useAsyncData("payment-orchestrator", () => {
    return $fetch("/api/payment-orchestrator", {
      method: "POST",
      body: eventUser,
    });
  });
}
