import {
  AddCommentComponent,
  GifContainer,
  SharingComponent,
} from '@components';
import React from 'react';
import { GetServerSideProps } from 'next';
import client from '@lib/prismadb';
import { Gif } from 'models';
import { mapGif } from '@lib/mapping/gif';
import SharingEmbed from '@components/sharing/SharingEmbed';
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
                <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-accent">{gif.title}</span>
                </span>
              </h1>
              <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {gif.description}
              </p>
              <SharingComponent gif={gif} />
              <div className="mt-5">
                <AddCommentComponent />
              </div>
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
