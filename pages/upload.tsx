import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Season, Episode } from "models";
import prisma from "@lib/prismadb";
import { ImageUpload, TaggedInput } from "@components";

interface IUploadProps {
  seasons: Season[];
}
const UploadPage: NextPage<IUploadProps> = ({ seasons }) => {
  const [seasonEpisodes, setSeasonEpisodes] = React.useState<Array<Episode>>(
    []
  );
  const [currentSeason, setCurrentSeason] = React.useState<Season>(seasons[0]);
  React.useEffect(() => {
    setSeasonEpisodes(currentSeason.episodes);
  }, [currentSeason]);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="gif-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="gif-title"
                    className="flex-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                    placeholder="Title for this gif"
                  />
                </div>
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
                    name="description"
                    rows={3}
                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Description for this gif"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  The gif
                </label>
                <ImageUpload />
              </div>
              <p className="col-span-3 text-sm text-gray-500">
                These are optional but highly desired.
              </p>
              <TaggedInput />
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
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
