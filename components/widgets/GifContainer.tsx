import React from 'react';
import Image from 'next/image';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import { Gif } from 'models';

interface IGifContainerProps {
  gif: Gif;
}
const GifContainer: React.FC<IGifContainerProps> = ({ gif }) => {
  const [upVotes, setUpVotes] = React.useState<number>(gif.upVotes);
  const [downVotes, setDownVotes] = React.useState<number>(gif.downVotes);

  const _doot = async (id: string, isUp: boolean) => {
    const response = await fetch(`api/votes?gifId=${id}&isUp=${isUp ? 1 : 0}`, {
      method: 'POST',
    });
    if (response.status === 200) {
      const result = (await response.json()) as Gif;
      setUpVotes(result.upVotes);
      setDownVotes(result.downVotes);
    }
  };
  return (
    <>
      <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
        <div className="absolute inset-0 bg-indigo-50">
          <Image
            alt={gif.title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 transition duration-300 group-hover:scale-110"
            src={gif.fileName}
          />
        </div>
      </div>
      <div className="flex flex-row p-2">
        <p className="flex-1 text-base tracking-tight text-slate-500">
          {gif.searchTerms?.map((t) => (
            <span
              key={t}
              className="bg-harvestwheat text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded "
            >
              {t}
            </span>
          ))}
        </p>
        <div className="flex items-center justify-center space-x-1">
          <div className="flex transition duration-75 ease-in-out delay-150 hover:text-orange-700 hover:cursor-pointer">
            <span onClick={() => _doot(gif.id, true)}>
              <HandThumbUpIcon className="w-5" />
            </span>
            <span className="text-xs">{upVotes}</span>
          </div>
          <div className="flex transition duration-75 ease-in-out delay-150 hover:text-orange-700 hover:cursor-pointer">
            <span
              onClick={() => _doot(gif.id, false)}
              className="pl-2 "
            >
              <HandThumbDownIcon className="w-5" />
            </span>
            <span className="text-xs">{downVotes}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GifContainer;
