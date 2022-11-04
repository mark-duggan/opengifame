import { Gif } from '@models';
import React from 'react';
import { ImEmbed2 } from 'react-icons/im';
import {
  AiOutlineFacebook,
  AiOutlineReddit,
  AiOutlineTwitter,
} from 'react-icons/ai';

import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import SharingEmbedComponent from './SharingEmbedComponent';
interface ISharingComponentProps {
  gif: Gif;
}

const SharingComponent: React.FC<ISharingComponentProps> = ({ gif }) => {
  return (
    <div className="flex gap-6 mt-6">
      <a
        className="p-1 -m-1 group"
        aria-label="Share to Reddit"
        target="_blank"
        rel="noreferrer"
        href={`https://www.reddit.com/submit?url=https%3A%2F%2Fgiphy.com%2Fclips%2Fanimation-studio-turbine-RhpNunPCbmB1dPTiGK`}
      >
        <AiOutlineReddit className="w-6 h-6 transition fill-zinc-500 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>
      <a
        className="p-1 -m-1 group"
        aria-label="Share to Twitter"
        target="_blank"
        rel="noreferrer"
        href={`http://twitter.com/share?url=https%3A%2F%2Fgiphy.com%2Fclips%2Fanimation-studio-turbine-RhpNunPCbmB1dPTiGK?tc=1&via=giphy`}
      >
        <AiOutlineTwitter className="w-6 h-6 transition fill-zinc-500 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>

      <a
        className="p-1 -m-1 group"
        aria-label="Share to Facebook"
        target="_blank"
        rel="noreferrer"
        href={`http://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgiphy.com%2Fclips%2Fanimation-studio-turbine-RhpNunPCbmB1dPTiGK`}
      >
        <AiOutlineFacebook className="w-6 h-6 transition fill-zinc-500 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>

      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="flex flex-row justify-between">
              <ImEmbed2 className="w-6 h-6 transition fill-zinc-500 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
            </Popover.Button>
            <Popover.Panel className="absolute z-50">
              <SharingEmbedComponent
                onClose={() => close()}
                gif={gif}
              />
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SharingComponent;
