import MovieListTemplate from "@/components/MovieListTemplate";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { oswald } from "@/components/ui/font";
import { getTopRatedMovies } from "@/lib/collections";
import { Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const host_image_url = process.env.NEXT_PUBLIC_IMAGE_URL;

  const topRatedMovies = await getTopRatedMovies();

  return (
    <div className="sm:container w-full h-auto mt-16">
      {/* hero section */}
      <div className="relative w-full h-auto flex justify-end">
        {/* image wrapper */}
        <div className="w-full hidden sm:block">
          <AspectRatio ratio={5 / 2.5} className="overflow-hidden">
            <Image
              src={"/landing page poster.jpg"}
              alt="movie backdropth"
              fill
              quality={100}
              className="object-cover"
            />
          </AspectRatio>
        </div>

        {/* mobile image wrapper */}
        <div className="w-full block sm:hidden">
          <AspectRatio ratio={3 / 4.5} className="overflow-hidden">
            <Image
              src={"/landing page poster.jpg"}
              alt="movie backdropth"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>

        {/* title */}
        <div className="absolute w-full flex flex-col gap-y-3 left-1 bottom-5">
          <h1
            className={`${oswald.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white`}
          >
            Discover Movies That Captivate You.
          </h1>
          {/* button */}
          <span className="flex sm:flex-row flex-col justify-start sm:items-center pl-3 lg:pl-10 gap-y-3 sm:gap-x-3">
            <span className="flex w-full sm:w-auto">
              <p className={"text-lg text-white font-semibold"}>
                Start your Infinite Journey.
              </p>
            </span>
            <Link href={"dashboard/discover"}>
              <Button
                size={"sm"}
                className="gap-x-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
              >
                <span>
                  <Compass className="w-4 h-4 text-white" />
                </span>
                <p className="text-base">Discover</p>
              </Button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
