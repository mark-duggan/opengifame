import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

const LoginButton = () => {
  const { data: session } = useSession();
  return session ? (
    <button
      type="button"
      onClick={() => signOut()}
      className="btn"
    >
      <ArrowLeftCircleIcon className="w-5 h-5" />
      <span>Logout</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn()}
      className="btn"
    >
      <ArrowRightCircleIcon className="w-5 h-5" />
      <span>Login</span>
    </button>
  );
};

export default LoginButton;
