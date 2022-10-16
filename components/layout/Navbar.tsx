import React from 'react';
import Image from 'next/image';
import { LoginButton } from '@components';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="upload">Upload</a>
            </li>
            <li>
              <a href="request">Request</a>
            </li>
          </ul>
        </div>
        <a className="text-xl normal-case btn btn-ghost">daisyUI</a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="p-0 menu menu-horizontal">
          <li>
            <a href="upload">Upload</a>
          </li>
          <li>
            <a href="request">Request</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
