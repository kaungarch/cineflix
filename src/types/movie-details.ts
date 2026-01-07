import z from "zod";

const CREW_VALIDATOR = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const CAST_VALIDATOR = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

const SPOKEN_LANGUAGES_VALIDATOR = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

const PRODUCTION_COUNTRIES_VALIDATOR = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const PRODUCTION_COMPANIES_VALIDATOR = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export const GENRES_VALIDATOR = z.object({
  id: z.number(),
  name: z.string(),
});

const BELONGS_TO_COLLECTION_VALIDATOR = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
});

export const MOVIE_DETAILS_VALIDATOR = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: BELONGS_TO_COLLECTION_VALIDATOR.nullable(),
  budget: z.number(),
  genres: z.array(GENRES_VALIDATOR),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(PRODUCTION_COMPANIES_VALIDATOR),
  production_countries: z.array(PRODUCTION_COUNTRIES_VALIDATOR),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SPOKEN_LANGUAGES_VALIDATOR),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MOVIE_DETAILS_WITH_CREDITS_VALIDATOR = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: BELONGS_TO_COLLECTION_VALIDATOR.nullable(),
  budget: z.number(),
  genres: z.array(GENRES_VALIDATOR),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(PRODUCTION_COMPANIES_VALIDATOR),
  production_countries: z.array(PRODUCTION_COUNTRIES_VALIDATOR),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(SPOKEN_LANGUAGES_VALIDATOR),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  credits: z.object({
    cast: z.array(CAST_VALIDATOR),
    crew: z.array(CREW_VALIDATOR),
  }),
});
