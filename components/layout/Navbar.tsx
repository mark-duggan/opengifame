'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LoginButton from '@components/widgets/login/LoginButton';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Disclosure
      as="nav"
      className="bg-base-300"
    >
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <div className="block w-auto h-8 lg:hidden">
                    <Link href="/">
                      <Image
                        width={32}
                        height={32}
                        src="/img/icon.svg"
                        alt="Workflow"
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
                    </Link>
                  </div>
                  <div className="hidden w-auto h-8 lg:block">
                    <Link href="/">
                      <Image
                        width={32}
                        height={32}
                        src="/img/icon.svg"
                        alt="Workflow"
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      href="/upload"
                      className={
                        pathname === '/upload'
                          ? 'px-3 py-2 text-sm font-medium  bg-accent rounded-md'
                          : 'px-3 py-2 text-sm font-medium  rounded-md hover:bg-accent/20'
                      }
                    >
                      Upload
                    </Link>
                    <Link
                      href="/request"
                      className={
                        pathname === '/request'
                          ? 'px-3 py-2 text-sm font-medium  bg-accent rounded-md'
                          : 'px-3 py-2 text-sm font-medium  rounded-md hover:bg-accent/20 '
                      }
                    >
                      Request
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label
                    htmlFor="search"
                    className="sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 border border-transparent rounded-md bg-base-100 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaTimes
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaBars
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <LoginButton session={session} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button
                as="a"
                href="#"
                className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className="px-2 mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
