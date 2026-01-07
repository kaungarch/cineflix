import SearchBar from "@/components/SearchBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-auto mt-20 bg-white dark:bg-black">
      {children}
    </div>
  );
};

export default layout;
