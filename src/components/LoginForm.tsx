'use client';

import { FormEvent, useState } from 'react';
import { Button } from './Button';
import TextField from './TextField';
import Form from 'next/form';
import { CircularProgress } from './ProgressBar';
import Link from 'next/link';
import loginAction from '@/actions/loginAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { getLoggedInUser, getUserAvatarInitials } from '@/lib/appwrite';

const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);
  const setAvatar = useAuthStore((state) => state.setAvatar);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await loginAction(email, password);
    if (res.success) {
      const user = await getLoggedInUser();
      setUser(user);

      const avatar = await getUserAvatarInitials({
        name: user?.name,
        width: 48,
        height: 48,
      });

      setAvatar({ name: user?.name || 'User', data: avatar });

      setLoading(false);
      router.push('/');
    } else {
      setLoading(false);
      toast.error(res.message);
    }
  };

  return (
    <Form
      action='/'
      className='grid grid-cols-1 gap-4'
      onSubmit={submitHandler}
    >
      <TextField
        type='email'
        name='email'
        label='Email'
        placeholder='Email'
        required
        autoFocus
      />

      <TextField
        type='password'
        name='password'
        label='Password'
        placeholder='Enter your password'
        required
      />

      <div className='text-right'>
        <Link
          href='/reset-password'
          className='link text-label-large inline-block'
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type='submit'
        disabled={loading}
      >
        {loading ? <CircularProgress className='w-5 h-5 border-2' /> : 'Login'}
      </Button>
    </Form>
  );
};

export default LoginForm;
