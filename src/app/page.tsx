import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";

import TopNav from "~/app/_components/TopNav";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <SessionProvider>
      <HydrateClient>
        <TopNav />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
          </div>
        </main>
      </HydrateClient>
    </SessionProvider>
  );
}
