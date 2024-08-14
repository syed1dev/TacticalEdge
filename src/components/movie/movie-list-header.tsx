"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CirclePlus, LogOut } from "lucide-react";
import Title from "../title";
import Link from "next/link";

const MovieListHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");

    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        setIsLoggedIn(parsedCredentials.isLoggedIn || false);
      } catch (error) {
        console.error("Error parsing credentials from localStorage:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("credentials");
    setIsLoggedIn(false);
  };
  return (
    <div className="py-4 mt-10 flex items-center justify-between">
      <div className="flex items-center">
        <Title text="My Movies" />
        <Link href={"/movie"}>
          <Button variant={"link"}>
            <CirclePlus className="size-5 xl:size-8" />
          </Button>
        </Link>
      </div>

      <div>
        {isLoggedIn ? (
          <Button
            variant={"link"}
            className="text-muted hover:no-underline flex items-center gap-2"
            onClick={handleLogout}
          >
            Logout
            <LogOut className="size-5 xl:size-8" />
          </Button>
        ) : (
          <Link href="/sign-in">
            <Button variant={"link"} className="text-xl">
              SignIn
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieListHeader;
