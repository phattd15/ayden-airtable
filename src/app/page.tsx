import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { LatestPost } from '~/app/_components/post';
import { auth } from '~/server/auth';
import { api, HydrateClient } from '~/trpc/server';
import TopNav from '~/app/_components/TopNav';

export default async function RootPage() {
  redirect('/home');
}
