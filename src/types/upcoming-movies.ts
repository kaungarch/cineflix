import { z } from "zod";
import { POPULAR_MOVIE_VALIDATOR } from "./popular-movies";

export const UPCOMING_MOVIES_VALIDATOR = z.object({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
  page: z.number(),
  results: z.array(POPULAR_MOVIE_VALIDATOR),
  total_pages: z.number(),
  total_results: z.number(),
});
