import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const { data } = await client.models.Users.get({
    id,
  });
  return data
});