import React from 'react';

const RequestPage = () => {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-lg max-w-prose">
        <h1>
          <span className="block text-base font-semibold tracking-wide text-center uppercase">
            Work in progress
          </span>
          <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center sm:text-4xl">
            Request a gif
          </span>
        </h1>
        <p className="mt-8 text-xl leading-8">
          Here you can allow your users to request a gif, if you have the TV
          Show module enabled you can allow Season/Episode/Timestamp/Duration
          type stuff
        </p>
      </div>
    </div>
  );
};

export default RequestPage;
