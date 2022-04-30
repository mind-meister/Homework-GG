import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../API/api';
import url from '../../Auth/auth';
import { setUserToken } from '../../Redux/Store/user';
import './Login.css';

const Login: React.FC= () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const userTokenParams = params.get('#access_token');

    if (userTokenParams !== null) {
      console.log(userTokenParams);
      const setUserProfile = async () => {
        try {
          const responseUser = await getUserProfile(userTokenParams);
          
          dispatch(
            setUserToken({
              userToken: userTokenParams,
              user: responseUser,
            })
          );
        } catch (error) {
          console.log(error, 'Error!');
        }
      };

      setUserProfile();
    }
  }, [dispatch]);

  const getSpotifykAuthorize: () => string = () => {
    const state = Date.now().toString();

    return `${url.SPOTIFY_AUTH_URL}?client_id=${url.API_URL_SPOTIFY}&response_type=${url.RESPONSE_TYPE}&redirect_uri=${url.REDIRECT_URI}&state=${state}&scope=${url.SPOTIFY_SCOPE}`;
  };


  return (
    <>
      <nav className='nav-login'>
        <div className='container-nav'>
          <h2>Mindfy</h2>
        </div>
        </nav>

        <div className='container-login'>
          <h2>Welcome to Mindfy!</h2>
          <p>This project is spotify playlist</p>
          <Button className='button-login' size='small' sx={{ width: 'auto', textAlign: 'center', borderRadius:3 , background:'#4caf50' }} type='submit' variant='contained' href={getSpotifykAuthorize()}>
            Login With Spotify
          </Button>

        </div>

        <div className='container-isi'>
          <p>Created by ©2022 Charles Prabowo</p>
        </div>
    </>
  );
};

export default Login;
