import React from 'react'
import data from './data/data';
import "./warna.css"


const Data = ({ artist, track, url, webp, releaseDate}) => (
    <div className='container'>
      <div className='kartu'>
      <img src={url} />
      <h2>{artist}</h2>
      <h3>{track}</h3>
      <h4>{releaseDate}</h4>
      <a href={webp}>Link</a>
      </div>
    </div>
  );

function Session3() {
  return (
    <>
        {data.map((data) => 
        <Data track={data.album.name} artist={data.album.artists[0].name}
        releaseDate = {data.album.release_date}
        url={data.album.images[0].url}
        webp={data.album.external_urls.spotify}
         />
        )}
    </>
  )
}

export default Session3