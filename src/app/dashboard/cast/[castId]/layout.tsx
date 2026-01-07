import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-auto mt-20 flex-col bg-white dark:bg-black">
      {children}
    </div>
  );
};

export default layout;
