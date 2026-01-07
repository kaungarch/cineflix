import { Instagram, Search } from "lucide-react";
import React from "react";
import { IoLogoFacebook, IoLogoYoutube } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { v4 } from "uuid";
import Link from "next/link";
import { Session } from "next-auth";

const FooterLinks = [
  {
    name: "Facebook",
    logo: (
      <FaSquareFacebook className="w-6 h-6 md:w-8 md:h-w-8  text-black dark:text-white hover:text-primary dark:hover:text-primary" />
    ),
  },
  {
    name: "Youtube",
    logo: (
      <IoLogoYoutube className="w-6 h-6 md:w-8 md:h-w-8  text-black dark:text-white hover:text-primary dark:hover:text-primary" />
    ),
  },
  {
    name: "X",
    logo: (
      <BsTwitterX className="w-6 h-6 md:w-8 md:h-w-8  text-black dark:text-white hover:text-primary dark:hover:text-primary" />
    ),
  },
  {
    name: "Instagram",
    logo: (
      <Instagram className="w-6 h-6 md:w-8 md:h-w-8  text-black dark:text-white hover:text-primary dark:hover:text-primary" />
    ),
  },
] as const;

const QuickLinks = [
  {
    name: "Search",
    href: "/dashboard/movie/search",
  },
  {
    name: "favorites",
    href: "/dashboard/favorites",
  },
  {
    name: "discover",
    href: "/dashboard/discover",
  },
];

interface Props {
  session: Session | null;
}

const Footer = ({ session }: Props) => {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col w-full h-auto mt-3 p-3 xl:px-36 pt-10 border-t dark:bg-black bg-white  border-neutral-300 dark:border-zinc-700">
      {/* logo */}
      <div className="flex flex-col gap-y-2 w-full h-auto text-black dark:text-white">
        <span>
          <h2 className="font-bold text-3xl">
            Cine
            <span className="text-primary">Flix</span>
          </h2>
        </span>
        <span>
          <p className="text-wrap">
            We provide the best movie recommendations and information.
          </p>
        </span>
      </div>

      <div className="w-full flex gap-x-3 md:gap-x-10 py-3">
        {/* quick links */}
        {session ? (
          <div className="flex w-auto flex-col gap-y-2">
            <p className="text-black dark:text-white">Quick Links</p>
            <ol role="list" className="w-auto gap-x-3 flex flex-col">
              {QuickLinks.map((item) => (
                <Link
                  href={item.href}
                  key={v4()}
                  className="hover:underline underline-offset-2 text-neutral-500 dark:text-zinc-500"
                >
                  {item.name}
                </Link>
              ))}
            </ol>
          </div>
        ) : null}
        {/* social media */}
        <div className="flex w-auto flex-col gap-y-2">
          <p className="text-black dark:text-white">Follow us</p>
          <ol role="list" className="w-auto gap-x-3 flex">
            {FooterLinks.map((item) => (
              <li key={v4()} title={item.name}>
                {item.logo}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* copyright */}
      <div className="flex w-full h-auto py-5 justify-center text-neutral-400 dark:text-zinc-500">
        Copyright
        <span className="pl-2 font-sans">&copy;{copyrightYear}</span>
      </div>
    </footer>
  );
};

export default Footer;
