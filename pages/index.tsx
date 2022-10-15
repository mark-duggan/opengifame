import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { Gif } from 'models';
import { GifContainer } from 'components';
import { getBrowserId } from '@lib/browser';
import { mapGif } from '@lib/mapping/gif';

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
  const browserId = getBrowserId(req.headers.cookie || '');
  const prisma = new PrismaClient();

  const results = await prisma.gif.findMany({
    take: 12,
    orderBy: { title: 'asc' },
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
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
