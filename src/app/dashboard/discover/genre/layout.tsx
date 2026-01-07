import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-auto bg-white dark:bg-black">{children}</div>
  );
};

export default layout;
