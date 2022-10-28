import { NextPage, GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import SharingEmbedComponent from '@components/sharing/SharingEmbedComponent';
import { Gif } from 'models';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
interface IDebugPageProps {
  gif: Gif;
}
const DebugPage: NextPage<IDebugPageProps> = ({ gif }): JSX.Element => {
  const { status, data } = useSession();
  React.useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin');
  }, [status]);

  if (status === 'authenticated') {
    return (
      <React.Fragment>
        <SharingEmbedComponent
          onClose={() => close()}
          gif={gif}
        />
      </React.Fragment>
    );
  }
  return <div>Loading....</div>;
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const results = await client.gif.findMany({
    take: 1,
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
      },
    },
    orderBy: {
      upVotes: {
        _count: 'desc',
      },
    },
  });
  const gifs = await Promise.all(
    results.map(async (gif): Promise<Gif> => mapGif(gif))
  );
  return {
    props: {
      gif: gifs[0],
    },
  };
};
export default DebugPage;
