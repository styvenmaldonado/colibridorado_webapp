import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const { data }= await client.models.UsersTypes.list();
  return {
    count: data.length,
    data
  }
});
