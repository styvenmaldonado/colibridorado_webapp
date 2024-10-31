import {
  getAllEvents,
  getAllEventUsers,
  getAllUsers,
} from "~/libs/EntitiesDataClient";

export default defineEventHandler(async (event) => {
  const { offset, limit, eventId, userId } = getQuery(event);

  const [eventUsers, users, events] = await Promise.all([
    getAllEventUsers({ eventId, userId }),
    getAllUsers(),
    getAllEvents()
  ]);

  const usersMap = new Map(users.map(user => [user.id, user]));
  const eventsMap = new Map(events.map(event => [event.id, event]));

  const response = eventUsers?.map(eventUser => ({
    ...eventUser,
    events: eventsMap.get(eventUser.eventId),
    users: usersMap.get(eventUser.userId)
  }));

  const start = offset ?? 0;
  const end = (offset ?? 0) + (limit ?? 50);
  const slicedData = response.slice(start, end);

  return {
    count: response?.length,
    data: slicedData,
  };
});

// server/api/events/user
// agregar paginacion con query offset y limit y filtro Events User