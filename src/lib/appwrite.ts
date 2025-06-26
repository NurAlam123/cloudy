'use server';

import { Client, Account, Avatars, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

  const cookie = await cookies();
  const session = cookie.get('session');

  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get avatar() {
      return new Avatars(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// Get loogged in user information
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}

// Get user avatar
export async function getUserAvatarInitials({
  name,
  width,
  height,
  background,
}: {
  name?: string;
  width?: number;
  height?: number;
  background?: string;
}) {
  try {
    const { avatar } = await createSessionClient();
    return await avatar.getInitials(name, width, height, background);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
