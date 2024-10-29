import { getAllEvents, getAllUsers } from "~/libs/EntitiesDataClient";
import Fuse from "fuse.js";
import { decodeJWT } from "aws-amplify/auth";

export default defineEventHandler(async (event) => {
  const { offset, limit, q, token } = getQuery(event);
  const isAuth = decodeJWT(token?.toString() || "");
  
  if (isAuth) {
    const events = await getAllEvents();

    const fuse = new Fuse(events, {
      keys: ["name", "location"],
    });

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
