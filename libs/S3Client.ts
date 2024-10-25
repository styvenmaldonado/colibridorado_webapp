import {
  S3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";

require("dotenv").config();

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  region: "us-east-2",
});

export const uploadObject = async (input: PutObjectCommandInput) => {
  const comand = new PutObjectCommand(input);
  const response = await client.send(comand);
  return response;
};
