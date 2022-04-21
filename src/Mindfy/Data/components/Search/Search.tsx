import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { searchTrack } from '../../API/api';
import { RootState } from '../../Redux/Store/store';
import { Track } from '../../types/globalInterface';

interface Props {
  handleSearch: (track: Track[]) => void;
  handleClearSearch: () => void;
}

const Search: React.FC<Props> = ({handleSearch, handleClearSearch}) => {
  const userToken = useSelector((state: RootState) => state.user.userToken);
  const [search , setSearch] = useState<string>('');
  const [clearSearch, setclearSearch] = useState<boolean>(true);

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await searchTrack(search, userToken);
      const tracks = response.tracks.items;
      handleSearch(tracks);
      setclearSearch(false);
    } catch (error) {
        console.log(error, 'Error Search');
    }
  };
  const handleChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLTextAreaElement;
    setSearch(target.value);
  };
  const handleClear = () => {
    handleClearSearch();
    setSearch('');
    setclearSearch(true);
  };
  return (
    <>
        {userToken ? (
          <div className='tombol-search'>
          <form onSubmit={handleSubmit}>
            <Box p={1}>
          <TextField variant='standard' style={{width:300, height:30, background:'white',borderRadius:10}} onChange={handleChange} type='text' placeholder='Input Song Name' />
          <Button type='submit' variant='contained' sx={{ width: 100, height: 30, textAlign: 'center', background:'#4caf50', marginLeft:2, borderRadius:3}} placeholder='Search tracks'>Search</Button>
          </Box>
          </form>
        </div>
        ) : ( 
          ''
        )};
      {!clearSearch && (
        <div className='clear-search'>

        <Box p={1}>
          <Button size='small' sx={{ width: 210, textAlign: 'center', borderRadius:3, background:'#4caf50' }} onClick={handleClear} variant='contained'>Clear search</Button>
        </Box>
        </div>
      )};
    </>
  );
};

export default Search;

