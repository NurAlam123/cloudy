import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Login',
};

// Login Form
const Login = () => {
  return (
    <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:[grid-template-columns:1fr_1.2fr] lg:gap-2'>
      <div className='flex flex-col p-4'>
        <div className='mb-auto'>
          <Logo className='mx-auto' />
        </div>

        <div className='flex flex-col gap-2 max-w-[480px] mx-auto w-full'>
          <h2 className='text-display-small font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
            Welcome Back to Cloudy
          </h2>
          <p className='text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 px-2 text-center'>
            Enter your account details.
          </p>

          <LoginForm />

          <p className='text-body-medium text-light-onSurface dark:text-dark-onSurface text-center mt-4'>
            Don&apos;t have an account?
            <Link
              className='link inline-block ms-1 text-light-primary dark:text-dark-primary'
              href='/register'
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-body-medium lg:mx-0'>
          &copy; 2025 Nur Alam. All right reserved.
        </p>
      </div>

      <div className='hidden lg:block lg:relative lg:rounded-lg lg:overflow-hidden'>
        <Image
          draggable={false}
          className='h-full w-full object-cover aspect-auto'
          src='/banner.webp'
          alt='Banner'
          width={1080}
          height={1080}
        />

        <p className='absolute bottom-10 left-12 right-12 z-10 text-display-large font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]'>
          Chat with Cloudy to supercharge your ideas
        </p>
      </div>
    </div>
  );
};

export default Login;
