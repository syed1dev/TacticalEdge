import axios from "@/lib/axios";

export async function getMovies(page: number) {
  try {
    const response = await axios.get(`/movies?page=${page}&limit=4`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function createNewMovie(data: FormData) {
  try {
    const response = await axios.post("/movie", data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getMovie(id: string) {
  try {
    const response = await axios.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateMovie(movieId: string, formData: FormData) {
  try {
    const response = await axios.put(`/edit/${movieId}`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
}
