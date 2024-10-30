import {
  getAllEvents,
  getAllEventUsers,
  getAllUsers,
} from "~/libs/EntitiesDataClient";

export default defineEventHandler(async (event) => {
  const { offset, limit, eventId, userId } = getQuery(event);

  const EventsUser = await getAllEventUsers({ eventId, userId });
  const Users = await getAllUsers();
  const Events = await getAllEvents();

  const response = EventsUser?.map((c) => ({
    ...c,
    events: Events?.find((p) => p.id == c.eventId),
    users: Users?.find((p) => p.id == c.userId),
  }));

  return {
    count: response?.length,
    data: response,
  };
});

// server/api/events/user
// agregar paginacion con query offset y limit y filtro Events User
