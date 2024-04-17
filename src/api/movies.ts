import axios from "axios";
import { IMovie } from "../assets/movies";

const client = axios.create({
  baseURL: "http://localhost:5000",
});
export const sendMovies = async (movies: IMovie[]) => {
  const response = await client.post("/movies", movies, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
