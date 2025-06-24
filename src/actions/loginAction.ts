'use server';

import { account } from '@/lib/appwrite';

const loginAction = async (email: string, password: string) => {
  // login the user with the email, password and redirect to homepage
  try {
    await account.createEmailPasswordSession(email, password);
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
