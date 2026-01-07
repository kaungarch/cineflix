import { options } from "@/lib/utils";
import { GENRES_VALIDATOR } from "@/types/movie-details";
import axios from "axios";
import React, { Suspense } from "react";
import { z, ZodError } from "zod";
import { inter } from "./ui/font";
import Link from "next/link";
import { v4 } from "uuid";
import { Skeleton } from "./ui/skeleton";
import { resolve } from "path";

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const getAllGenres = async () => {
  try {
    new Promise((resolve) => setTimeout(resolve, 1000));
    const url = `${host_url}/genre/movie/list?language=en`;
    const response = await axios.get(url, options);
    const { genres } = z
      .object({ genres: z.array(GENRES_VALIDATOR) })
      .parse(response.data);

    return genres;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch genre lists.");
  }
};

const DiscoverByGenres = async () => {
  const genresList = await getAllGenres();

  return (
    <div
      className="flex flex-col w-full h-auto py-3 gap-y-3 justify-center"
      key={v4()}
    >
      <div>
        <h2 className={`${inter.className} text-3xl font-semibold`}>
          Discover by genres
        </h2>
      </div>
      <Suspense fallback={<GenreSkeleton />}>
        <div className="flex flow-row flex-wrap gap-x-3 gap-y-2 justify-center">
          {genresList && genresList.length > 0
            ? genresList.map((genre) => (
                <Link href={""} className="flex w-auto h-auto" key={v4()}>
                  <span className="inline p-2 rounded-lg bg-neutral-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-100 hover:dark:bg-zinc-600">
                    <p className={`${inter.className} text-sm`}>{genre.name}</p>
                  </span>
                </Link>
              ))
            : null}
        </div>
      </Suspense>
    </div>
  );
};

const GenreSkeleton = () => {
  const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return fakeArray.map((item) => (
    <div
      className="flex flow-row flex-wrap gap-x-3 gap-y-2 justify-center"
      key={item}
    >
      <Skeleton
        className="inline w-20 h-10 rounded-xl bg-neutral-200 dark:bg-zinc-700 text-black dark:text-white"
        key={v4()}
      ></Skeleton>
    </div>
  ));
};

export default DiscoverByGenres;
