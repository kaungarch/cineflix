import SearchBar from "@/components/SearchBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-black">
      <div className="flex w-full h-full flex-col mt-20">
        <SearchBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
