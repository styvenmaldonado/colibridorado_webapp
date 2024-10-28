import { uploadObject } from "~/libs/S3Client";

export default defineEventHandler(async (event) => {
  const body = JSON.parse(await readBody(event))
  const buf = Buffer.from(body.base64.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const response = await uploadObject(
    { accessKeyId: process.env.S3_ACCESS_KEY_ID || "", 
      secretAccessKey:process.env.S3_SECRET_ACCESS_KEY || "" },
    {
      Bucket: "colibridoradobucket",
      Body: buf,
      ContentType: body['Content-Type'],
      ContentEncoding: 'base64',
      Key: body.id,
    }
  )

  return response;
});
