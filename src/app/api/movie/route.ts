import connectDB from "@/lib/dbConnect";
import Movie from "@/schema/movie-schema";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const POST = async (req: Request) => {
  await connectDB();
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const publishedYear = formData.get("publishedYear");

    if (!file || !name) {
      return NextResponse.json(
        { error: "No file or title received." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(process.cwd(), "public/assets", fileName);

    fs.writeFileSync(filePath, buffer);

    const movie = new Movie({
      name,
      publishedYear,
      posterImage: `/assets/${fileName}`,
    });

    const newMovie = await movie.save();

    return NextResponse.json({
      message: "Success",
      status: 201,
      data: newMovie,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
