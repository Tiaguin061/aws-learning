import { TextractClient } from "@aws-sdk/client-textract";

const textractClient = new TextractClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'Configure your access key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'Configure your secret access key'
  }
});

export {
  textractClient
};
