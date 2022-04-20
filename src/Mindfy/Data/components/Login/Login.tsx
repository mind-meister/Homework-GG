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
        <div className='login-container'>
          <h2>Login With Spotify</h2>
          <Button size='small' sx={{ width: 'auto', textAlign: 'center', borderRadius:2 , background:'#4caf50' }} type='submit' variant='contained' className='login' href={getSpotifykAuthorize()}>
            Login
          </Button>
        </div>
        </nav>

        <div className='container-isi'>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus a nemo laudantium perferendis eveniet atque voluptates, sequi molestiae dignissimos. Ut blanditiis veniam sapiente vel nobis quasi fugit totam. Fugiat, animi?</h1>
        </div>
    </>
  );
};

export default Login;
