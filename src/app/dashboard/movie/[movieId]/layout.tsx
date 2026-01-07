import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return <div className="w-full h-full flex flex-col">{children}</div>;
};

export default layout;
