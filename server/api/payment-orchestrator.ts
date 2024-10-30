import { CostEventInterface } from "~/inteface/CostEventInterface";
import { client } from "~/libs/AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  //Get Current Event
  const { data: currentEvent } = await client.models.Events.get({
    id: body.eventId,
  });
  //List Interviews
  const { data: interviews } = await client.models.Interviews.list({
    filter: {
      userId: {
        eq: body.userId,
      },
    },
  });

  const isHasVerifiedInterviews = interviews
    .map((c) => c.isVerified)
    .includes(true);
  const cost: CostEventInterface[] = JSON.parse(
    currentEvent?.cost?.toString() || ""
  );
  const cost_interview: CostEventInterface = JSON.parse(
    currentEvent?.cost_interview?.toString() || ""
  );

  const amount = () => {
    if (isHasVerifiedInterviews) {
      let _amount = cost?.find((p) => p.id == JSON.parse(body.rol)?.id);
      return (
        (_amount!["cop"] * 100 * (currentEvent?.percent_advance_payment || 0)) /
        100
      );
    }
    return cost_interview["cop"] * 100;
  };

  const id_payment = uuidv4();
  const res: any = await $fetch("https://sandbox.wompi.co/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.WOMPI_API_KEY}`,
    },
    body: {
      name:
        (isHasVerifiedInterviews ? "Abono: " : "Entrevista: ") +
        currentEvent?.name, // Nombre del link de pago
      description: currentEvent?.description, // Descripción del pago
      sku: id_payment,
      single_use: false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      collect_shipping: false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      redirect_url: `${config.baseURL}payment-state`, // URL donde será redirigido el cliente una vez termine el proceso de pago
      currency: "COP", //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
      amount_in_cents: amount(), // Si el pago current por un monto especifico, si no lo incluyes el pagador podrá elegir el valor a pagar
    },
  });

  //create Event User
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


  //Adding Payment with States to DB
  await client.models.Payments.create({
    id: id_payment,
    paymentId: id_payment,
    name: (isHasVerifiedInterviews ? "Abono: " : "Entrevista: ") +
    currentEvent?.name,
    status: "PENDING",
    value: amount(),
    method: "ELECTRONIC_TRANSFER", // CASH - ELECTRONIC_TRANSFER
    datetime: new Date(Date.now()).toISOString(),
    eventUsersId,
  });

  return {
    res: `https://checkout.wompi.co/l/${res?.data?.id || "00000"}`,
  };
});
