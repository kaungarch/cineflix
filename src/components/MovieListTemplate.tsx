"use client";

import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import React from "react";
import { z } from "zod";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import NextImage from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { inter } from "./ui/font";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { v4 } from "uuid";

interface Props {
  movieList: z.infer<typeof POPULAR_MOVIE_VALIDATOR>[];
  swiperName: string;
}

const MovieListTemplate = ({ movieList, swiperName }: Props) => {
  SwiperCore.use([Navigation]);

  return (
    <div className="w-full h-fit flex relative">
      <Swiper
        key={v4()}
        breakpoints={{
          1280: {
            slidesPerView: movieList.length < 5 ? movieList.length : 5,
            spaceBetween: 40,
          },
          1080: {
            slidesPerView: movieList.length < 4 ? movieList.length : 4,
            spaceBetween: 50,
          },
          600: {
            slidesPerView: movieList.length < 3 ? movieList.length : 3,
            spaceBetween: 20,
          },
          200: {
            slidesPerView: movieList.length < 2 ? movieList.length : 2,
            spaceBetween: 20,
          },
        }}
        style={{
          paddingLeft: "5px",
          paddingRight: "2px",
          paddingTop: "2px",
          flexDirection: "row",
        }}
        navigation={{
          nextEl: "." + swiperName + "-arrow-right",
          prevEl: "." + swiperName + "-arrow-left",
        }}
        modules={[Navigation]}
      >
        {movieList.map((movie) => (
          <SwiperSlide
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      <span
        className={`${swiperName}-arrow-right scale-50 md:scale-75 absolute top-[45%] right-0 flex bg-white/50 backdrop-blur-lg rounded-3xl z-50`}
      >
        <ArrowRight className="w m-6 h-6 text-black" />
      </span>
      <span
        className={`${swiperName}-arrow-left scale-50 md:scale-75 absolute left-0 top-[45%] flex bg-white/50 backdrop-blur-lg rounded-3xl z-50`}
      >
        <ArrowLeft className="w m-6 h-6 text-black" />
      </span>
    </div>
  );
};

export default MovieListTemplate;

interface MOVIE {
  movie: z.infer<typeof POPULAR_MOVIE_VALIDATOR>;
}

const MovieCard = ({ movie }: MOVIE) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/original${movie.poster_path}`;
  const fallbackImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/w92${movie.poster_path}`;
  const released_year = movie.release_date.split("-")[0];

  return (
    <div className="flex flex-col w-full h-full mt-2 justify-center items-center shadow-lg rounded-sm">
      <Link
        href={`/dashboard/movie/${movie.id}`}
        className="flex flex-col w-full h-auto"
      >
        <AspectRatio
          ratio={3 / 4.5}
          className="overflow-hidden rounded-md hover:outline hover:outline-primary outline-offset-1 group"
        >
          <NextImage
            fill
            alt="movie poster"
            src={imageUrl}
            placeholder="blur"
            blurDataURL={fallbackImageUrl}
            sizes="50vw, (min-width: 640px) 40vw, (min-width: 800px) 20vw"
            className="object-contain rounded-md group-hover:scale-105 transition duration-200 bg-primary/20"
          />
          <div className="absolute w-full h-[50%] left-0 bottom-0 dark:bg-gradient-to-t from-black" />
        </AspectRatio>
        {/* title & genres */}
        <div className={`w-full h-auto flex flex-col ${inter.className}`}>
          {/* title */}
          <span className="flex flex-nowrap w-full h-auto max-h-10 py-2 gap-x-1 grow-0 z-30">
            <div
              className="block h-full truncate font-medium text-xs md:text-sm tracking-tighter md:tracking-normal text-black dark:text-white"
              title={movie.title}
            >
              {movie.title}
            </div>
            <div className="block h-full shrink-0 font-medium text-xs md:text-sm tracking-tighter md:tracking-normal text-black dark:text-white">
              ({released_year})
            </div>
          </span>
        </div>
      </Link>
    </div>
  );
};
