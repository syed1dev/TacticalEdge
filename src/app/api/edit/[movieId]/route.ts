import connectDB from "@/lib/dbConnect";
import Movie from "@/schema/movie-schema";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export async function PUT(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  const movieId = params.movieId;
  await connectDB();
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const publishedYear = formData.get("publishedYear");

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" });
    }

    if (name) movie.name = name;
    if (publishedYear) movie.publishedYear = publishedYear;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExtension = path.extname(file.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(process.cwd(), "public/assets", fileName);

      fs.writeFileSync(filePath, buffer);
      movie.posterImage = `/assets/${fileName}`;
    }

    const updatedMovie = await movie.save();
    return NextResponse.json({
      message: "Movie updated successfully.",
      status: 200,
      data: updatedMovie,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "Error fetching movies", status: 500 });
  }
}
