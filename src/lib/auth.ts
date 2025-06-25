import { cookies } from 'next/headers';
import { createSessionClient } from './appwrite';
import { Models } from 'node-appwrite';

interface Auth {
  user: Models.User<Models.Preferences> | null;
  sessionCookie: string;
  getUser: () => Promise<Models.User<Models.Preferences> | null>;
}

const auth: Auth = {
  user: null,
  sessionCookie: '',

  getUser: async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (session) auth.sessionCookie = session.value;
    else {
      auth.sessionCookie = '';
      auth.user = null;
    }

    try {
      if (!auth.sessionCookie) return null;

      const { account } = await createSessionClient(auth.sessionCookie);
      auth.user = await account.get();
    } catch (err) {
      console.error(err);
      auth.user = null;
      auth.sessionCookie = '';
    }

    return auth.user;
  },
};

export default auth;
