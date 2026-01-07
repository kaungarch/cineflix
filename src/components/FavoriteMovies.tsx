"use client";

import { FAVORITE } from "@/types/favorite";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { useToast } from "./ui/use-toast";
import { Favorite } from "@prisma/client";
import Link from "next/link";
import NextImage from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { inter } from "./ui/font";
import { FaHeart } from "react-icons/fa";
import { Loader, Trash2 } from "lucide-react";
import { MovieListSkeleton } from "./MovieGrid";

const FavoriteMovies = () => {
  const [favorites, setfavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/favorites/view");
      const validated = z.array(FAVORITE).parse(response.data);
      return validated;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message);
        return;
      }
      console.log("Fail to fetch favorite movies.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getFavorite = async () => {
      const favoriteList = await getFavorites();
      if (favoriteList && favoriteList.length > 0) {
        setfavorites(favoriteList);
        console.log({ favoriteList });
      }
      console.log("no favorite");
      return;
    };

    getFavorite();
  }, []);

  if (isLoading) return <MovieListSkeleton />;

  return (
    <div
      className={`${inter.className} w-full h-auto min-h-full flex flex-col`}
    >
      <div className="flex w-full h-auto py-3">
        <p className="text-lg">
          {favorites.length > 0
            ? `(${favorites.length}) ${favorites.length > 1 ? "items" : "item"}`
            : null}
        </p>
      </div>
      {favorites.length > 0 ? (
        <>
          <div className="w-full flex h-fit py-3 px-3 rounded-lg">
            <div className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 max-w-[500px]:gap-3">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  favorites={favorites}
                  setFavorites={setfavorites}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="font-normal mt-3 text-center">No movie yet...</p>
      )}
    </div>
  );
};

export default FavoriteMovies;

interface MOVIECARD {
  movie: Favorite;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

const MovieCard = ({ movie, setFavorites, favorites }: MOVIECARD) => {
  const host_url = process.env.NEXT_PUBLIC_IMAGE_URL;
  const imageUrl = `${host_url}/w342${movie.poster_path}`;
  const released_year = movie.releasedDate
    ? movie.releasedDate.split("-")[0]
    : "unknown";

  const { toast } = useToast();

  const [loading, setloading] = useState(false);

  const removeFavorite = async () => {
    try {
      setloading(true);
      await axios.delete("/api/favorites/remove", {
        data: { movieId: movie.movieId },
      });
      const payload = favorites.filter(
        (favoriteMovie) => favoriteMovie.movieId !== movie.movieId
      );
      setFavorites(payload);
    } catch (error) {
      toast({
        title: "Fail to remove movie to favorites.",
        description: "Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col w-full h-fit"
      title={movie.movieTitle}
    >
      <Link
        href={`/dashboard/movie/${movie.movieId}`}
        className="w-full h-full group"
      >
        <AspectRatio
          ratio={3 / 4.5}
          className="flex flex-col overflow-hidden rounded-md group-hover:outline outline-primary outline-offset-1"
        >
          <div className="flex">
            <NextImage
              alt="movie poster"
              src={imageUrl}
              fill
              sizes="40vw, (max-width: 500px) 30vw, (max-width: 808px) 40vw"
              className="object-cover rounded-md bg-primary/40 group-hover:scale-105 transition duration-300"
            />
          </div>
        </AspectRatio>
      </Link>
      {/* remove favorite */}
      <span
        className="absolute w-auto h-auto p-1 right-1 top-1 z-10 rounded-md bg-black"
        title="remove from favorite"
        onClick={removeFavorite}
      >
        {loading ? (
          <Loader className="w-6 h-6 text-white animate-spin" />
        ) : (
          <Trash2 className="w-6 h-6 text-white hover:text-red-400" />
        )}
      </span>
      {/* title & year */}
      <span className="flex flex-col">
        <div className="flex flex-col flex-nowrap w-full h-auto mt-2">
          <div className="block truncate font-normal md:text-base max-sm:text-sm">
            {movie.movieTitle}
          </div>
          <div>{released_year}</div>
        </div>
      </span>
    </div>
  );
};
