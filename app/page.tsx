import React from 'react';
import { Gif } from '@models';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
import { GifContainer } from '@components';

async function getGifs() {
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
  return gifs;
}

const HomePage = async () => {
  const gifs = await getGifs();
  return (
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
  );
};

export default HomePage;
