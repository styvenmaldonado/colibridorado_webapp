import { getAllUsers } from "~/libs/EntitiesDataClient";
import Fuse from "fuse.js";

export default defineEventHandler(async (event) => {
  const users = await getAllUsers();
  const fuse = new Fuse(users, {
    keys: [
      "given_name",
      "family_name",
      "phone_number",
      "numero_documento",
      "email",
    ],
  });

  const { offset, limit, q } = getQuery(event);
  const q_search = q ? fuse.search(q?.toString() || "").map((c) => c.item) : [];
  return q?.toString()
    ? {
        count: q_search.length,
        data: q_search,
      }
    : {
        count: users?.length,
        data: users?.slice(
          parseInt(offset?.toString() || "0"),
          parseInt(limit?.toString() || "50")
        ),
      };
});
