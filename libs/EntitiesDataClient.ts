import { client } from "./AmplifyDataClient";

export const getAllEventUsers = async () => {
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
};

export const getAllUsers = async () => {
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
};

export const getAllEvents = async () => {
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
};
