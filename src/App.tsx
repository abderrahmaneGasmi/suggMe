import React, { useState } from "react";
import "./App.css";
import ComboBox from "./components/AutoComplete";
import { IMovie } from "./assets/movies";
import { sendMovies } from "./api/movies";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const [selectedmovie, setSelectedmovie] = useState<IMovie>({} as IMovie);
  const [Recomandadmovies, setRecomandadmovies] = useState([] as IMovie[]);
  const addMovie = () => {
    if (selectedmovie === null) return;
    if (selectedmovie?.title === "") return;

    if (movies.find((movie) => movie.title === selectedmovie?.title)) return;
    setMovies([...movies, selectedmovie]);
    setSelectedmovie({} as IMovie);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-gray-800 text-white text-center p-4">
          <h1 className="text-2xl">SuggME</h1>
        </div>
        <div className="bg-gray-200 text-center p-4">
          <h1 className="text-2xl">
            Welcome to SuggME, a simple suggestion box to suggest movies based
            on your previous watch history.
          </h1>
        </div>
        <div className="h-10"></div>
        <div className="flex justify-center  w-full gap-4">
          <ComboBox
            setSelectedmovie={setSelectedmovie}
            selctedmovie={selectedmovie}
          />

          {/* add button  */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addMovie}
          >
            Add Movie
          </button>
        </div>
        <div className="h-10"></div>

        <div className="bg-gray-800 text-white text-center p-4 w-full">
          <h1 className="text-2xl">Selected Movies</h1>
        </div>
        <div className="flex justify-center flex-wrap">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col w-1/6 bg-gray-200 p-4 m-4 rounded-lg"
            >
              <img
                src={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                  movie.poster_path
                }
                alt="movie"
              />
              <h1 className="text-center text-xl">
                {movie.title.length > 20
                  ? `${movie.title.slice(0, 20)}...`
                  : movie.title}
              </h1>
            </div>
          ))}
        </div>
        {/* add button  */}
        {Recomandadmovies.length == 0 && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded self-center text-2xl"
            onClick={() => {
              sendMovies(movies).then((data) => {
                setRecomandadmovies(data);
              });
            }}
          >
            Generate Recommendations
          </button>
        )}

        <div className="h-10"></div>

        {Recomandadmovies.length > 0 && (
          <>
            {" "}
            <div className="bg-gray-800 text-white text-center p-4 w-full">
              <h1 className="text-2xl">
                Recomandad Movies based on your selctions
              </h1>
            </div>
            <div className="flex justify-center flex-wrap">
              {Recomandadmovies.map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col w-1/6 bg-gray-200 p-4 m-4 rounded-lg"
                >
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                      movie.poster_path
                    }
                    alt="movie"
                  />
                  <h1 className="text-center text-xl">
                    {movie.title.length > 20
                      ? `${movie.title.slice(0, 20)}...`
                      : movie.title}
                  </h1>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="h-10"></div>
      </div>
    </>
  );
}

export default App;
