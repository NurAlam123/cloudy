'use server';

import { createMainClient } from '@/lib/appwrite';
import { cookies } from 'next/headers';

const loginAction = async (email: string, password: string) => {
  const { account } = await createMainClient();
  // login the user with the email, password and redirect to homepage
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const cookie = await cookies();
    cookie.set('session', session.secret, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(session.expire),
      path: '/',
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
  } finally {
    return {
      success: true,
      message: '',
    };
  }
};
export default loginAction;
