import { Button } from '@mui/material';
import React, { useState } from 'react';
import { addTracksPlaylist, createPlaylist } from '../../API/api';
import { RootState, useAppSelector } from '../../Redux/Store/store';
import './FormPlaylist.css';
import swal from 'sweetalert';

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


      if (playlist.title.length > 10 ){
        if (urisTrack.length > 0) {
          try {
            const responseCreatePlaylist = await createPlaylist(userToken, user, {
              name: playlist.title,
              description: playlist.description,
            });
  
            await addTracksPlaylist(userToken, responseCreatePlaylist.id, urisTrack);
            
            setPlaylist({ title: '', description: '' });
            swal({
              text: 'Playlist created successfully',
              icon: 'success',
              timer: 3000,
            });
          } catch (error) {
            swal({
              text: 'Error',
              icon: 'danger',
              timer: 3000,
            });
          }
        } else {
          swal({
            text: 'Please select at least one track',
            icon: 'warning',
            timer: 3000,
          });
        } 
      } else {
        swal({
          text: 'Title must be at least 10 characters long',
          icon: 'warning',
          timer: 3000,
        });
      }

    
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <div className='container-form'>
            <h2>
              Create A New Playlist
            </h2>
          
            <p>Playlist Title</p>
            <input
              min-length={10}
              type='text'
              name='title'
              value={playlist.title}
              aria-label="input-title"
              onChange={handleChange}
              data-testid="form-input"
              required
              />
          
            <p>Description</p>
            <textarea
              name='description'
              value={playlist.description}
              onChange={handleChange}
              data-testid="form-description"
              >
              </textarea>
        </div>

        <div className='button-form'>
          <Button variant='contained' type='submit'>SUBMIT</Button>
        </div>

      </div>
    </form>
    </>
  );
};

export default FormPlaylist;
