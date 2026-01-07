import { TOPRATED_MOVIE_VALIDATOR } from "@/types/popular-movies";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React from "react";
import { z } from "zod";
import NextImage from "next/image";
import { Button } from "./ui/button";
import {
  fira_sans,
  inter,
  montserrat,
  oswald,
  poppins,
} from "./ui/font";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

interface Props {
  movie: z.infer<typeof TOPRATED_MOVIE_VALIDATOR>;
}

const DashboardMoviePoster = ({ movie }: Props) => {
  const moviePoster = movie.backdrop_path ?? movie.poster_path;
  const imageUrl = `https://image.tmdb.org/t/p/original/${moviePoster}`;
  const released_year = movie.release_date.split("-")[0];

  return (
    <div className="relative flex xl:flex-row flex-col w-full h-auto xl:justify-end">
      {/* title */}
      <div className="xl:absolute relative flex flex-col w-full pt-3 xl:pt-20 xl:left-0 xl:w-[50%] h-full px-3 md:px-5 order-last z-10">
        {/* movie title */}
        <div className="flex">
          <h2
            className={`${inter.className} font-bold text-2xl md:text-3xl xl:text-4xl text-black dark:text-white`}
          >
            {movie.title} ({released_year})
          </h2>
        </div>
        {/* overview */}
        <div className="flex w-full xl:w-[70%] h-auto text-wrap mt-3">
          <p
            className={`${poppins.className} text-sm md:text-lg xl:tracking-wide tracking-wide leading-relaxed xl:leading-normal text-neutral-700 dark:text-white`}
          >
            {movie.overview}
          </p>
        </div>
        {/* buttons */}
        <div className="w-auto h-auto mt-3 flex items-center gap-x-5">
          <span className="inline">
            <Link href={`/dashboard/movie/${movie.id}`}>
              <Button size={"sm"}>Watch Details</Button>
            </Link>
          </span>
          {/*<span*/}
          {/*  className="inline w-auto h-auto items-center p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-zinc-800"*/}
          {/*  title="add to favorite list"*/}
          {/*>*/}
          {/*  <FaRegHeart className="w-6 h-6 text-red-500" />*/}
          {/*</span>*/}
        </div>
      </div>

      {/* poster */}
      <div className="flex flex-col md:flex-row w-full xl:w-[70%] h-auto">
        <AspectRatio
          ratio={4 / 2.5}
          className="bg-transparent overflow-hidden grow-0 group"
        >
          <NextImage
            src={imageUrl}
            alt="movie poster"
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {/* left blur */}
          <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-white dark:from-black" />
          {/* right blur */}
          <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-white dark:from-black" />
          {/* top blur */}
          <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-white dark:from-black" />
          {/* bottom blur */}
          <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-white dark:from-black" />
        </AspectRatio>
      </div>
    </div>
  );
};

export default DashboardMoviePoster;
