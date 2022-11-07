import React from 'react';
import {GifContainer} from '@components';
import {Gif} from "@models";
import {notFound} from "@node_modules/next/navigation";

interface IShareGifPageProps {
  params: {
    slug: string;
  };
}

const getGif = async (slug: string): Promise<Gif> => {
  const res = await fetch(`${process.env.API_URL}/api/gifs/${slug}`);
  if (res.status === 200) {
    return await res.json();
  }
  notFound();
};
const ShareGifPage = async ({params}: IShareGifPageProps) => {
  const {slug} = params;
  const gif = await getGif(slug as string);
  return (
    <div className="p-2 w-96">
      <GifContainer
        gif={gif}
        isLink={true}
        showDetails={false}
      />
    </div>
  );
};

export default ShareGifPage;
