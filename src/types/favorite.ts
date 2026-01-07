import { z } from "zod";

export const FAVORITE = z.object({
  id: z.number(),
  userId: z.number(),
  movieId: z.number(),
  movieTitle: z.string(),
  releasedDate: z.string(),
  poster_path: z.string(),
});
