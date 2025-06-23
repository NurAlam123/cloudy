import { Account, Client } from 'appwrite';

// Initialize client
const client = new Client();

client
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);

// Initialize account
export const account = new Account(client)
