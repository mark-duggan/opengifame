import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CopyTextInput } from '@components/index';
import { Gif } from '@models';
interface ISharingEmbedComponent {
  gif: Gif;
  onClose: () => void;
}
const SharingEmbedComponent: React.FC<ISharingEmbedComponent> = ({
  gif,
  onClose,
}) => {
  return (
    <div className="p-4 shadow-xl card w-96 bg-secondary">
      <h1 className="flex flex-row justify-between pb-2 align-middle border-b-2 border-warning">
        <button onClick={() => onClose()}>
          {''}
          <MdArrowBackIosNew className="h-6" />
        </button>
        <span>Embed Gif</span>
      </h1>
      <div className="mt-2">
        <div className="p-2">
          <CopyTextInput
            label="Fixed frame"
            text={gif.fixedEmbedCode}
          />
        </div>
        <div className="p-2">
          <CopyTextInput
            label="Responsive frame"
            text={gif.responsiveEmbedCode}
          />
        </div>
      </div>
    </div>
  );
};

export default SharingEmbedComponent;
