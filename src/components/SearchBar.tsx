"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { v4 } from "uuid";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    const shouldUpdateUrl = term.trim().length > 1;
    if (shouldUpdateUrl) {
      params.set("query", term);
      // params.append("page", "1");
      params.delete("page");
      push(`/dashboard/movie/search?${params.toString()}`);
    } else {
      params.delete("query");
      params.delete("page");
      return;
    }
  }, 500);

  return (
    <div className="flex w-full justify-end px-4" key={v4()}>
      <div className="relative flex">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="peer w-full py-[9px] pl-10 rounded-lg text-sm placeholder:text-gray-500"
          placeholder={"search movie..."}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={
            searchParams.get("query")
              ? searchParams.get("query")?.toString()
              : ""
          }
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 peer-focus:text-primary" />
      </div>
    </div>
  );
};

export default SearchBar;
