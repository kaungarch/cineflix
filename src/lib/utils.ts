
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const tmdb_token = process.env.NEXT_PUBLIC_TMDB_TOKEN;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdb_token}`,
  },
};

export const getDecades = (start: number) => {
  const decades : number[] = [start]

  const end = new Date().getFullYear()
  
  let accumulator = start

  do {
    accumulator += 10
    if(accumulator > end )
    break

    decades.push(accumulator)
  } while (accumulator < end);

  return decades
}