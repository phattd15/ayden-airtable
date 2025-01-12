'use client';

import { PiStarFour, PiGridFourLight, PiTable } from 'react-icons/pi';
import { IoIosArrowRoundUp } from 'react-icons/io';

import { api } from '~/trpc/react'; // Update with the actual path to your API

const BasesList = () => {
  // Fetch data from the API
  const { data, isLoading, isError } = api.base.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching bases</div>;
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {/* Loop through the bases and render a card for each one */}
      {data?.map((base) => (
        <div
          key={base.id}
          className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg"
        >
          <div
            role="button"
            className="height-full rounded-big colors-background-default pointer focus-visible shadow-elevation-low shadow-elevation-medium-hover p-2"
            aria-label={`Create a base with ${base.name}`}
          >
            <div className="flex">
              {/* You can choose an icon based on your preference */}
              <PiTable className="mr-2 text-2xl text-blue-900" />
              <h2 className="line-height-3 font-weight-stronger ml-2 text-sm font-semibold text-gray-900">
                {base.name}
              </h2>
            </div>
            <p className="line-height-4 mt-2 text-sm text-gray-500">
              Create a new blank base with custom tables, fields, and views.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasesList;
