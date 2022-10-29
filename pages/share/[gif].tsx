import React from 'react';
import { ThemeProvider } from 'next-themes';
import { NextPageWithLayout } from 'types/page-with-layout';
import { Gif } from '@models';
import { GetServerSideProps } from 'next';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';

interface IShareGifPageProps {
  gif: Gif;
}
const ShareGifPage: NextPageWithLayout<IShareGifPageProps> = ({ gif }) => {
  return <div>ShareGifPage</div>;
};

ShareGifPage.getLayout = (page: React.ReactElement) => {
  return <ThemeProvider defaultTheme="light">{page}</ThemeProvider>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const gif = await client.gif.findUnique({
    where: {
      id: params?.gif as string,
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
      gif,
    },
  };
};
export default ShareGifPage;
