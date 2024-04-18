import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
});
export const sendMovies = async (body: unknown) => {
  const response = await client.post("/movies", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
