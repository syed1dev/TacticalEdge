import connectDB from "@/lib/dbConnect";
import Movie from "@/schema/movie-schema";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  const movieId = params.movieId;
  await connectDB();
  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" });
    }
    return NextResponse.json({
      movie,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "Error fetching movies", status: 500 });
  }
  //   return NextResponse.json({ message: "dynamic api route" });
}
