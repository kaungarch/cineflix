"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { LoaderCircle } from "lucide-react";

const SignoutButton = () => {
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();

  const handleSignout = async () => {
    try {
      setisLoading(true);
      await signOut({ callbackUrl: "/auth/signin" });
    } catch (error) {
      toast({
        title: "Fail to sign out.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Button onClick={handleSignout} size={"sm"} className="ml-3" disabled={isLoading}>
      Sign out
      <span className="inline ml-2">
        {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : null}
      </span>
    </Button>
  );
};

export default SignoutButton;
