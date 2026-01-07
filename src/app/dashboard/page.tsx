import DashboardMoviePoster from "@/components/DashboardMoviePoster";
import DiscoverByGenres from "@/components/DiscoverByGenres";
import MovieListTemplate from "@/components/MovieListTemplate";
import PopularMovie from "@/components/PopularMovie";
import { options } from "@/lib/utils";
import { TOPRATED_MOVIE_VALIDATOR } from "@/types/popular-movies";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import z, { ZodError } from "zod";

const tmdb_api_key = process.env.NEXT_PUBLIC_TMDB_KEY;
const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const fetchTopRatedMovies = async () => {
  try {
    const url = `${host_url}/movie/top_rated?language=en-US&page=1`;

    const response = await axios.get(url, options);
    const topRatedMoviesList = z
      .array(TOPRATED_MOVIE_VALIDATOR)
      .parse(response.data.results);
    return topRatedMoviesList;
  } catch (error) {
    if (error instanceof ZodError) console.log(error.message);
    console.log("fail to fetch top rated movies.");
  }
};

const fetchHauntingCollection = async () => {
  try {
    const url = `${host_url}/discover/movie?with_genres=53,27`;

    const response = await axios.get(url, options);
    const hauntingCollection = z
      .array(TOPRATED_MOVIE_VALIDATOR)
      .parse(response.data.results);
    return hauntingCollection;
  } catch (error) {
    if (error instanceof ZodError) console.log(error.message);
    console.log("fail to fetch top rated movies.");
  }
};

const page = async () => {
  const fetchResults = await Promise.all([
    await fetchTopRatedMovies(),
    await fetchHauntingCollection(),
  ]);

  const RANDOM_NUMBER = Math.floor(Math.random() * (19 - 0 + 1)) + 0;

  const [topRatedMovies, hauntingCollection] = fetchResults;

  if (!topRatedMovies) return notFound();

  const topRatedRandomMovie = topRatedMovies[0];

  return (
    <div className="mt-16 xl:mt-20 w-full h-auto flex flex-col">
      <div className="flex flex-col w-full min-w-[400px]:px-0 sm:px-5 xl:px-10 h-auto">
        {/* random movie poster */}
        <div className="flex flex-col w-full h-auto">
          <main className="grid w-full h-auto">
            <DashboardMoviePoster movie={topRatedRandomMovie} />
          </main>
        </div>

        <div className="flex flex-col w-full h-auto px-3 2xl:px-16">
          {/* top rated movies */}
          {topRatedMovies && topRatedMovies.length > 0 ? (
            <div className="mt-5 flex flex-col gap-y-5">
              <Separator
                orientation="horizontal"
                className="dark:bg-primary mb-3"
              />
              <span className="px-3 sm:px-0">
                <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
                  Top Rated Movies
                </h2>
              </span>
              <div className="flex w-full h-auto">
                <MovieListTemplate
                  movieList={topRatedMovies}
                  swiperName="topRated"
                />
              </div>
            </div>
          ) : null}

          {/* The Haunting Collections */}
          {hauntingCollection && hauntingCollection.length > 0 ? (
            <div className="mt-5 flex flex-col gap-y-5">
              <Separator
                orientation="horizontal"
                className="dark:bg-primary mb-3"
              />
              <span className="px-3 sm:px-0">
                <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
                  The Haunting Collection
                </h2>
              </span>
              <div className="flex w-full h-auto">
                <MovieListTemplate
                  movieList={hauntingCollection}
                  swiperName="hauntedCollection"
                />
              </div>
            </div>
          ) : null}

          {/* discover by genres */}
          {/*<div className="mt-2 flex flex-col gap-y-5 md:px-10 px-5">*/}
          {/*  <DiscoverByGenres />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default page;
