"use client";

import { CAST_VALIDATOR } from "@/types/movie-details";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { v4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type CAST = z.infer<typeof CAST_VALIDATOR>;

interface Props {
  casts: CAST[];
}

const Casts = ({ casts }: Props) => {
  SwiperCore.use([Navigation]);

  const swiper = useSwiper();

  return (
    <div className="flex flex-col gap-y-3">
      <div className="w-full h-fit flex relative">
        <Swiper
          key={v4()}
          slidesPerView={4}
          breakpoints={{
            1280: {
              slidesPerView: casts.length < 7 ? casts.length : 7,
              spaceBetween: 20,
            },
            1080: {
              slidesPerView: casts.length < 6 ? casts.length : 6,
              spaceBetween: 30,
            },
            800: {
              slidesPerView: casts.length < 4 ? casts.length : 4,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: casts.length < 4 ? casts.length : 4,
              spaceBetween: 20,
            },
            200: {
              slidesPerView: 3,
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
            nextEl: ".cast-arrow-right",
            prevEl: ".cast-arrow-left",
          }}
          modules={[Navigation]}
        >
          {casts.map((cast) => (
            <SwiperSlide key={cast.id}>
              <CastAvatar cast={cast} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* buttons */}
      <div className="flex gap-x-2 w-full h-auto justify-center">
        <span className="cast-arrow-left hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-lg">
          <ChevronLeft className="md:w-10 md:h-10 w-8 h-w-8 text-primary" />
        </span>
        <span className="cast-arrow-right hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-lg">
          <ChevronRight className="md:w-10 md:h-10 w-8 h-w-8 text-primary" />
        </span>
      </div>
    </div>
  );
};
export default Casts;

interface CASTAVATAR {
  cast: CAST;
}

const CastAvatar = ({ cast }: CASTAVATAR) => {
  const castImageUrl = process.env.NEXT_PUBLIC_CAST_IMAGE_URL;
  const imageUrl = cast.profile_path
    ? `${castImageUrl}/w185${cast.profile_path}`
    : "";

  return (
    <div className="flex flex-col w-full h-full pt-5 gap-y-3 items-center">
      <Link href={`/dashboard/cast/${cast.id}`} className="flex w-auto h-auto">
        <Avatar className="md:w-28 md:h-28 xl:w-36 xl:h-36 w-16 h-16 hover:ring ring-primary ring-offset-2 ring-offset-white dark:ring-offset-black">
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
      </Link>

      <span className="block w-full h-10 text-nowrap truncate">
        <p
          className="text-sm text-center text-nowrap truncate text-black dark:text-white"
          title={cast.name}
        >
          {cast.name}
        </p>
        <p className="text-sm text-center text-nowrap truncate text-neutral-500 dark:text-zinc-500">
          {cast.character}
        </p>
      </span>
    </div>
  );
};
