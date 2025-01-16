import { IoIosArrowRoundUp } from 'react-icons/io';
import { PiGridFourLight, PiTable, PiStarFour } from 'react-icons/pi';

export default async function HomeCards() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    {/* Card 1 - Start with AI */}
    <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div
        role="button"
        className="height-full rounded-big colors-background-default pointer focus-visible shadow-elevation-low shadow-elevation-medium-hover p-2"
        aria-label="Create a base with AI"
        >
        <div className="flex">
            <PiStarFour className="mr-2 text-2xl text-pink-600" />
            <h2 className="line-height-3 font-weight-stronger ml-2 text-sm font-semibold text-gray-900">
            Start with AI
            </h2>
        </div>
        <p className="line-height-4 mt-2 text-sm text-gray-500">
            Turn your process into an app with data and interfaces using AI.
        </p>
        </div>
    </div>

    {/* Card 2 - Start with templates */}
    <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div
        role="button"
        className="height-full rounded-big colors-background-default pointer focus-visible shadow-elevation-low shadow-elevation-medium-hover p-2"
        aria-label="Create a base with templates"
        >
        <div className="flex">
            <PiGridFourLight className="mr-2 text-2xl text-purple-900" />
            <h2 className="line-height-3 font-weight-stronger ml-2 text-sm font-semibold text-gray-900">
            Start with templates
            </h2>
        </div>
        <p className="line-height-4 mt-2 text-sm text-gray-500">
            Select a template to get started and customize as you go.
        </p>
        </div>
    </div>

    {/* Card 3 - Quickly upload */}
    <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div
        role="button"
        className="height-full rounded-big colors-background-default pointer focus-visible shadow-elevation-low shadow-elevation-medium-hover p-2"
        aria-label="Create a base from upload"
        >
        <div className="flex">
            <IoIosArrowRoundUp className="mr-2 text-2xl text-green-700" />
            <h2 className="line-height-3 font-weight-stronger ml-2 text-sm font-semibold text-gray-900">
            Quickly upload
            </h2>
        </div>
        <p className="line-height-4 mt-2 text-sm text-gray-500">
            Easily migrate your existing projects in just a few minutes.
        </p>
        </div>
    </div>

    {/* Card 4 - Start from scratch */}
    <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div
        role="button"
        className="height-full rounded-big colors-background-default pointer focus-visible shadow-elevation-low shadow-elevation-medium-hover p-2"
        aria-label="Create Base from scratch"
        >
        <div className="flex">
            <PiTable className="mr-2 text-2xl text-blue-900" />
            <h2 className="line-height-3 font-weight-stronger ml-2 text-sm font-semibold text-gray-900">
            Start from scratch
            </h2>
        </div>
        <p className="line-height-4 mt-2 text-sm text-gray-500">
            Create a new blank base with custom tables, fields, and views.
        </p>
        </div>
    </div>
    </div>
  );
}
