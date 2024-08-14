import { getMovie } from "@/services/movie";
import { IMovie } from "@/types/movie-type";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const useGetMovie = (id: string) => {
  const [movie, setMovie] = useState<IMovie | null>(null);

  const fetchMovie = useCallback(async () => {
    try {
      const response = await getMovie(id);
      setMovie(response.movie);
    } catch (error) {
      toast.error("failed to fetch movie");
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [id, fetchMovie]);
  return { movie };
};

export default useGetMovie;
