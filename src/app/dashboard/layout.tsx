import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="w-full h-auto flex flex-col bg-white dark:bg-black">
      {children}
    </div>
  );
};

export default layout;
