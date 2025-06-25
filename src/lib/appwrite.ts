import { Client, Account, Databases, Avatars } from 'node-appwrite';

const createMainClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};

const createSessionClient = async (session: string) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
};

export { createMainClient, createSessionClient };
