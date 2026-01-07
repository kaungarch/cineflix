import { MovieListSkeleton } from "@/components/MovieGrid";
import { options } from "@/lib/utils";
import { UPCOMING_MOVIES_VALIDATOR } from "@/types/upcoming-movies";
import axios from "axios";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { v4 } from "uuid";
import { z, ZodError } from "zod";
import UpcomingMovies from "./UpcomingMovies";
import { Separator } from "@/components/ui/separator";
import { inter } from "@/components/ui/font";

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const getUpcomingMovies = async (page: string) => {
  try {
    const url = `${host_url}/movie/upcoming?language=en-US&page=${page}`;
    const response = await axios.get(url, options);
    const validatedResult = UPCOMING_MOVIES_VALIDATOR.parse(response.data);
    return validatedResult;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }

    console.log("Fail to fetch upcoming movies.");
  }
};

interface Props {
  searchParams: {
    page: string;
  };
}

const page = async ({ searchParams }: Props) => {
  const currentPage = searchParams.page ?? 1;

  const upcomingMoviesList = await getUpcomingMovies(currentPage);

  if (!upcomingMoviesList) return notFound();

  const { total_pages, results: upcomingMovies } = upcomingMoviesList;

  return (
    <div
      key={v4()}
      className={`${inter.className} w-full h-auto flex flex-col px-3 lg:px-36 pb-3 mt-3 text-black dark:text-white`}
    >
      <h2 className="font-semibold xl:text-3xl text-xl">Coming Soon</h2>
      <Separator
        orientation="horizontal"
        className="my-3 bg-neutral-300 dark:bg-zinc-700"
      />
      <Suspense fallback={<MovieListSkeleton />}>
        <UpcomingMovies
          currentPage={Number(currentPage)}
          total_pages={total_pages}
          upcomingMovies={upcomingMovies}
        />
      </Suspense>
    </div>
  );
};

export default page;
