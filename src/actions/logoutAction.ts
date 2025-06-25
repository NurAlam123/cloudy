'use server';

import { cookies } from 'next/headers';

const logoutAction = async () => {
  try {
    const cookie = await cookies();
    cookie.delete('session');
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return {
        success: false,
        message: err.message,
      };
  } finally {
    return {
      success: true,
      message: 'Successfully logged out',
    };
  }
};

export default logoutAction;
