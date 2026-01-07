"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa";
import { Heart, Loader } from "lucide-react";
import axios from "axios";
import { FAVORITE } from "@/types/favorite";
import { z, ZodError } from "zod";
import { useToast } from "./ui/use-toast";
import { Favorite } from "@prisma/client";

const FavoriteButton = ({
  movieId,
  movieTitle,
  poster_path,
  releasedDate,
}: Omit<Omit<Favorite, "id">, "userId">) => {
  const { toast } = useToast();
  const [favorites, setfavorites] = useState<Favorite[]>([]);
  const [loading, setloading] = useState(false);

  const getFavorites = async () => {
    try {
      const response = await axios.get("/api/favorites/view");
      const validated = z.array(FAVORITE).parse(response.data);
      return validated;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message);
        return;
      }
      console.log("Fail to fetch favorite movies.");
    }
  };

  const isFavorite = favorites.some((movie) => movie.movieId === movieId);

  const addFavorite = async () => {
    try {
      setloading(true);
      const payload: Omit<Omit<Favorite, "id">, "userId"> = {
        movieId,
        movieTitle,
        poster_path,
        releasedDate,
      };
      const response = await axios.post("/api/favorites/add", payload);
      const validated = FAVORITE.parse(response.data);
      setfavorites((prv) => [...prv, validated]);
    } catch (error) {
      toast({
        title: "Fail to add movie to favorites.",
        description: "Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setloading(false);
    }
  };

  const removeFavorite = async () => {
    try {
      setloading(true);
      await axios.delete("/api/favorites/remove", { data: { movieId } });
      setfavorites((prv) => prv.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      toast({
        title: "Fail to remove movie from favorites.",
        description: "Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setloading(false);
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
  }, [movieId]);

  return (
    <Button
      variant={isFavorite ? "destructive" : "default"}
      disabled={loading}
      onClick={isFavorite ? removeFavorite : addFavorite}
    >
      {isFavorite ? (
        <div className="flex gap-x-2">
          <FaHeart className="w-6 h-6 text-white" />
          <span>Remove from Favorite List</span>
          <span>
            {loading ? (
              <Loader className="w6 h-6 text-white animate-spin" />
            ) : null}
          </span>
        </div>
      ) : (
        <div className="flex gap-x-2 items-center">
          <Heart className="w-6 h-6 text-white" />
          <span>Add to Favorite List</span>
          <span>
            {loading ? (
              <Loader className="w6 h-6 text-white animate-spin" />
            ) : null}
          </span>
        </div>
      )}
    </Button>
  );
};

export default FavoriteButton;
