/* eslint-disable @next/next/no-img-element */
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImageUpload = () => {
  const [image, setImage] = React.useState<string>();
  const onImageChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ImageUpload", "onImageChange", $event);
    if ($event.target.files) {
      setImage(URL.createObjectURL($event.target.files[0]));
    }
  };
  return (
    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
      {image ? (
        <div>
          <div className="relative">
            <img
              src={image}
              alt="Preview"
            />
            <button
              type="button"
              className="absolute top-0 right-0 p-2 m-2 text-white rounded-full bg-gray-200/10 hover:bg-blue-800"
              onClick={() => setImage(null)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
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
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="gif-upload"
              className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
