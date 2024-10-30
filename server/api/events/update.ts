import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await client.models.Events.update({
    id: body.id,
    eventId: body.id ,
    name: body.name,
    photos: body.photos,
    datetime_start: body.datetime_start,
    datetime_end: body.datetime_end,
    description: body.description,
    cancelPolicy: body.cancelPolicy,
    location: body.location,
    location_link: body.location_link,
    type: body.type,
    cost: body.cost,
    cost_interview: body.cost_interview,
    percent_advance_payment: body.percent_advance_payment,
    instruction:body.instruction
  });
  return response;
});
