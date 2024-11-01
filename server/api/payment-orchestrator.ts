import { CostEventInterface } from "~/inteface/CostEventInterface";
import { client } from "~/libs/AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

// Fetch Current Event and Interviews in parallel
  const [currentEventResponse, interviewsResponse] = await Promise.all([
    client.models.Events.get({ id: body.eventId }),
    client.models.Interviews.list({ filter: { userId: { eq: body.userId } } })
  ]);

  const currentEvent = currentEventResponse.data;
  const interviews = interviewsResponse.data;


  const isHasVerifiedInterviews = interviews.some((interview) => interview.isVerified);
  const cost: CostEventInterface[] = JSON.parse(
      currentEvent?.cost?.toString() || "[]"
  );
  const costInterview: CostEventInterface = JSON.parse(
      currentEvent?.cost_interview?.toString() || "{}"
  );

  const calculateAmount = (): number => {
    if (isHasVerifiedInterviews) {
      const selectedCost = cost.find((p) => p.id === JSON.parse(body.rol).id);
      return (
          ((selectedCost?.cop ?? 0) * (currentEvent?.percent_advance_payment ?? 0)) /
          100
      );
    }
    return costInterview.cop * 100;
  };

  const idPayment = uuidv4();
  const res = await $fetch("https://sandbox.wompi.co/v1/payment_links", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.WOMPI_API_KEY}` },
    body: {
      name: `${isHasVerifiedInterviews ? "Abono" : "Entrevista"}: ${currentEvent?.name}`,
      description: currentEvent?.description,
      sku: idPayment,
      single_use: false,
      collect_shipping: false,
      redirect_url: `${config.baseURL}payment-state?id=${idPayment}`,
      currency: "COP",
      amount_in_cents: calculateAmount(),
    },
  });

  // Create Event User
  const eventUsersId = uuidv4();
  await client.models.EventsUser.create({
    id: eventUsersId,
    eventUsersId,
    eventId: body.eventId,
    userId: body.userId,
    rol: body.rol,
    needs_transport: body.needs_transport,
    available_seats: body.available_seats,
    available_seats_number: body.available_seats_number,
    medicalPreincription: body.medicalPreincription,
  });


  const wompiURL= `https://checkout.wompi.co/l/${res?.data?.id || "00000"}`

  // Adding Payment with States to DB
  const paymentCreationData = {
    id: idPayment,
    paymentId: idPayment,
    name: `${isHasVerifiedInterviews ? "Abono" : "Entrevista"}: ${currentEvent?.name}`,
    status: "DECLINED",
    value: calculateAmount(),
    method: "ELECTRONIC_TRANSFER",
    datetime: new Date().toISOString(),
    eventUsersId,
    userId: body.userId,
    eventId: body.eventId,
    payment_url: wompiURL
  };

  await client.models.Payments.create(paymentCreationData);

  return {
    res: `https://checkout.wompi.co/l/${res?.data?.id || "00000"}`,
  };
});