import axios from 'axios';
import React, { useState } from 'react'
import url from './Auth/auth';
import "./index.css"


const Data = ({ artist, track, url, webp, releaseDate}) => (
  <div className='depan'>
    <div className='bagan'>
    <img src={url} />
    <h2>{artist}</h2>
    <h3>{track}</h3>
    <h4>{releaseDate}</h4>
    <a className='tanda' href={webp}>Link</a>
    </div>
  </div>
);



function Module3Session1() {
  const [search , setSearch] = useState("")
  const [tracks , setTrack] = useState([])

  function getQueryParams(string) {
    const queries = string.substring(1).split('&');
    const finalObj = {};
    queries.forEach(query=>{
        const arr = query.split('=');
        if(arr.length > 1 )
            finalObj[arr[0]] = arr[1]
    })
    return finalObj;
}
const query = getQueryParams(window.location.hash)

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  const handleSubmit = () => {
    axios.get('https://api.spotify.com/v1/search?',{
      headers: {
        Authorization: `Bearer ${query.access_token}`
      },
      params: {
        q: search,
        type : "track",
        limit: 10
      }
    })
    .then((res) => {
      const item = res.data.tracks.items
      setTrack(item)
    })
  }



  return (
    <>
        <div className='login-container'>
        <a className='login' href={url}>Login</a>
        </div>
        <div className='tombol-search'>
        <input className='cari' onChange={handleChange} type="text"/>
        <input className='tombol' type="submit" onClick={handleSubmit} />
        </div>
        {tracks.map((data) => 
        <Data track={data.album.name} artist={data.album.artists[0].name}
        releaseDate = {data.album.release_date}
        url={data.album.images[0].url}
        webp={data.album.external_urls.spotify}
        />
        )}
    </>
  )
}

export default Module3Session1