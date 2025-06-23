'use server';

import { account } from '@/lib/appwrite';
import generateID from '@/utils/generateID';

const registerAction = async (formData: FormData) => {
  console.log(formData.get('name'));

  try {
    await account.create(
      generateID(),
      formData.get('email') as string,
      formData.get('password') as string,
      formData.get('name') as string
    );
  } catch (err) {
    if (err instanceof Error)
      console.log({
        message: err.message,
      });
  }
};
export default registerAction;
