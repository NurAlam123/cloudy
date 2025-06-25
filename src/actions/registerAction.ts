'use server';

import { createMainClient } from '@/lib/appwrite';
import generateID from '@/utils/generateID';
import loginAction from './loginAction';

const registerAction = async (
  email: string,
  password: string,
  name: string,
) => {
  const { account } = await createMainClient();
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

  return await loginAction(email, password);
};
export default registerAction;
