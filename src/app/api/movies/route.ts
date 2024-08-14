import connectDB from "@/lib/dbConnect";
import Movie from "@/schema/movie-schema";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const skip = (page - 1) * limit;
  await connectDB();
  try {
    const movies = await Movie.find().skip(skip).limit(limit).lean();
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);
    return NextResponse.json({
      Total_Movies: totalMovies,
      totalPages,
      page,
      limit,
      movies,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "Error fetching movies", status: 500 });
  }
}
