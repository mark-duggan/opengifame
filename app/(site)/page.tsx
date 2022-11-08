import React from 'react';
import { Gif } from '@models';
import { GifContainer } from '@components';
import { logger } from '@lib/logger';

async function getGifs() {
  logger.info('page', 'getGifs', `${process.env.API_URL}/api/gifs`);
  const gifs = await fetch(`${process.env.API_URL}/api/gifs`, {
    cache: 'no-store',
  });
  logger.info('page', 'getGifs_gotGifs', gifs);
  return await gifs.json();
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
