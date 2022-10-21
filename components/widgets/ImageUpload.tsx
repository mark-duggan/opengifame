/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
interface IImageUploadProps {
  value: string | undefined;
  onChange: (image: File) => void;
}
const ImageUpload: React.FC<IImageUploadProps> = ({ onChange }) => {
  const [image, setImage] = React.useState<string>();
  const onImageChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ImageUpload', 'onImageChange', $event);
    if ($event.target.files) {
      const url = URL.createObjectURL($event.target.files[0]);
      setImage(url);
      onChange($event.target.files[0]);
    }
  };
  return (
    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md border-secondary">
      {image ? (
        <div>
          <div className="relative">
            <img
              src={image}
              alt="Preview"
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-2 m-2 rounded-full "
              onClick={() => setImage('')}
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-center">
          <svg
            className="w-12 h-12 mx-auto text-base-content/70"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-base-content">
            <label
              htmlFor="gif-upload"
              className="relative font-medium rounded-md cursor-pointer hover:text-accent badge badge-primary"
            >
              <span>Upload a file</span>
              <input
                accept="image/gif,video/mp4,video/mov,video/quicktime,video/webm,youtube,vimeo"
                id="gif-upload"
                type="file"
                className="sr-only"
                onChange={onImageChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
