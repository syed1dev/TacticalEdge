import { IMovie } from "@/types/movie-type";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { FilePenLine } from "lucide-react";
import Link from "next/link";

interface IMovieCard {
  item: IMovie;
}

const MovieCard = ({ item }: IMovieCard) => {
  return (
    <div className="overflow-hidden rounded-lg bg-secondary p-2">
      <div className="relative h-[21rem] w-full rounded-lg overflow-hidden">
        <Image src={item.posterImage} alt="movie-1" fill />
      </div>
      <div className="text-xs my-4 flex items-center justify-between">
        <div>
          <p className="mb-1">{item.name}</p>
          <div>{item.publishedYear}</div>
        </div>
        <Link href={`/movie/${item._id}`}>
          <Button variant={"link"}>
            <FilePenLine size="20" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
