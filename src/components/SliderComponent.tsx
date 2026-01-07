"use client";

import { useState } from "react";
import { Slider } from "./ui/slider";

const SliderComponent = () => {
  const [Size, setSize] = useState<number>(0);

  return (
    <div className="w-96 flex">
      <Slider defaultValue={[75]} max={100} step={1} className="" />
    </div>
  );
};

export default SliderComponent;
