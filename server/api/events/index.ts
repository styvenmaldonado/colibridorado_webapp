import { getAllEvents, getAllUsers } from "~/libs/EntitiesDataClient";
import Fuse from "fuse.js";
import { isUserAuthenticated } from "~/libs/AuthManager";

export default defineEventHandler(async (event) => {
  const shouldShowData = await isUserAuthenticated();
  if (shouldShowData) {
    const events = await getAllEvents();

    const fuse = new Fuse(events, {
      keys: ["name", "location"],
    });

    const { offset, limit, q } = getQuery(event);
    const q_search = q
      ? fuse.search(q?.toString() || "").map((c) => c.item)
      : [];
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
  }
  return "<h1>Unauthorized 401</h1>";
});
