import React from "react";
import Image from "next/image";
import { LoginButton } from "@components";

const Navbar = () => {
  return (
    <nav className="text-gray-400 border-b border-gray-200 bg-harvestwheat">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0 mr-8">
              <Image
                alt="Logo"
                width={48}
                height={48}
                className="rounded-full"
                src={"/img/header-logo.gif"}
              />
              <h1 className="ml-4 text-2xl text-gray-700 text-bold">
                I&apos;m pro opera and I vote!
              </h1>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="upload"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500"
                aria-current="page"
              >
                {" "}
                Upload{" "}
              </a>
              <a
                href="#"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              >
                {" "}
                Request{" "}
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LoginButton />
          </div>
          <div className="flex items-center -mr-2 sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* themes
          Tofu
          Putty
          Oatmeal
          Almond
          Harvest Wheat
          and Buff
          */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
