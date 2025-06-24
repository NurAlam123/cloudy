'use server';

import { account } from '@/lib/appwrite';
import generateID from '@/utils/generateID';

const registerAction = async (
  email: string,
  password: string,
  name: string,
) => {
  // Create an account with the email, password and name
  try {
    await account.create(generateID(), email, password, name);
  } catch (err) {
    if (err instanceof Error)
      return {
        success: false,
        message: err.message,
      };
  }

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
export default registerAction;
