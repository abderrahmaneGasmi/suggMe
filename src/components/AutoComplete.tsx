import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IMovie, movies } from "../assets/movies";

export default function ComboBox({
  setSelectedmovie,
  selctedmovie,
}: {
  setSelectedmovie: React.Dispatch<React.SetStateAction<IMovie>>;
  selctedmovie: IMovie;
}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      className="bg-gray-300 "
      options={movies}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      getOptionLabel={(option) => option.title || ""}
      onChange={(_, value) => {
        setSelectedmovie(value || ({} as IMovie));
      }}
      value={selctedmovie}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
