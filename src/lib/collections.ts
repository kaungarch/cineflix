import axios from "axios";
import { options } from "./utils";
import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import { z, ZodError } from "zod";

const VALIDATOR = z.object({
  page: z.number(),
  results: z.array(POPULAR_MOVIE_VALIDATOR),
  total_pages: z.number(),
  total_results: z.number(),
});

export const getCrimeCollection = async (page: number = 1) => {
  try {
    const host_url = process.env.NEXT_PUBLIC_HOST_URL;
    const url = `${host_url}/discover/movie?language=en-US&with_genres=80,9648&sort_by=popularity.desc&with_original_language=en&page=${page}`;
    const response = await axios.get(url, options);
    const validated = VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch Crime Collection.");
  }
};
export const getClassicCollection = async (page: number = 1) => {
  try {
    const host_url = process.env.NEXT_PUBLIC_HOST_URL;
    const url = `${host_url}/discover/movie?language=en-US&primary_release_date.gte=1920-01-01&primary_release_date.lte=1970-12-31&sort_by=popularity.desc&page=${page}`;
    const response = await axios.get(url, options);
    const validated = VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch Crime Collection.");
  }
};
export const getSciFiCollection = async (page: number = 1) => {
  try {
    const host_url = process.env.NEXT_PUBLIC_HOST_URL;
    const url = `${host_url}/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=28,878page=${page}`;
    const response = await axios.get(url, options);
    const validated = VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch Crime Collection.");
  }
};

export const getTopRatedMovies = async () => {
  try {
    const host_url = process.env.NEXT_PUBLIC_HOST_URL;
    const url = `${host_url}/movie/top_rated?language=en-US&page=1`;
    const response = await axios.get(url, options);
    const validated = VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch Crime Collection.");
  }
};
export const getRomanceCollection = async (page: number = 1) => {
  try {
    const host_url = process.env.NEXT_PUBLIC_HOST_URL;
    const url = `${host_url}/discover/movie?language=en-US&vote_average.gte=7.0$adult=false&with_genres=10749&page=${page}`;
    const response = await axios.get(url, options);
    const validated = VALIDATOR.parse(response.data);
    return validated;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }
    console.log("Fail to fetch Crime Collection.");
  }
};

type GENRES = "classic" | "scifi" | "romance" | "crime";

export const GENRE_COLLECTIONS: Record<
  GENRES,
  (page: number) => Promise<z.infer<typeof VALIDATOR> | undefined>
> = {
  classic: (page: number = 1) => getClassicCollection(page),
  scifi: (page: number = 1) => getSciFiCollection(page),
  romance: (page: number = 1) => getRomanceCollection(page),
  crime: (page: number = 1) => getCrimeCollection(page),
} as const;
