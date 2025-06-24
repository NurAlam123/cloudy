'use client';

import { FormEvent } from 'react';
import Button from './Button';
import TextField from './TextField';
import registerAction from '@/actions/registerAction';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const res = await registerAction(email, password, name);

    if (res.success) {
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  return (
    <form
      className='grid grid-cols-1 gap-4'
      method='POST'
      onSubmit={submitHandler}
    >
      <TextField
        type='text'
        name='name'
        label='Full name'
        placeholder='Full name'
        required
        autoFocus
      />

      <TextField
        type='email'
        name='email'
        label='Email'
        placeholder='Email'
        required
      />

      <TextField
        type='password'
        name='password'
        label='Password'
        placeholder='Enter your password'
        required
      />

      <Button type='submit'>Create account</Button>
    </form>
  );
};

export default RegisterForm;
