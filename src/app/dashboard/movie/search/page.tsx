import { MovieListSkeleton } from "@/components/MovieGrid";
import SearchResults from "@/components/SearchResults";
import { inter } from "@/components/ui/font";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

interface Props {
  searchParams: {
    page: string;
    query: string;
  };
}

export const dynamic = "force-dynamic";

const page = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div
      key={Math.random()}
      className={`${inter.className} w-full h-auto flex flex-col px-3 lg:px-36 pb-3 mt-3 text-black dark:text-white`}
    >
      <h2 className="font-semibold xl:text-3xl text-xl">Search Results</h2>
      <Separator
        orientation="horizontal"
        className="my-3 bg-neutral-300 dark:bg-zinc-700"
      />
      <Suspense fallback={<MovieListSkeleton />}>
        <SearchResults currentPage={currentPage} query={searchParams?.query} />
      </Suspense>
    </div>
  );
};

export default page;
