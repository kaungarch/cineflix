import MovieGrid from "@/components/MovieGrid";
import PaginationTemplate from "@/components/PaginationTemplate";
import { inter } from "@/components/ui/font";
import { Separator } from "@/components/ui/separator";
import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import React from "react";
import { v4 } from "uuid";
import { z } from "zod";

interface Props {
  upcomingMovies: z.infer<typeof POPULAR_MOVIE_VALIDATOR>[];
  currentPage: number;
  total_pages: number;
}

const UpcomingMovies = ({
  currentPage,
  total_pages,
  upcomingMovies,
}: Props) => {
  const url = `/dashboard/movies/coming-soon?`;

  return (
    <div className=" w-full flex-1 h-auto flex flex-col">
      <MovieGrid
        currentPage={currentPage}
        movieLists={upcomingMovies}
        key={v4()}
      />

      <div className="flex w-full h-auto mt-5 mb-3 justify-center">
        <PaginationTemplate
          currentPage={currentPage}
          total_pages={total_pages}
          url={url}
        />
      </div>
    </div>
  );
};

export default UpcomingMovies;
