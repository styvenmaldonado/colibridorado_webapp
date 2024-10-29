import { client } from "~/libs/AmplifyDataClient";
import { isUserAuthenticated } from "~/libs/AuthManager";

export default defineEventHandler(async (event) => {
  const shouldShowData = await isUserAuthenticated();
  if (shouldShowData) {
    const { id } = await readBody(event);
    const { data } = await client.models.Users.get({
      id,
    });
    return data;
  }
  return "<h1>Unauthorized 401</h1>";
});
