import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from './Auth/auth';
import { getUserProfile } from './Form';
import FormPlaylist from './Form/FormPlaylist';
import "./index.css"
import Data from './pages/Data';


function Module3Session1() {
  const [search , setSearch] = useState("")
  const [tracks , setTrack] = useState([])
  const [selected, setSelected] = useState([]);
  const [token, setToken] = useState("");

  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get("#access_token");
    setAccessToken(accessToken);
    setToken(accessToken !== null);

    if (accessToken !== null) {
      setAccessToken(accessToken);
      setToken(accessToken !== null);

      const setUserProfile = async () => {
        try {
          const response = await getUserProfile(accessToken);

          setUser(response);
        } catch (e) {
          alert(e);
        }
      };

      setUserProfile();
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // AMBIL TOKEN
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const handleSubmit = () => {
    axios.get('https://api.spotify.com/v1/search?',{
      headers: {
        Authorization: `Bearer ${token}`
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


  const handleSelected = (uri) => {
    const alreadySelected = selected.find((selectedUri) => selectedUri === uri)
    if(alreadySelected) {
      const filteredTracks = selected.filter(
        (selectedUri) => selectedUri !== uri
      )
      setSelected(filteredTracks)
    } else {
      setSelected([...selected, uri])
    }
  }


  return (
    <>
        {!token ? (
        <div className='login-container'>
          <a className='login' href={url}>Login</a>
        </div>

        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
        <div className='tombol-search'>
          <input className='cari' onChange={handleChange} type="text"/>
          <input className='tombol' type="submit" onClick={handleSubmit} />
        </div>

        ) : (
            <h2>Please Login</h2>
        )}

        <FormPlaylist accessToken={accessToken}
            userId={user.id}
            uris={selected} />

        <div>
        {tracks.map((data) => {
          const status = selected.find((selectedUri) => selectedUri === data.uri);
          return(
            <>
            <Data 
            track={data.name} 
            album={data.album.name} 
            artist={data.album.artists[0].name}
            releaseDate = {data.album.release_date}
            url={data.album.images[0].url}
            id={data.uri}
            statusSelect={handleSelected}
            isSelected={status}
            uri = {data.uri}
            />
            </>
            )
          }
          )
        }
        </div>
        
        
        
    </>
  )
}

export default Module3Session1