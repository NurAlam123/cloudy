'use client';

import { motion } from 'motion/react';

const Greetings = () => {
  return (
    <div className='grid place-content-center h-full'>
      <h2 className='text-headline-large font-semibold text-center tracking-tight text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant'>
        <motion.span
          initial={{
            backgroundPositionX: '100%',
          }}
          animate={{
            backgroundPositionX: '0%',
          }}
          transition={{
            duration: 4,
            ease: [0.05, 0.7, 0.1, 1],
          }}
          className='bg-gradient-to-r from-teal-400 from-0% via-cyan-500 via-56% to-transparent to-75% bg-clip-text text-transparent bg-[length:350%_100%] bg-[100%_0]'
        >
          Hello, Nur
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: 'easeOut',
          }}
          className='dark:font-medium'
        >
          How can I help you today?
        </motion.span>
      </h2>
    </div>
  );
};

export default Greetings;
