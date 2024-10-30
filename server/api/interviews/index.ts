import { client } from "~/libs/AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = uuidv4();
  const { data } = await client.models.Interviews.list({
    filter: {
      userId: {
        eq: body.userId,
      },
    },
  });
  return {
    count: data.length,
    data,
  };
});
