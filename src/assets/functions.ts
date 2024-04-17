import { IMovie, movies, moviestitles } from "./movies";

export const searchMovie = (movie: string) => {
  if (movie.length < 3) return [];
  const returnedmovies = [] as IMovie[];
  for (let i = 0; i < movies.length; i++) {
    const element = moviestitles[i];
    const titlestriped = element.split(" ").join("").split(":").join("");
    const moviestriped = movie.split(" ").join("").split(":").join("");
    if (titlestriped.toLowerCase().includes(moviestriped.toLowerCase())) {
      returnedmovies.push(movies[i]);
    }
    if (returnedmovies.length > 10) return returnedmovies;
  }
  return returnedmovies;
};
