'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ImageUpload, TaggedInput } from '@components';

type FormValues = {
  title: string;
  description: string;
  terms: string[];
  image: string | undefined;
};

const UploadPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: 'argle',
      description: 'Argle bargle Foo Ferra',
      terms: ['Niles', 'Frasier'],
      image: undefined,
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (data.image) {
      const body = new FormData();
      body.append('title', data.title);
      body.append('description', data.description);
      body.append('terms', data.terms.join('|'));
      body.append('file', data.image);
      const response = await fetch('api/upload', {
        method: 'POST',
        body,
      });
      if (response.status === 201) {
        await router.replace('/');
      }
    }
  };
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-extrabold leading-6">Upload a new gif</h3>
          <p className="my-3 text-sm text-base-content/70">
            The more info you can give us the better.
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 space-y-4">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium"
                >
                  Title
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    name="title"
                    className="flex-1 block w-full rounded-md input input-bordered rounded-r-md sm:text-sm"
                    placeholder="Title for this gif"
                  />
                </div>
                <p className="mt-2 text-sm text-red-600">
                  {errors.title?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    {...register('description', {
                      required: 'Description is required',
                    })}
                    name="description"
                    rows={3}
                    className="block w-full mt-1 border rounded-md shadow-sm textarea textarea-bordered sm:text-sm"
                    placeholder="Description for this gif"
                  />
                </div>
                <p className="mt-2 text-sm text-red-600">
                  {errors.description?.message}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium">The gif</label>
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { value, onChange } }) => (
                    <ImageUpload
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="pt-4 divider">optional stuff</div>
              <Controller
                control={control}
                name="terms"
                render={({ field: { value, onChange } }) => (
                  <TaggedInput
                    label="Search terms"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <div className="w-full px-4 py-3 text-right ">
              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Upload Gif
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
