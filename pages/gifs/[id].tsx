import { GifContainer, SharingComponent } from '@components';
import React from 'react';
import { GetServerSideProps } from 'next';
import client from '@lib/prismadb';
import { Gif } from 'models';
import { mapGif } from '@lib/mapping/gif';
interface IGifPageProps {
  gif: Gif;
}
const GifPage: React.FC<IGifPageProps> = ({ gif }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative pb-16 sm:pb-24 lg:pb-32">
        <main className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                  <div className="flex flex-1 w-0 -mt-px">
                    <a
                      href="#"
                      className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
                    >
                      {/* Heroicon name: solid/arrow-narrow-left */}
                      <svg
                        className="w-5 h-5 mr-3 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="flex justify-end flex-1 w-0 -mt-px">
                    <a
                      href="#"
                      className="inline-flex pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
                    >
                      {/* Heroicon name: solid/arrow-narrow-right */}
                      <svg
                        className="w-5 h-5 ml-3 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </nav>
                <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-accent">{gif.title}</span>
                </span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {gif.description}
              </p>
              <SharingComponent gif={gif} />
            </div>
            <div className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative w-full mx-auto rounded-lg shadow-lg lg:max-w-md">
                <span className="sr-only">The gif</span>
                <GifContainer
                  gif={gif}
                  isLink={false}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const gif = await client.gif.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
      },
    },
  });
  if (!gif) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      gif: mapGif(gif),
    },
  };
};
export default GifPage;
