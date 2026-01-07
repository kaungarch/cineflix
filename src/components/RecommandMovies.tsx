"use client";

import React from "react";
import { z } from "zod";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { RECOMMANDATION_MOVIES_VALIDATOR } from "@/types/recommandation-movies";
import MovieListTemplate from "./MovieListTemplate";

interface Props {
  recommendedMovies: z.infer<typeof RECOMMANDATION_MOVIES_VALIDATOR>[];
}

const RecommendedMovie = ({ recommendedMovies }: Props) => {
  SwiperCore.use([Navigation]);

  return (
    <div className="w-full h-fit flex relative">
      <MovieListTemplate
        movieList={recommendedMovies}
        swiperName="recommendedMovies"
      />
    </div>
  );
};

export default RecommendedMovie;
