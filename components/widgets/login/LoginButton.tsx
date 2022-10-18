import React from 'react';
import { signIn } from 'next-auth/react';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { UserNavDropdown } from '@components';

interface ILoginButtonProps {
  session: any;
}

const LoginButton: React.FC<ILoginButtonProps> = ({ session }) => {
  return session ? (
    <UserNavDropdown session={session} />
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
