import { z } from "zod";
import { POPULAR_MOVIE_VALIDATOR } from "./popular-movies";

export const RECOMMANDATION_MOVIES_VALIDATOR = POPULAR_MOVIE_VALIDATOR.extend({
  media_type: z.string(),
});
