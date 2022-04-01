import axios from 'axios';
import React, { useState } from 'react'
import url from './Auth/auth';
import "./index.css"
import Data from './pages/Data';


function Module3Session1() {
  const [search , setSearch] = useState("")
  const [tracks , setTrack] = useState([])
  const [selectedTrack, setSelectedTrack] = useState([]);

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

const addData = (id) => {
    const selectedSong = selectedTrack;
    selectedSong.push(id);
    setSelectedTrack(selectedSong);
}

const removeData = (id) => {
    const selectedSong = selectedTrack;
    for (let i = 0; i < selectedTrack.length; i++) {
        if (selectedTrack[i] === id) {
            selectedSong.splice(i, 1);
        }
    }
    setSelectedTrack(selectedSong);
}

const statusData = (id) => {
    let status = false;
    for (let i = 0; i < selectedTrack.length; i++) {
        if (selectedTrack[i] === id) {
            status = true;
        }
    }
    return status;
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
        <div>
        {tracks.map((data) => {
          const status = statusData(data.uri);
          return(
            <Data 
            key = {data.uri}
            track={data.name} 
            album={data.album.name} 
            artist={data.album.artists[0].name}
            releaseDate = {data.album.release_date}
            url={data.album.images[0].url}
            id={data.uri}
            statusSelect={status}
            click={addData}
            unclick={removeData}
            />
          )
          }
          )
        }
        </div>
        
    </>
  )
}

export default Module3Session1