import { uploadObject } from "~/libs/S3Client";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = JSON.parse(await readBody(event));
  const buf = Buffer.from(
    body.base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const response = await uploadObject(
    { accessKeyId: config.s3_accessKeyId, 
      secretAccessKey:config.s3_secretAccessKey },
    {
      Bucket: "colibridoradobucket",
      Body: buf,
      ContentType: body['Content-Type'],
      ContentEncoding: 'base64',
      Key: body.id,
    }
  )

  return response
});
