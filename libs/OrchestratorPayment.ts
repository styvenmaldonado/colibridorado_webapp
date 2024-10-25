import type {
  CostEventInterface,
  CostEventInterviewInterface,
} from "~/inteface/CostEventInterface";
import { client } from "./AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";
import 'dotenv/config'


interface OrchestadorPaymentOptions {
  currency: "COP" | "USD" | "MXN";
}

export const OrchestadorPayment = async (
  eventId: string,
  eventsUserId: string,
  userId: string,
  opt: OrchestadorPaymentOptions
) => {
  const { data: event } = await client.models.Events.get({
    id: eventId,
  });
  const { data: interviews } = await client.models.Interviews.list({
    filter: { userId: { eq: userId } },
  });

  const { data: eventUser } = await client.models.EventsUser.get({
    id: eventsUserId,
  });

  //Body API Request Provider Payments
  let body;

  //Search in Filed IsVerified Interviews Table
  const isVerifiedInterview = interviews
    .map((c) => c.isVerified)
    .includes(true);

  if (isVerifiedInterview) {
    //Search Cost Usertype
    //@ts-ignore
    const cost: CostEventInterface = JSON.parse(event?.cost).find((p) => p.id == eventUser?.rol);

   let amount_in_cents;

    const id_payment = uuidv4();

    if (opt.currency == "COP")
      (amount_in_cents = cost.cop * 100) *
        (event?.percent_advance_payment || 0 / 100);
    if (opt.currency == "MXN")
      (amount_in_cents = cost.mxn * 100) *
        (event?.percent_advance_payment || 0 / 100);
    if (opt.currency == "USD")
      (amount_in_cents = cost.usd * 100) *
        (event?.percent_advance_payment || 0 / 100);

    body = {
      name: event?.name, // Nombre del link de pago
      description: `Abono ${event?.percent_advance_payment}%: ` + event?.name, // Descripción del pago
      single_use: false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      collect_shipping: false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      redirect_url: "http://localhost:3000/payment-state", // URL donde será redirigido el cliente una vez termine el proceso de pago
      currency: opt.currency, //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
      amount_in_cents, // Si el pago current por un monto especifico, si no lo incluyes el pagador podrá elegir el valor a pagar
      sku: id_payment,
    };

    //Adding Payment with States to DB
    await client.models.Payments.create({
      id: id_payment,
      name: `Abono ${event?.percent_advance_payment}%: ` + event?.name,
      paymentId: id_payment,
      status: "PENDING",
      value: amount_in_cents,
      method: "ELECTRONIC_TRANSFER", // CASH - ELECTRONIC_TRANSFER
      datetime: new Date(Date.now()).toISOString(),
      eventUsersId: eventsUserId,
    }); 
  }

  if (!isVerifiedInterview) {

     // @ts-ignore
    const cost_interview = JSON.parse(event?.cost_interview);


    let amount_in_cents;
    if (opt.currency == "COP") amount_in_cents = cost_interview.cop * 100;
    if (opt.currency == "MXN") amount_in_cents = cost_interview.mxn * 100;
    if (opt.currency == "USD") amount_in_cents = cost_interview.usd * 100;
 
    const id_payment_interview = uuidv4();

    body = {
      name: "Entrevista: " + event?.name, // Nombre del link de pago
      description: event?.description, // Descripción del pago
      single_use: false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      collect_shipping: false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      redirect_url: "http://localhost:3000/payment-state", // URL donde será redirigido el cliente una vez termine el proceso de pago
      currency: opt.currency, //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
      amount_in_cents, // Si el pago current por un monto especifico, si no lo incluyes el pagador podrá elegir el valor a pagar
    };

    //Adding Payment with States to DB
    await client.models.Payments.create({
      id: id_payment_interview,
      name: "Entrevista: " + event?.description,
      paymentId: id_payment_interview,
      status: "PENDING",
      value: amount_in_cents,
      method: "ELECTRONIC_TRANSFER", // CASH - ELECTRONIC_TRANSFER
      datetime: new Date(Date.now()).toISOString(),
      eventUsersId: eventsUserId,
    });


    
  }

   const res: any = await $fetch("https://sandbox.wompi.co/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WOMPI_API_KEY}`,
    },
    body,
  });
  return `https://checkout.wompi.co/l/${res?.data?.id || "00000"}`;


};
