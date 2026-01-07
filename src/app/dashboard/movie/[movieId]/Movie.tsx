import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import React from "react";
import NextImage from "next/image";
import z, { ZodError } from "zod";
import {
  GENRES_VALIDATOR,
  MOVIE_DETAILS_WITH_CREDITS_VALIDATOR,
  PRODUCTION_COMPANIES_VALIDATOR,
} from "@/types/movie-details";
import { inter, montserrat, oswald } from "@/components/ui/font";
import Casts from "@/components/Casts";
import { v4 } from "uuid";
import FavoriteButton from "@/components/FavoriteButton";
import { Skeleton } from "@/components/ui/skeleton";
import {getServerSession, Session} from "next-auth";
import {Button} from "@/components/ui/button";

interface Props {
  movie: z.infer<typeof MOVIE_DETAILS_WITH_CREDITS_VALIDATOR>;
}

const Movie = async ({ movie }: Props) => {
  const imagePath = movie.poster_path ?? movie.backdrop_path;
  const session = await getServerSession();

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/w500${imagePath}`;
  const released_year = movie.release_date.split("-")[0];

  return (
    <div className="flex w-full h-auto flex-col xl:px-10" key={v4()}>
      <div className="flex w-full h-full max-[500px]:flex-col sm:flex-row min-[501px]:pl-5 pb-5 max-[500px]:items-center">
        {/* movie poster */}
        <div className="flex max-[500px]:w-[80%] w-[30%] sm:w-[35%] md:w-[30%] xl:w-[25%] 2xl:w-[25%] h-fit sm:items-center overflow-hidden rounded-lg">
          <AspectRatio ratio={9 / 16}>
            <NextImage
              src={imageUrl}
              fill
              sizes="80vw"
              alt="movie poster"
              className="object-cover rounded-lg bg-primary/20"
            />
          </AspectRatio>
        </div>
        {/* movie info */}
        <div
          className={`flex-1 flex flex-col max-sm:mr-5 max-xl:mr-10 xl:mr-10 min-[500px]:ml-5 max-[500px]:mt-10 max-[500px]:px-3 pb-5 ${inter.className}`}
        >
          {/* title */}
          <div>
            <h2
              className={`max-md:text-3xl font-extrabold md:text-4xl 2xl:text-5xl uppercase ${oswald.className} text-black dark:text-zinc-300`}
            >
              {movie.title} ({released_year})
            </h2>
          </div>
          {/* overview */}
          <div className="flex mt-5">
            <p
              className={`${montserrat.className} text-neutral-500 dark:text-neutral-300 text-wrap leading-loose tracking-wide xl:text-lg`}
            >
              {movie.overview}
            </p>
          </div>
          {/* add/remove favorite */}
          <div className="flex mt-3">
            {
              session ?
            <FavoriteButton
              movieId={movie.id}
              movieTitle={movie.title}
              poster_path={movie.poster_path}
              releasedDate={movie.release_date}
            />: <div className="text-yellow-600 px-5 py-3 rounded-md border border-yellow-600">
                <Link href={"/auth/signin"} className="mr-2 underline text-blue-600">
                  Sign in
                </Link>
                    to save favourite movies
                  </div>
            }
          </div>
          {/* lists */}
          <div>
            <ul
              role="list"
              className="flex flex-col mt-5 gap-y-5 text-neutral-400 dark:text-neutral-300 capitalize"
            >
              {/*  */}
              <li className="flex items-start gap-x-2">
                title: <span>{movie.original_title}</span>
              </li>
              <li className="flex items-start gap-x-2">
                release date: <span>{movie.release_date}</span>
              </li>
              <li className="flex items-start gap-x-2">
                original language: <span>{movie.original_language}</span>
              </li>
              {movie.genres.length > 0 ? (
                <li className="flex items-start gap-x-2">
                  genres: {<Genres genres={movie.genres} />}
                </li>
              ) : null}
              {movie.production_companies &&
              movie.production_companies.length > 0 ? (
                <li className="flex items-start gap-x-2">
                  production companies:
                  {<Companies companies={movie.production_companies} />}
                </li>
              ) : null}
              <li className="flex items-start gap-x-2">
                Runtime:{" "}
                <span className="inline lowercase">
                  {Math.floor(movie.runtime / 60)} hr {movie.runtime % 60}{" "}
                </span>
                min
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* casts */}
      <div className="flex flex-col px-2">
        <span>
          <h2 className="text-xl font-semibold">
            Casts ({movie.credits.cast.length})
          </h2>
        </span>
        <Casts casts={movie.credits.cast} key={v4()} />
      </div>
    </div>
  );
};

export default Movie;

interface GENRES {
  genres: z.infer<typeof GENRES_VALIDATOR>[];
}

const Genres = ({ genres }: GENRES) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="flex py-1 px-1 rounded-lg bg-neutral-200/80 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300"
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

interface COMPANY {
  companies: z.infer<typeof PRODUCTION_COMPANIES_VALIDATOR>[];
}

const Companies = ({ companies }: COMPANY) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {companies.map((company, index) => (
        <span key={company.id} className="flex">
          {company.name}
          {index + 1 === companies.length ? null : ","}
        </span>
      ))}
    </ul>
  );
};

export const MovieSkeleton = () => {
  return (
    <div className="flex w-full h-auto flex-col xl:px-10" key={v4()}>
      <div className="flex w-full h-full max-[500px]:flex-col sm:flex-row min-[501px]:pl-5 pb-5 max-[500px]:items-center">
        {/* movie poster */}
        <div className="flex max-[500px]:w-[80%] w-[30%] sm:w-[35%] md:w-[30%] xl:w-[25%] 2xl:w-[25%] h-fit sm:items-center overflow-hidden rounded-lg">
          <AspectRatio ratio={9 / 16}>
            <Skeleton className="w-full h-full rounded-lg bg-neutral-200 dark:bg-zinc-700" />
          </AspectRatio>
        </div>
        {/* movie info */}
        <div
          className={`flex-1 flex flex-col w-full max-sm:mr-5 max-xl:mr-10 xl:mr-10 min-[500px]:ml-5 max-[500px]:mt-10 max-[500px]:px-5 pb-5 ${inter.className}`}
        >
          {/* title */}
          <div className="">
            <h2>
              <Skeleton className="w-[40%] h-10 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            </h2>
          </div>
          {/* overview */}
          <div className="flex mt-5 flex-col gap-y-2">
            <Skeleton className="w-full h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[80%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[60%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[60%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[50%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[40%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[40%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
            <Skeleton className="w-[20%] h-5 rounded-lg bg-neutral-200 dark:bg-zinc-700" />
          </div>
          {/* add/remove favorite */}
          <div className="flex mt-3">
            <Skeleton className="w-28 h-8 rounded-md bg-neutral-200 dark:bg-zinc-700" />
          </div>
          {/* lists */}
          <div>
            <ul
              role="list"
              className="flex flex-col mt-5 gap-y-5 text-neutral-400 dark:text-neutral-300 capitalize"
            >
              {/*  */}
              <li className="flex items-start gap-x-2">
                <Skeleton className="w-10 h-5 rounded-md bg-neutral-200 dark:bg-zinc-700" />
                <Skeleton className="w-[60%] h-5 bg-neutral-200 dark:bg-zinc-700" />
              </li>
              <li className="flex items-start gap-x-2">
                <Skeleton className="w-10 h-5 rounded-md bg-neutral-200 dark:bg-zinc-700" />
                <Skeleton className="w-[60%] h-5 bg-neutral-200 dark:bg-zinc-700" />
              </li>
              <li className="flex items-start gap-x-2">
                <Skeleton className="w-10 h-5 rounded-md bg-neutral-200 dark:bg-zinc-700" />
                <Skeleton className="w-[60%] h-5 bg-neutral-200 dark:bg-zinc-700" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
