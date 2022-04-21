import { Button, FormControl, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { addTracksPlaylist, createPlaylist } from '../../API/api';
import { RootState, useAppSelector } from '../../Redux/Store/store';

interface Props {
  urisTrack: string[];
}

interface Playlist {
  title: string;
  description: string;
}

const FormPlaylist: React.FC<Props> = ({ urisTrack }) => {
  const userToken: string = useAppSelector((state: RootState) => state.user.userToken);
  const user: string = useAppSelector((state: RootState ) => state.user.user.id);
  const [playlist, setPlaylist] = useState<Playlist>({
    title: '',
    description: '',
  });

  
  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setPlaylist({ ...playlist, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (playlist.title.length > 10) {
        try {
          const responseCreatePlaylist = await createPlaylist(userToken, user, {
            name: playlist.title,
            description: playlist.description,
          });

          await addTracksPlaylist(userToken, responseCreatePlaylist.id, urisTrack);
          
          alert('Playlist created successfully');
          setPlaylist({ title: '', description: '' });
        } catch (e) {
          alert('Please select at least one track');
        }
      } else {
        alert('Title must be at least 10 characters long.');
      }
    
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <div className='container-form'>

          <Box p={1} width='100%'>
          <FormControl>
            <h1>
              Create A New playlist
            </h1>
          
            <p>Playlist Title</p>
            <TextField
              min-length={10}
              type='text'
              name='title'
              variant='standard'
              value={playlist.title}
              aria-label="input-title"
              sx={{background:'white', width: 400, borderRadius:3}}
              onChange={handleChange}
              required
              />
          
            <p className='description-form'>Description</p>
            <textarea
              name='description'
              value={playlist.description}
              onChange={handleChange}
              style={{ width: 400, height:100 ,borderRadius:10 }}
              >
              </textarea>
              </FormControl>
              </Box>
        </div>

        <div className='button-form'>

        
        <Box p={1} width='100%'>
          <Button size='small' sx={{ width: 400, textAlign: 'center', borderRadius:3, background:'#4caf50' }} type='submit' variant='contained'>Submit</Button>
        </Box>
        </div>

      </div>
    </form>
    </>
  );
};

export default FormPlaylist;
