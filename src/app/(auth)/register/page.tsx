import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Create an account',
};

const Register = () => {
  return (
    <div>
      <div>
        <Link
          href='/'
          className='flex items-center gap-1'
        >
          <Image
            alt='Cloudy'
            src='/cloudy-light.svg'
            width={64}
            height={64}
          />{' '}
          <span className='text-xl font-bold'>Cloudy</span>
        </Link>
      </div>

      <div>
        <h2>Create an account</h2>
        <p>
          Register today and gain access to powerful tools that will supercharge
          your ideas.
        </p>

        <form></form>
      </div>
    </div>
  );
};

export default Register;
