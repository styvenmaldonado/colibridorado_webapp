import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const EventsUser = await getAllEventUsers()
  const Users = await getAllUsers()
  const Events = await getAllEvents()

  

  const response = EventsUser?.map(c => ({
    ...c,
    events: Events?.find(p => p.id == c.eventId),
    users: Users?.find(p => p.id == c.userId)
  }))
  
  return {
    e: getQuery(event),
    count: response?.length,
    data: response?.splice(0,50)
  }
});



const getAllEventUsers = async () => {
  let _nextToken: any;
  let _data;
  while (_nextToken !== "") {
    const { data, nextToken } = await client.models.EventsUser.list({
      nextToken: _nextToken,
    });
    _data ? (_data = [_data, ...data]) : (_data = data);
    nextToken ? (_nextToken = nextToken) : (_nextToken = "");
  }
  return _data;
}


const getAllUsers = async () => {
  let _nextToken: any;
  let _data;
  while (_nextToken !== "") {
    const { data, nextToken } = await client.models.Users.list({
      nextToken: _nextToken,
    });
    _data ? (_data = [_data, ...data]) : (_data = data);
    nextToken ? (_nextToken = nextToken) : (_nextToken = "");
  }
  return _data;
}


const getAllEvents = async () => {
  let _nextToken: any;
  let _data;
  while (_nextToken !== "") {
    const { data, nextToken } = await client.models.Events.list({
      nextToken: _nextToken,
    });
    _data ? (_data = [_data, ...data]) : (_data = data);
    nextToken ? (_nextToken = nextToken) : (_nextToken = "");
  }
  return _data;
}





