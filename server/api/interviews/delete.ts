import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await client.models.Interviews.delete({
    id: body.id,
  });
  return response;
});
