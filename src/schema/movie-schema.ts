import mongoose, { Document, Schema } from "mongoose";

interface IMovie extends Document {
  name: string;
  publishedYear?: number;
  posterImage: string;
}

const MovieSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: false,
  },
  posterImage: {
    type: String,
    required: true,
  },
});

const Movie =
  mongoose.models.Movie || mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
