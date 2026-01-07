import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import React, { lazy, Suspense } from "react";
import { z, ZodError } from "zod";
import { ScrollArea } from "./ui/scroll-area";
import NextImage from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { inter } from "./ui/font";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { options } from "@/lib/utils";
import PaginationTemplate from "./PaginationTemplate";
import MovieGrid from "./MovieGrid";

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const ResponseValidator = z.object({
  results: z.array(POPULAR_MOVIE_VALIDATOR),
  total_pages: z.number(),
  total_results: z.number(),
  page: z.number(),
});

type RESPONSE = z.infer<typeof ResponseValidator>;

const searchMovies = async (query: string, page: number) => {
  try {
    const searchQuery = query === undefined ? "" : query;
    const url = `${host_url}/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
    const response = await axios.get(url, options);
    const validatedResults = ResponseValidator.parse(response.data);
    return validatedResults;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }

    console.log("Fail to fetch data.");
  }
};

interface Props {
  currentPage: number;
  query: string;
}

const SearchResults = async ({ currentPage, query }: Props) => {
  const { results, total_pages, total_results } = (await searchMovies(
    query,
    currentPage
  )) as RESPONSE;

  const url = `/dashboard/movie/search?query=${query}&`;

  return (
    <div
      className={`${inter.className} w-full h-auto min-h-full flex flex-col`}
    >
      {total_results > 0 ? (
        <>
          <MovieGrid currentPage={currentPage} movieLists={results} />
          <div className="flex w-full h-auto mt-5 mb-3 justify-center">
            <PaginationTemplate
              currentPage={currentPage}
              total_pages={total_pages}
              url={url}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full h-full py-5 justify-center items-center bg-white dark:bg-black">
          {query ? (
            <p className={`${inter.className} italic text-base`}>
              No search result for{" "}
              <span className="inline text-neutral-400">{query}</span>
            </p>
          ) : (
            "No search result"
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
