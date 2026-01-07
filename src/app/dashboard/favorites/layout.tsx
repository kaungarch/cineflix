import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex w-full h-auto flex-col pt-16 md:pt-20 bg-white dark:bg-black">
      {children}
    </div>
  );
};

export default layout;
