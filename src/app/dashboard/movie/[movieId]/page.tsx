import { inter } from "@/components/ui/font";
import React, { Suspense } from "react";
import Movie, { MovieSkeleton } from "./Movie";
import axios, { AxiosError } from "axios";
import {
  GENRES_VALIDATOR,
  MOVIE_DETAILS_VALIDATOR,
  MOVIE_DETAILS_WITH_CREDITS_VALIDATOR,
} from "@/types/movie-details";
import { z, ZodError } from "zod";
import { notFound } from "next/navigation";
import { options } from "@/lib/utils";
import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import PopularMovie from "@/components/PopularMovie";
import RecommandMovies from "@/components/RecommandMovies";
import { RECOMMANDATION_MOVIES_VALIDATOR } from "@/types/recommandation-movies";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/SearchBar";
import { v4 } from "uuid";
import {useSession} from "next-auth/react";
import {getServerSession} from "next-auth";

interface Props {
  params: {
    movieId: string;
  };
}

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const getMovie = async (movieId: string) => {
  try {
    const url = `${host_url}/movie/${movieId}?language=en-US&append_to_response=credits`;

    const response = await axios.get(url, options);
    const movie = MOVIE_DETAILS_WITH_CREDITS_VALIDATOR.parse(response.data);
    return movie;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      return;
    }
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("fail to load data");
  }
};

const getGenres = async () => {
  try {
    const url = `${host_url}/genre/movie/list?language=en`;
    const response = await axios.get(url, options);
    const GENRES = z.array(GENRES_VALIDATOR).parse(response.data.genres);
    return GENRES;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    if (error instanceof AxiosError) {
      console.log(error.message);
      return;
    }
    console.log("Failed to load genres.");
  }
};

const getRecommandations = async (movieId: string) => {
  try {
    const url = `${host_url}/movie/${movieId}/recommendations?language=en-US&page=1`;
    const response = await axios.get(url, options);
    const GENRES = z
      .array(RECOMMANDATION_MOVIES_VALIDATOR)
      .parse(response.data.results);
    return GENRES;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    if (error instanceof AxiosError) {
      console.log(error.message);
      return;
    }
    console.log("Failed to load genres.");
  }
};

const page = async ({ params }: Props) => {
  const { movieId } = params;

  const ALLDATA = await Promise.all([
    await getMovie(movieId),
    await getGenres(),
    await getRecommandations(movieId),
  ]);

  const movie = ALLDATA[0];
  const genres = ALLDATA[1];
  const recommandMovies = ALLDATA[2];

  if (!movie || !genres || !recommandMovies) return notFound();

  return (
    <div
      key={v4()}
      className={`flex flex-col w-full h-max mt-20 pb-10 ${inter.className} dark:bg-black`}
    >
      {/* search bar */}
      <SearchBar />

      {/* movie detail */}
      <div className="flex w-full h-fit pt-5 mb-5" key={v4()}>
        <Suspense fallback={<MovieSkeleton />}>
          <Movie movie={movie} />
        </Suspense>
      </div>

      {/* recommend movies */}
      {recommandMovies.length > 0 ? (
        <div className="flex flex-col w-full h-auto mb-5 px-2 xl:px-10">
          <Separator
            orientation="horizontal"
            className="dark:bg-zinc-700 mb-3"
          />
          <div className="flex w-full h-auto">
            <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
              Recommended Movies
            </h2>
          </div>
          <div className="w-full py-5 rounded-lg">
            <RecommandMovies recommendedMovies={recommandMovies} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
