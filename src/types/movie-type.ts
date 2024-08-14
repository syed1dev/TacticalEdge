export interface IMovie {
  _id?: number;
  name: string;
  publishedYear?: number;
  posterImage: string;
}

export interface IMoviesResponseType {
  Total_Movies: number;
  totalPages: number;
  page: number;
  limit: number;
  movies: IMovie[];
}
