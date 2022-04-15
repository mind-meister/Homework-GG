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
          <input className="cari" onChange={handleChange} type="text" />
          <input type="submit" value={"Submit"} />
          </form>
        </div>
        ) : ( 
          ""
        )}
      {!clearSearch && (
        <button variant="text" onClick={handleClear} className="mt-1">Clear search</button>
      )}
    </>
  );
}

export default Search;

