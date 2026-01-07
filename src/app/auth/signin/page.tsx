"use client";

import { Button } from "@/components/ui/button";
import { inter } from "@/components/ui/font";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState(false);

  const handleSignin = async () => {
    try {
      setisLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: "Fail to sign in.",
        description: "Something went worng. Please try again.",
        variant: "destructive",
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="w-full h-[60vh] flex justify-center items-center bg-white dark:bg-black">
      <div className={`flex ${inter.className} w-auto flex-col gap-y-5`}>
        <span className="mb-3">
          <Link href={"/"}>
            <h1
              className={`${inter.className} text-5xl font-bold text-black dark:text-white`}
            >
              Cine<span className="text-primary">Flix</span>
            </h1>
          </Link>
        </span>

        <span className="inline">
          <h2
            className={`${inter.className} font-bold text-3xl text-nowrap text-black dark:text-white`}
          >
            Sign in to your account
          </h2>
        </span>
        <div>
          <Button
            className="w-full"
            onClick={handleSignin}
            disabled={isLoading}
          >
            <span className="inline-block py-1 mr-3">
              <FaGoogle className="w-5 h-5 text-black" />
            </span>
            <span className="font-medium text-lg text-black dark:text-white">
              Sign in with Google
            </span>
            <span className="ml-2">
              {isLoading ? (
                <LoaderCircle className="w-6 h-6 animate-spin" />
              ) : null}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
