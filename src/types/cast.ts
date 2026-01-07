import { boolean, z } from "zod";

export const CAST_VALIDATOR = z.object({
  adult: z.boolean(),
  also_known_as: z.array(z.string()),
  biography: z.string().nullable(),
  birthday: z.string().nullable(),
  deathday: z.string().nullable(),
  gender: z.number(),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  known_for_department: z.string(),
  name: z.string(),
  place_of_birth: z.string().nullable(),
  popularity: z.number().nullable(),
  profile_path: z.string().nullable(),
});
