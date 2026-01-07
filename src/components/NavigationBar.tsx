"use client";

import React, { useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { inter } from "./ui/font";
import Link from "next/link";
import { Button } from "./ui/button";
import NextImage from "next/image";
import SignoutButton from "./SignoutButton";
import { Compass, FolderHeart, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { v4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface Props {
  session: Session | null;
}

const links = [
  {
    name: "search",
    logo: (isActive: boolean) => (
      <Search
        className={cn(
          "w-5 h-5 text-black dark:text-white group-hover:text-primary",
          {
            "group-hover:text-black dark:group-hover:text-white": isActive,
          }
        )}
      />
    ),
    href: "/dashboard/movie/search",
  },
  {
    name: "discover",
    logo: (isActive: boolean) => (
      <Compass
        className={cn(
          "w-5 h-5 text-black dark:text-white group-hover:text-primary",
          {
            "group-hover:text-black dark:group-hover:text-white": isActive,
          }
        )}
      />
    ),
    href: "/dashboard/discover",
  },
  {
    name: "favorites",
    logo: (isActive: boolean) => (
      <FolderHeart
        className={cn(
          "w-5 h-5 text-black dark:text-white group-hover:text-primary",
          {
            "group-hover:text-black dark:group-hover:text-white": isActive,
          }
        )}
      />
    ),
    href: "/dashboard/favorites",
  },
] as const;

const NavigationBar = ({ session }: Props) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-auto items-center bg-white/70 dark:bg-black/70 backdrop-blur-md z-[100] shadow-lg">
      <div className="flex w-full py-3 px-4 justify-between items-center">
        {/* logo */}
        <div className="flex h-full items-center">
          <span>
            <Link href={"/"}>
              <h2 className={`${inter.className} font-semibold text-xl`}>
                Cine<span className="text-primary">Flix</span>
              </h2>
            </Link>
          </span>
        </div>

        {/* nav links */}

        <ul role="list" className="flex gap-x-3 items-center">
          {session
            ? links.map((linkItem) => (
                <NavLinkItem item={linkItem} key={v4()} />
              ))
            : null}

          {/* theme toggle */}
          <li className="flex items-center">
            <ThemeToggle />
          </li>

          {/* profile & sign in/out */}
          {session ? (
            <li className={`lg:flex hidden ml-2 ${inter.className} sm:text-sm`}>
              <div className="flex gap-x-2">
                <div className="relative h-10 w-10 bg-zinc-300 dark:bg-zinc-600 rounded-full">
                  <NextImage
                    fill
                    sizes="100px"
                    referrerPolicy="no-referrer"
                    className="rounded-full object-contain"
                    src={session.user!.image || ""}
                    alt={"user profile"}
                    title={session.user.name ?? "user"}
                  />
                </div>

                {/* signout */}
                <span className="lg:inline hidden">
                  <SignoutButton />
                </span>
              </div>
            </li>
          ) : (
            <li className={`flex ml-2 ${inter.className} sm:text-sm`}>
              <Link href={"/auth/signin"}>
                <Button size={"sm"}>Sign In</Button>
              </Link>
            </li>
          )}

          {/* menu */}
          {session ? (
            <li className="flex lg:hidden">
              <MobileMenu />
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

const NavLinkItem = ({ item }: { item: typeof links[number] }) => {
  const pathName = usePathname();
  const isActive = pathName.includes(item.name);

  return (
    <Link
      href={item.href}
      className={cn("hidden lg:block group rounded-3xl px-2 py-2", {
        "dark:bg-zinc-800 bg-neutral-200": isActive,
      })}
    >
      <li
        className={cn(
          "flex items-center justify-center gap-x-1 group-hover:text-primary",
          {
            "dark:group-hover:text-white group-hover:text-black": isActive,
          }
        )}
      >
        <span className={"group-hover:text-primary"}>
          {item.logo(isActive)}
        </span>
        <p className="capitalize">{item.name}</p>
      </li>
    </Link>
  );
};

export default NavigationBar;

const MobileMenu = () => {
  const [isOpen, setisOpen] = useState(false);
  const pathName = usePathname();

  return (
    <DropdownMenu onOpenChange={(e) => setisOpen(e)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {isOpen ? (
            <X className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-black dark:text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[200]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => {
            const isActive = pathName.includes(link.name);
            return (
              <Link href={link.href} key={v4()}>
                <DropdownMenuItem
                  className={cn("capitalize", {
                    "bg-neutral-200 dark:bg-zinc-700": isActive,
                  })}
                >
                  {link.name}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
