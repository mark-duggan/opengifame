import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Season, Episode } from 'models';
import prisma from '@lib/prismadb';
import { ImageUpload, TaggedInput } from '@components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface IUploadProps {
  seasons: Season[];
}

const UploadPage: NextPage<IUploadProps> = ({ seasons }) => {
  type FormValues = {
    title: string;
    description: string;
    terms: string[];
    image: string | undefined;
  };
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
  const router = useRouter();
  const [seasonEpisodes, setSeasonEpisodes] = React.useState<Array<Episode>>(
    []
  );
  const [currentSeason, setCurrentSeason] = React.useState<Season>(seasons[0]);
  React.useEffect(() => {
    setSeasonEpisodes(currentSeason.episodes);
  }, [currentSeason]);
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
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upload a new gif
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            The more info you can give us the better.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    name="title"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700"
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
                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Description for this gif"
                  />
                </div>
                <p className="mt-2 text-sm text-red-600">
                  {errors.description?.message}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  The gif
                </label>
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
              <p className="col-span-3 text-sm text-gray-500">
                These are optional but highly desired.
              </p>
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
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label
                    htmlFor="season"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Season
                  </label>
                  <select
                    onChange={($event) =>
                      setCurrentSeason(
                        seasons.filter(
                          (f) => f.number === Number($event.currentTarget.value)
                        )[0]
                      )
                    }
                    id="season"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {seasons.map((s) => (
                      <option key={s.id}>{s.number}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="episode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Episode
                  </label>
                  <select
                    id="episode"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {seasonEpisodes.map((s) => (
                      <option key={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full px-4 py-3 text-right bg-gray-50 sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-harvestwheat hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const seasons = await prisma.season.findMany({
    include: {
      episodes: {
        select: {
          id: true,
          name: true,
          seasonId: true,
        },
      },
    },
  });
  return {
    props: {
      seasons,
    },
  };
};
export default UploadPage;
