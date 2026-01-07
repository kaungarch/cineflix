import MovieListTemplate from "@/components/MovieListTemplate";
import { Button } from "@/components/ui/button";
import { oswald } from "@/components/ui/font";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getClassicCollection,
  getCrimeCollection,
  getRomanceCollection,
  getSciFiCollection,
} from "@/lib/collections";
import { getDecades } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

const page = async () => {
  const decades = getDecades(1920);

  const Collections = await Promise.all([
    await getCrimeCollection(),
    await getClassicCollection(),
    await getSciFiCollection(),
    await getRomanceCollection(),
  ]);

  const crimeCollection = Collections[0];
  const classicCollection = Collections[1];
  const sciFiCollection = Collections[2];
  const romanceCollection = Collections[3];

  return (
    <div className="flex flex-col container h-auto gap-y-5" key={v4()}>
      {/* welcome title */}
      <div className="mb-3 h-max">
        <span
          className={`${oswald.className} text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-pink-400 dark:to-primary`}
        >
          Begin Your Cinematic Adventure
        </span>
      </div>

      {/* Crime Wave */}
      {crimeCollection && crimeCollection.results.length > 0 ? (
        <div>
          {/* subtitle */}
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
              Crime Wave
            </h2>
            <Link href={"/dashboard/discover/genre?genre=crime&page=1"}>
              <Button variant={"link"} className="p-0 gap-x">
                View all
                <span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="py-5">
            <MovieListTemplate
              movieList={crimeCollection.results}
              swiperName="crimeCollection"
            />
          </div>
        </div>
      ) : null}

      {/* Golden Era */}
      {classicCollection && classicCollection.results.length > 0 ? (
        <div>
          {/* subtitle */}
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
              Golden Era
            </h2>
            <Link href={"/dashboard/discover/genre?genre=classic&page=1"}>
              <Button variant={"link"} className="p-0 gap-x">
                View all
                <span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="py-5">
            <MovieListTemplate
              movieList={classicCollection.results}
              swiperName="classicCollection"
            />
          </div>
        </div>
      ) : null}

      {/* discover by genres */}
      <div></div>

      {/* Sci-Fi */}
      {sciFiCollection && sciFiCollection.results.length > 0 ? (
        <div>
          {/* subtitle */}
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
              Science Fiction Odyssey
            </h2>
            <Link href={"/dashboard/discover/genre?genre=scifi&page=1"}>
              <Button variant={"link"} className="p-0 gap-x">
                View all
                <span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="py-5">
            <MovieListTemplate
              movieList={sciFiCollection.results}
              swiperName="SciFiCollection"
            />
          </div>
        </div>
      ) : null}

      {/* Romance */}
      {romanceCollection && romanceCollection.results.length > 0 ? (
        <div>
          {/* subtitle */}
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
              Love & Affection
            </h2>
            <Link href={"/dashboard/discover/genre?genre=romance&page=1"}>
              <Button variant={"link"} className="p-0 gap-x">
                View all
                <span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
          <div className="py-5">
            <MovieListTemplate
              movieList={romanceCollection.results}
              swiperName="romanceCollection"
            />
          </div>
        </div>
      ) : null}

      {/* discover by decades */}
      {/* <div className="flex w-full h-auto">
        <ScrollArea className="relative">
          <ScrollBar orientation="horizontal" />
          <div className="flex flow-row w-full h-auto gap-x-3">
            {decades.map((decade) => (
              <span
                className="px-3 py-2 rounded-md bg-neutral-200 dark:bg-zinc-700"
                key={v4()}
              >
                {decade}s
              </span>
            ))}
          </div>
        </ScrollArea>
      </div> */}
    </div>
  );
};

export default page;
