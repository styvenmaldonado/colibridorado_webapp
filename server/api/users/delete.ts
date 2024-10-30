import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { data } = await client.models.Users.delete({
    id: body.id,
   
  });
  return data
});
