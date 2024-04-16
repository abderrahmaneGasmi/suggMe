import { useState } from "react";
import "./App.css";
import ComboBox from "./components/AutoComplete";

function App() {
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
          <ComboBox />

          {/* add button  */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Movie
          </button>
        </div>
        <div className="h-10"></div>

        <div className="bg-gray-800 text-white text-center p-4 w-full">
          <h1 className="text-2xl">Selected Movies</h1>
        </div>
        <div className="flex justify-center flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col w-1/6 bg-gray-200 p-4 m-4 rounded-lg"
            >
              <img src="https://via.placeholder.com/150" alt="movie" />
              <h1 className="text-center text-xl">Movie Name</h1>
            </div>
          ))}
        </div>
        {/* add button  */}
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded self-center text-2xl">
          Generate Recommendations
        </button>
        <div className="h-4"></div>
      </div>
    </>
  );
}

export default App;
