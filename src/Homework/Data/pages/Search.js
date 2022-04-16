import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from "../Redux/Store";

function Search({handleSearch, handleClearSearch}) {
  const userToken = useSelector((state) => state.user.userToken);
  const [search , setSearch] = useState("")
  const [clearSearch, setclearSearch] = useState(true);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await searchTrack(search, userToken);
      const tracks = response.tracks.items;
      handleSearch(tracks, search);
      setclearSearch(false);
    } catch (error) {
        console.log(error, "Error Search");
    }
  }
  const handleChange = (e) =>{
    setSearch(e.target.value)
  }
  const handleClear = () => {
    handleClearSearch();
    setSearch("");
    setclearSearch(true);
  }
  return (
    <>
        {userToken ? (
          <div className="tombol-search">
          <form onSubmit={handleSubmit}>
          <TextField sx={{width: 300, height:100}} onChange={handleChange} type="text" />
          <Button type="submit" variant="contained" sx={{ width: 100, height: 55, textAlign: "center", background:"#4caf50" }} placeholder="Search tracks">Search</Button>
          </form>
        </div>
        ) : ( 
          ""
        )}
      {!clearSearch && (
        <Box p={1}>
          <Button size="small" sx={{ width: 210, textAlign: "center", borderRadius:10, background:"#4caf50" }} onClick={handleClear} variant="contained">Clear search</Button>
        </Box>
      )}
    </>
  );
}

export default Search;

