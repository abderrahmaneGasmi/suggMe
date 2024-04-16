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
        <div className="h-20"></div>
        <div className="flex justify-center  w-full gap-4">
          <ComboBox />

          {/* add button  */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Movie
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
