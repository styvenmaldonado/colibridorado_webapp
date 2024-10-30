import { getAllEvents, getAllEventUsers, getAllUsers } from "~/libs/EntitiesDataClient";

export default defineEventHandler(async (event) => {

  const eventId = ""

  const EventsUser = await getAllEventUsers()
  const Users = await getAllUsers()
  const Events = await getAllEvents()

  const response = EventsUser?.map(c => ({
    ...c,
    events: Events?.find(p => p.id == c.eventId),
    users: Users?.find(p => p.id == c.userId)
  }))
  
  
  return {
    count: response?.length,
    data: response
  }
});






