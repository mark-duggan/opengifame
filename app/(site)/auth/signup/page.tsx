'use client';

import React, { FormEventHandler } from 'react';
import { useRouter } from 'next/router';
import { logger } from '@lib/logger';
import { SocialLogin } from '@components';

const SignUpPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    //TODO: validation
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      });
      logger.debug(`res`, res);
      router.push(
        `signin${
          router.query.callbackUrl
            ? `?callbackUrl=${router.query.callbackUrl}`
            : ''
        }`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-3xl font-extrabold text-center ">
          Create new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            method="post"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium "
              >
                {' '}
                Email address{' '}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userInfo.email}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, email: target.value })
                  }
                  className="w-full input input-bordered"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                {' '}
                Password{' '}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userInfo.password}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                  }
                  className="w-full input input-bordered"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="repeat-password"
                className="block text-sm font-medium"
              >
                Repeat password
              </label>
              <div className="mt-1">
                <input
                  id="repeat-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userInfo.repeatPassword}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, repeatPassword: target.value })
                  }
                  className="w-full input input-bordered"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Create account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
