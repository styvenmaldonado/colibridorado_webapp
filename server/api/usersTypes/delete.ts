import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await client.models.UsersTypes.delete({
    id: body.id,
  });
  return response;
});
