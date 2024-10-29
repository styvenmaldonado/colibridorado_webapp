import { getAllEvents, getAllUsers } from "~/libs/EntitiesDataClient";
import Fuse from "fuse.js";

export default defineEventHandler(async (event) => {
  const events = await getAllEvents();
  const fuse = new Fuse(events, {
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
        count: events?.length,
        data: events?.slice(
          parseInt(offset?.toString() || "0"),
          parseInt(limit?.toString() || "50")
        ),
      };
});
