import { CAST_VALIDATOR } from "@/types/cast";
import React from "react";
import { z } from "zod";
import NextImage from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { inter, oswald, poppins } from "./ui/font";
import MovieListTemplate from "./MovieListTemplate";
import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import MovieGrid from "./MovieGrid";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  cast: z.infer<typeof CAST_VALIDATOR>;
  relatedMovies: z.infer<typeof POPULAR_MOVIE_VALIDATOR>[] | null | undefined;
}

const Cast = ({ cast, relatedMovies }: Props) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_CAST_IMAGE_URL}/w342${cast.profile_path}`;

  return (
    <div className="flex flex-col gap-y-5 w-full h-auto">
      <div className="flex flex-col md:flex-row md:gap-x-3 max-md:gap-y-3">
        {/* avatar */}
        <div className="flex w-auto h-auto">
          <span className="flex w-full justify-center">
            <Avatar className="md:w-52 md:h-52 xl:w-36 xl:h-36 w-36 h-36 hover:ring ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black">
              <AvatarImage
                src={imageUrl}
                alt="avatar"
                className="object-cover"
                sizes="50px"
              />
              <AvatarFallback className="uppercase">
                {cast.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </span>
        </div>

        {/* overview */}
        <div
          className={`col-span-full sm:col-span-3 md:col-span-4 xl:col-span-6`}
        >
          <div className="flex flex-col w-full h-auto">
            {/* cast name */}
            <div className="mb-3">
              <h2
                className={`${oswald.className} font-semibold text-2xl md:text-4xl`}
              >
                {cast.name}
              </h2>
            </div>

            {/* biography */}
            <div>
              <p
                className={`${inter.className} tracking-wide text-wrap leading-relaxed text-neutral-500 dark:text-zinc-300`}
              >
                {cast.biography === null || cast.biography.trim().length === 0
                  ? "No biography!"
                  : cast.biography}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* known for */}
      <div className="flex flex-col w-full">
        {relatedMovies && relatedMovies.length > 0 ? (
          <>
            <h2 className={`font-semibold text-xl`}>Known for</h2>
            <div className="flex w-full h-auto">
              <MovieGrid currentPage={1} movieLists={relatedMovies} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Cast;
