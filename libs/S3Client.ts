import {
  S3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";

interface Credentials {
  accessKeyId: string,
  secretAccessKey: string
}

export const uploadObject = async (c: Credentials, input: PutObjectCommandInput) => {
  const comand = new PutObjectCommand(input);

  const client = new S3Client({
    credentials: {
      accessKeyId: c.accessKeyId ,
      secretAccessKey: c.secretAccessKey,
    },
    region: "us-east-2",
  });
  const response = await client.send(comand);
  return response;
};
