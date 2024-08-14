"use client";
import React from "react";
import MovieCard from "@/components/movie/movie-card";
import { IMovie } from "@/types/movie-type";
// import Pagination from "../Pagination";

interface IMovies {
  data: IMovie[];
}

const Movies = ({ data }: IMovies) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-8 mt-20">
        {data.map((item: IMovie) => (
          <MovieCard item={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default Movies;
