import FavoriteMovies from "@/components/FavoriteMovies";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import { v4 } from "uuid";

const page = () => {
  return (
    <div className="flex flex-col w-full h-auto" key={v4()}>
      <div className="w-full h-auto flex flex-col px-3 lg:px-36 text-black dark:text-white">
        <div className="flex w-full h-auto">
          <h2 className="font-semibold xl:text-3xl text-xl">Favorite List</h2>
        </div>
        <Separator
          orientation="horizontal"
          className="mt-3 bg-neutral-300 dark:bg-zinc-700"
        />
        <div className="w-full h-auto mt-3" key={v4()}>
          <FavoriteMovies />
        </div>
      </div>
    </div>
  );
};

export default page;
