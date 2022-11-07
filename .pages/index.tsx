import type { GetServerSideProps, NextPage } from 'next';
import { Gif } from 'models';
import { GifContainer } from 'components';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';

interface IHomeProps {
  gifs: Gif[];
}

const Home: NextPage<IHomeProps> = ({ gifs }) => {
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {gifs.map((gif: Gif) => {
          return (
            <div
              key={gif.id}
              className="m-2"
            >
              <GifContainer gif={gif} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const results = await client.gif.findMany({
    take: 12,
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
      gifs,
    },
  };
};
export default Home;
