import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { data } = await client.models.UsersTypes.update({
    id: body.id,
    name: body.name,
    isDefault: body.isDefault
  });
  return data
});
