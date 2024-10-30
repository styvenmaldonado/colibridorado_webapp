import { client } from "~/libs/AmplifyDataClient";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = uuidv4();
  const response = await client.models.Interviews.create({
    id,
    interviewsId: id,
    userId: body.userId,
    isVerified: body.isVerified,
    description: body.description,
  });
  return response;
});
