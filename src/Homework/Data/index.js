import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import url from './Auth/auth';
import { getUserProfile } from './Form';
import FormPlaylist from './Form/FormPlaylist';
import "./index.css"
import Data from './pages/Data';
import Login from './pages/Login';
import Search from './pages/Search';
import { setUserToken } from './Redux/Store/user';


function Homework() {
  const [search , setSearch] = useState("")
  const [tracks , setTrack] = useState([])
  const [selected, setSelected] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  
  const dispatch = useDispatch();
  const user_token = useSelector(state => state.user.user_token);
  const [setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get("#access_token");
    setAccessToken(accessToken);
    setUserToken(accessToken !== null);

    if (accessToken !== null) {
      setAccessToken(accessToken);
      setUserToken(accessToken !== null);

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
    window.location.hash = "";

    // AMBIL TOKEN
    if(!user_token && hash) {
      const token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", token);
      dispatch(setUserToken(token))
    }}, [user_token, dispatch]
    );

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
        Authorization: `Bearer ${user_token}`
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
        <div>
          
        <Login
        token={user_token}
        logout={logout}
        url={url}
        />
        </div>

        <div>
        <Search
        token={user_token}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
        </div>

        <div>
        <FormPlaylist 
        accessToken={accessToken}
        userId={user.id}
        uris={selected} />
        </div>

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

export default Homework