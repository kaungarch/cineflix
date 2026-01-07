"use client";

import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import { z } from "zod";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import MovieListTemplate from "./MovieListTemplate";
import { useEffect, useState } from "react";

interface Props {
  popularMovies: z.infer<typeof POPULAR_MOVIE_VALIDATOR>[];
}

const PopularMovie = ({ popularMovies }: Props) => {
  SwiperCore.use([Navigation]);

  const { data: session } = useSession();

  const [favoriteList, setfavoriteList] = useState<number[]>([]);

  return (
    <div className="w-full h-fit flex relative">
      <MovieListTemplate movieList={popularMovies} swiperName="popularMovies" />
    </div>
  );
};

export default PopularMovie;
