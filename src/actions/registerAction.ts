'use server';

import generateID from '@/utils/generateID';
import loginAction from './loginAction';
import { createAdminClient } from '@/lib/appwrite';

const registerAction = async (
  email: string,
  password: string,
  name: string,
) => {
  // Create an account with the email, password and name
  try {
    const { account } = await createAdminClient();
    await account.create(generateID(), email, password, name);
  } catch (err) {
    if (err instanceof Error)
      return {
        success: false,
        message: err.message,
      };
  }

  return await loginAction(email, password);
};
export default registerAction;
