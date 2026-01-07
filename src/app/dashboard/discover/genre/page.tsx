import MovieGrid from "@/components/MovieGrid";
import PaginationTemplate from "@/components/PaginationTemplate";
import { GENRE_COLLECTIONS } from "@/lib/collections";
import { notFound } from "next/navigation";
import React from "react";

type GENRES = "classic" | "scifi" | "romance" | "crime";

interface Props {
  searchParams: {
    genre: string | null | undefined;
    page: string;
  };
}

const page = async ({ searchParams }: Props) => {
  const { genre } = searchParams;

  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (!genre) return notFound();

  const isValidGenre = genre in GENRE_COLLECTIONS;

  if (!isValidGenre) return notFound();

  const collection = await GENRE_COLLECTIONS[genre as GENRES](page);
  const url = `/dashboard/discover/genre?genre=${genre}&`;

  return (
    <div className="w-full h-auto flex flex-col pb-5 px-3 lg:px-36 gap-y-3">
      {collection && collection.results.length > 0 ? (
        <>
          <div className="">
            <MovieGrid currentPage={page} movieLists={collection.results} />
          </div>
          <div>
            <PaginationTemplate
              currentPage={page}
              total_pages={collection.total_pages}
              url={url}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full h-[400px] justify-center items-center">
          No movies yet...
        </div>
      )}
    </div>
  );
};

export default page;
