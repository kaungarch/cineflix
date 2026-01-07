import Cast from "@/components/Cast";
import { options } from "@/lib/utils";
import { CAST_VALIDATOR } from "@/types/cast";
import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import axios from "axios";
import React from "react";
import { z, ZodError } from "zod";

interface Props {
  params: {
    castId: string;
  };
}

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const getCastDetails = async (castId: string) => {
  try {
    const url = `${host_url}/person/${castId}?language=en-US`;
    const response = await axios.get(url, options);
    const validated = CAST_VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }

    console.log("Failed to fetch cast details.");
  }
};

const getRelatedMovies = async (castId: string) => {
  try {
    const url = `${host_url}/discover/movie?language=en-US&page=1&with_people=${castId}`;
    const response = await axios.get(url, options);
    const validated = z
      .array(POPULAR_MOVIE_VALIDATOR)
      .parse(response.data.results);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }

    console.log("Failed to fetch cast details.");
  }
};

const page = async ({ params }: Props) => {
  const castId = params.castId ?? undefined;

  const responses = await Promise.all([
    await getCastDetails(castId),
    await getRelatedMovies(castId),
  ]);

  const castDetails = responses[0];
  const relatedMovies = responses[1];

  return (
    <div className="flex w-full h-auto flex-col px-3 xl:px-36 mb-3">
      {castDetails ? (
        <Cast cast={castDetails} relatedMovies={relatedMovies} />
      ) : null}
    </div>
  );
};

export default page;
