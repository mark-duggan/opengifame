import React from 'react';
import { Gif } from '@models';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
import { GifContainer } from '@components';

async function getGifs() {
  const gifs = await fetch(`${process.env.API_URL}/api/gifs`);
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
