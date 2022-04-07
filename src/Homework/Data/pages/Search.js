import React from "react";

function Search({handleChange, handleSubmit, token}) {
  return (
    <>
      {token ? (
        <div className="tombol-search">
          <input className="cari" onChange={handleChange} type="text" />
          <input className="tombol" type="submit" onClick={handleSubmit} />
        </div>
      ) : (
        <h2>Please Login</h2>
      )}
    </>
  );
}

export default Search;
