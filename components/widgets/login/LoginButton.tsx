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
      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
    >
      <ArrowLeftCircleIcon className="w-5 h-5" />
      <span>Logout</span>
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn()}
      className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
    >
      <ArrowRightCircleIcon className="w-5 h-5" />
      <span>Login</span>
    </button>
  );
};

export default LoginButton;
