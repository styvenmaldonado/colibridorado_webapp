import {
  getAllEvents,
  getAllEventUsers, getAllPayments,
  getAllUsers,
} from "~/libs/EntitiesDataClient";

export default defineEventHandler(async (event) => {
  const { offset, limit, eventId, userId } = getQuery(event);

  const [payments , users, events] = await Promise.all([
    getAllPayments({ eventId, userId }),
    getAllUsers(),
    getAllEvents()
  ]);

  const usersMap = new Map(users.map(user => [user.id, user]));
  const eventsMap = new Map(events.map(event => [event.id, event]));

  const response = payments?.map(payment => ({
    payment,
    events: eventsMap.get(payment.eventId),
    users: usersMap.get(payment.userId)
  }));


  const start = offset ?? 0;
  const end = (offset ?? 0) + (limit ?? 50);
  const slicedData = response.slice(start, end);

  return {
    count: response?.length,
    data: slicedData,
  };
});

