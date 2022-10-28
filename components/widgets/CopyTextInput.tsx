import React from 'react';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

interface ICopyTextInput {
  label: string;
  text: string;
}
const CopyTextInput: React.FC<ICopyTextInput> = ({ label, text }) => {
  return (
    <div className="input-group">
      <input
        readOnly={true}
        type="text"
        placeholder={text}
        className="input input-bordered"
      />
      <button className="btn btn-square">
        {''}
        <HiOutlineClipboardCopy className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CopyTextInput;
