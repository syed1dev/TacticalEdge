"use client";
import MovieListHeader from "@/components/movie/movie-list-header";
import Movies from "@/components/movie/movies";
import Pagination from "@/components/Pagination";

import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { getMovies } from "@/services/movie";
import { IMovie, IMoviesResponseType } from "@/types/movie-type";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [data, setData] = useState<IMoviesResponseType>();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await getMovies(currentPage);

      if (response) {
        setData(response);
        setCurrentPage(response.page);
      }
    } catch (error) {
      toast.error("failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, fetchMovies]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container">
      <>
        <MovieListHeader />
        {data && data.movies.length > 0 ? (
          <>
            <Movies data={data?.movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="text-center">
              <Title text="Your movies list is empty" />
              <Link href="/movie">
                <Button className="mt-6 text-muted">Add a new movie</Button>
              </Link>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
