import { client } from "~/libs/AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = uuidv4();
  const response = await client.models.UsersTypes.create({
    id,
    userTypeId: id,
    name: body.name,
    isDefault: body.isDefault,
  });
  return response;
});
