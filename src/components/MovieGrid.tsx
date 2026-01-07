import { POPULAR_MOVIE_VALIDATOR } from "@/types/popular-movies";
import { z, ZodError } from "zod";
import NextImage from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { inter } from "./ui/font";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { options } from "@/lib/utils";

const host_url = process.env.NEXT_PUBLIC_HOST_URL;

const ResponseValidator = z.object({
  results: z.array(POPULAR_MOVIE_VALIDATOR),
  total_pages: z.number(),
  total_results: z.number(),
  page: z.number(),
});

type RESPONSE = z.infer<typeof ResponseValidator>;

const searchMovies = async (query: string, page: number) => {
  try {
    const url = `${host_url}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const response = await axios.get(url, options);
    const validatedResults = ResponseValidator.parse(response.data);
    return validatedResults;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.message);
      return;
    }

    console.log("Fail to fetch data.");
  }
};

interface Props {
  currentPage: number;
  movieLists: z.infer<typeof POPULAR_MOVIE_VALIDATOR>[];
}

const MovieGrid = async ({ currentPage, movieLists }: Props) => {
  return (
    <>
      {movieLists && movieLists.length > 0 ? (
        <div className="w-full flex h-fit py-3 px-3 rounded-lg">
          <div className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 max-w-[500px]:gap-3">
            {movieLists.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full py-5 justify-center items-center bg-white dark:bg-black">
          <p className={`${inter.className} italic text-base`}>No movies...</p>
        </div>
      )}
    </>
  );
};

const MovieCard = async ({
  movie,
}: {
  movie: z.infer<typeof POPULAR_MOVIE_VALIDATOR>;
}) => {
  const image = movie.poster_path ?? movie.backdrop_path;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/original${image}`;
  const fallbackImageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/w92${image}`;
  const released_year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "unknown";

  return (
    <div className="flex flex-col w-full h-fit" title={movie.title}>
      <Link
        href={`/dashboard/movie/${movie.id}`}
        className="w-full h-full group"
      >
        <AspectRatio
          ratio={3 / 4.5}
          className="flex flex-col overflow-hidden rounded-md group-hover:outline outline-primary outline-offset-1 bg-primary/40"
        >
          <div className="flex">
            <NextImage
              alt="movie poster"
              src={imageUrl}
              quality={30}
              fill
              placeholder="blur"
              blurDataURL={fallbackImageUrl}
              loading="lazy"
              sizes="80vw, (min-width: 500px) 30vw, (min-width: 808px) 30vw"
              className="object-cover rounded-md bg-primary/40 group-hover:scale-105 transition duration-300"
            />
          </div>
        </AspectRatio>
      </Link>
      {/* title & year */}
      <span className="flex flex-col">
        <div className="flex flex-col flex-nowrap w-full h-auto mt-2">
          <div className="block truncate font-normal md:text-base max-sm:text-sm">
            {movie.title}
          </div>
          <div>{released_year}</div>
        </div>
      </span>
    </div>
  );
};

export const MovieListSkeleton = () => {
  const fakelist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full flex h-fit py-3 px-3 rounded-lg">
      <div className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 max-w-[500px]:gap-3">
        {fakelist.map((item) => (
          <div className="flex flex-col w-full h-full" key={item}>
            <AspectRatio ratio={3 / 4.5} className="flex flex-col">
              <div className="flex w-full h-full">
                <Skeleton className="flex w-full h-full bg-neutral-200 dark:bg-zinc-700" />
              </div>
            </AspectRatio>

            {/* title & year */}
            <span className="flex flex-col">
              <div className="flex flex-col flex-nowrap w-full h-auto mt-2">
                <div className="block truncate font-normal md:text-base max-sm:text-sm">
                  <Skeleton className="flex w-full h-5 mb-2 bg-neutral-200 dark:bg-zinc-700 rounded-lg" />
                </div>
                <div>
                  <Skeleton className="flex w-[40%] h-5 bg-neutral-200 dark:bg-zinc-700 rounded-lg" />
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
