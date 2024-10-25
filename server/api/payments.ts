import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  let _nextToken:any;
  let _data;
  while (!_nextToken) {
    const { data, nextToken } = await client.models.Payments.list({
      nextToken: _nextToken,
    });
    _data = [_data, ...data];
    _nextToken = nextToken
  }
  return _data;
});
