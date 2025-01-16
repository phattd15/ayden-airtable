import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { PiGridFourLight, PiTable, PiStarFour } from 'react-icons/pi';

import { LatestPost } from '~/app/_components/post';
import { auth } from '~/server/auth';
import { api, HydrateClient } from '~/trpc/server';
import TopNav from '~/app/_components/TopNav';

import HomeDropdown from '../_components/HomeDropdown';
import BasesList from '../_components/BasesList';
import HomeCards from '../_components/HomeCards';

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <SessionProvider>
      <HydrateClient>
        <main className="flex h-screen w-screen flex-col">
          <TopNav />
          <div className="main flex flex-1">

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-12 py-8">
              <h1
                className="font-display text-left text-3xl font-extrabold leading-snug text-gray-900"
                style={{ fontFamily: 'Display Updated, sans-serif' }}
              >
                Home
              </h1>

              <HomeCards />


              <HomeDropdown />
              <BasesList />
            </div>
          </div>
        </main>
      </HydrateClient>
    </SessionProvider>
  );
}
