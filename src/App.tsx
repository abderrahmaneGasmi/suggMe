import React, { useState } from "react";
import "./App.css";
import ComboBox from "./components/AutoComplete";
import { IMovie } from "./assets/movies";
import { sendMovies } from "./api/movies";
import { take1decimals } from "./assets/functions";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const [selectedmovie, setSelectedmovie] = useState<IMovie>({} as IMovie);
  const [loading, setLoading] = useState(false);
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
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
              className="flex flex-col w-1/6 bg-gray-200 m-4 rounded-2xl relative overflow-hidden shadow-lg"
            >
              <div
                className="absolute top-2 right-2 px-2 py-4 text-white rounded-full cursor-pointer text-lg font-bold hover:text-red-700 bg-red-500 hover:bg-red-400"
                onClick={() => {
                  setMovies(movies.filter((m) => m.title !== movie.title));
                }}
              >
                <svg
                  width="20"
                  height="5"
                  viewBox="0 0 200 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M200 12C200 15.1826 198.736 18.2348 196.485 20.4853C194.235 22.7357 191.183 24 188 24H12C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0H188C191.183 0 194.235 1.26428 196.485 3.51472C198.736 5.76515 200 8.8174 200 12Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <img
                src={
                  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                  movie.poster_path
                }
                alt="movie"
              />
              <div
                className="absolute bottom-0 w-full p-2 flex flex-col gap-1"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0,0.8) 0%,rgba(0, 0, 0,0.4) 60%, rgba(0, 0, 0, 0) 100%)",
                }}
              >
                <h1 className="text-2xl font-bold text-white">
                  {movie.title.length > 20
                    ? `${movie.title.slice(0, 20)}...`
                    : movie.title}
                </h1>
                <div className="flex items-center gap-1">
                  <div className="text-yellow-500">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 9 9"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.953 0.787995C4.91274 0.70182 4.84874 0.628917 4.7685 0.57784C4.68826 0.526764 4.59512 0.499634 4.5 0.499634C4.40489 0.499634 4.31174 0.526764 4.23151 0.57784C4.15127 0.628917 4.08726 0.70182 4.047 0.787995L3.08 2.84999L0.926002 3.17999C0.83517 3.19384 0.749908 3.23244 0.679579 3.29157C0.60925 3.3507 0.556573 3.42806 0.527332 3.51516C0.498091 3.60227 0.493416 3.69574 0.513821 3.78533C0.534226 3.87492 0.578922 3.95715 0.643001 4.02299L2.217 5.63599L1.844 7.92C1.82883 8.01269 1.84007 8.10779 1.87644 8.19439C1.91281 8.28099 1.97285 8.3556 2.04966 8.40966C2.12647 8.46372 2.21696 8.49505 2.31076 8.50006C2.40455 8.50508 2.49787 8.48356 2.58 8.43799L4.5 7.376L6.421 8.43799C6.50322 8.48365 6.59664 8.5052 6.69055 8.50016C6.78446 8.49512 6.87504 8.4637 6.9519 8.4095C7.02875 8.3553 7.08877 8.28053 7.12505 8.19377C7.16133 8.107 7.1724 8.01177 7.157 7.91899L6.784 5.63599L8.358 4.02299C8.42236 3.95718 8.46731 3.87487 8.48788 3.78514C8.50845 3.69541 8.50384 3.60174 8.47458 3.51446C8.44531 3.42718 8.39252 3.34967 8.32201 3.29048C8.25151 3.23129 8.16603 3.19271 8.075 3.17899L5.922 2.84999L4.953 0.787995Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h1 className=" text-sm font-bold text-white">
                    {take1decimals(movie.vote_average)}
                  </h1>
                  <h1 className=" text-sm font-bold text-gray-300">
                    | {movie.genres}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* add button  */}
        {!loading && (
          <button
            className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded self-center text-2xl"
            onClick={() => {
              if (Recomandadmovies.length === 0) {
                setLoading(true);
                sendMovies(movies).then((data) => {
                  setRecomandadmovies(data);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                });
              } else setRecomandadmovies([]);
            }}
          >
            {Recomandadmovies.length == 0
              ? "Generate Recommendations"
              : "Regenerate Recommendations"}
          </button>
        )}

        <div className="h-4"></div>
        {loading && (
          <div className="flex justify-center flex-wrap">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col w-1/6 bg-gray-400 p-4 m-4 rounded-lg animate-pulse"
                >
                  <div className="bg-gray-600 w-full h-64"></div>
                  <div className="bg-gray-600 w-1/2 h-6 mt-2"></div>
                </div>
              ))}
          </div>
        )}
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
