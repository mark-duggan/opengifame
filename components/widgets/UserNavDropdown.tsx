import { logger } from '@lib/logger';
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';

interface IUserNavDropdownProps {
  session: any;
}
const UserNavDropdown: React.FC<IUserNavDropdownProps> = ({ session }) => {
  React.useEffect(() => {
    logger.debug('UserNavDropdown', 'session', session);
  }, [session]);

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          {session?.user?.image ? (
            <img src={session?.user?.image} />
          ) : (
            <UserCircleIcon />
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Profile</a>
        </li>
        <li>
          <button onClick={() => signOut()}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserNavDropdown;
