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
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {/* Loop through the bases and render a card for each one */}
      {data?.map((base) => (
        <div
          key={base.id}
          className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="h-30 rounded-md p-2 bg-white min-w-100">
            <div className="flex items-center">
              {/* Fixed-size "Un" square */}
              <div className="flex h-16 w-16 mr-4 min-h-16 min-w-16 justify-center items-center bg-teal-500 text-white text-2xl rounded-lg">
                Un
              </div>
              <div>
                <div className="flex">
                  <h2 className="line-height-3 font-weight-stronger text-sm font-semibold text-gray-900">
                    {base.name}
                  </h2>
                </div>
                <p className="line-height-4 mt-2 text-sm text-gray-500">
                  This is a description of the base.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasesList;
