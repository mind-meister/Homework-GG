import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../Redux/Store/user';
import './Logout.css';

const Logout: React.FC  = () => {
  const dispatch = useDispatch();
  
  const logout: () => void = () => {
    dispatch(removeToken());
    window.localStorage.removeItem('token');
  };
  
  return (
    <nav className='nav-logout'>
      
      <div className='button-logout'>
        <Button
          size='small'
          sx={{ width: 'auto', textAlign: 'center', background: '#4caf50', borderRadius:2  }}
          type='submit'
          variant='contained'
          onClick={logout}
          >
          Logout
        </Button>
      </div>
          <div>
            <h2>Welcome To Mindfy</h2>
            <p>Create Your Playlist</p>
          </div>
    </nav>
  );
};

export default Logout;
