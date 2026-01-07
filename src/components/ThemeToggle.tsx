"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const initialTheme = () => {
  const previousTheme = localStorage.getItem("next-shadcn-dev") as
    | "light"
    | "dark"
    | undefined;

  if (!previousTheme) {
    document.documentElement.classList.add("dark");
    return;
  }
  document.documentElement.classList.add(previousTheme);
};

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setmounted] = useState<boolean>(false);

  useEffect(() => {
    setmounted(true);
    initialTheme();
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log({ newTheme });
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("next-shadcn-dev", newTheme);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="flex h-full">
        <SunMoon className="w-6 h-6 text-black dark:text-white" />
      </span>
      <span className="flex h-full">
        <Switch
          onClick={toggle}
          checked={theme === "dark"}
          className="scale-75 xl:scale-90"
        />
      </span>
    </div>
  );
};

export default ThemeToggle;
