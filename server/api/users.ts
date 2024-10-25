import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  let _nextToken: any;
  let _data
  while (_nextToken !== "") {
    const { data, nextToken } = await client.models.Users.list({
      nextToken: _nextToken,
    });
    _data ? (_data = [_data, ...data]) : (_data = data);
    nextToken ? (_nextToken = nextToken) : (_nextToken = "");
  }
  return _data;
});
