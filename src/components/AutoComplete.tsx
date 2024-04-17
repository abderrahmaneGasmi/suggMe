import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IMovie } from "../assets/movies";
import { searchMovie } from "../assets/functions";
// import fs
export default function ComboBox({
  setSelectedmovie,
  selctedmovie,
}: {
  setSelectedmovie: React.Dispatch<React.SetStateAction<IMovie>>;
  selctedmovie: IMovie;
}) {
  const [moviesinputs, setmoviesinputs] = React.useState([] as IMovie[]);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      className="bg-gray-300 "
      options={moviesinputs}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      ChipProps={{}}
      getOptionLabel={(option) => option.title || ""}
      onInputChange={(_, value) => {
        setmoviesinputs(searchMovie(value));
      }}
      onChange={(_, value) => {
        setSelectedmovie(value || ({} as IMovie));
      }}
      value={selctedmovie}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
