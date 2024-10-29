import { client } from "~/libs/AmplifyDataClient";
import { isUserAuthenticated } from "~/libs/AuthManager";

export default defineEventHandler(async (event) => {
  const shouldShowData = await isUserAuthenticated();
  if (shouldShowData) {
    const { data } = await client.models.UsersTypes.list();
    return {
      count: data.length,
      data,
    };
  }
  return "<h1>Unauthorized 401</h1>";
});
