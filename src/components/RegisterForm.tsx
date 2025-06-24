'use client';

import { FormEvent, useState } from 'react';
import { Button } from './Button';
import TextField from './TextField';
import registerAction from '@/actions/registerAction';
import { useRouter } from 'next/navigation';
import Form from 'next/form';
import { CircularProgress } from './ProgressBar';
import { toast } from 'sonner';

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const res = await registerAction(email, password, name);

    if (res.success) {
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

      <Button
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <CircularProgress className='w-5 h-5 border-2' />
        ) : (
          'Create account'
        )}
      </Button>
    </Form>
  );
};

export default RegisterForm;
