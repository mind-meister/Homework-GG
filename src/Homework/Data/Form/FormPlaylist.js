import { Button, FormControl, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../Redux/Store";

function FormPlaylist({urisTrack}) {
  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user.user);
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

      if (urisTrack.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(userToken, user.id, {
            name: playlist.title,
            description: playlist.description,
          });

          await addTracksToPlaylist(userToken, responseCreatePlaylist.id, urisTrack);
          
          alert('Playlist created successfully');
          setPlaylist({ title: '', description: '' });
        } catch (error) {
          console.log(error, "Erorr");
        }
      } else {
        console.log('Please select at least one track');
      }
    
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <div>

          <Box p={1} width="100%">
          <FormControl>
            <h3>
              Create A New playlist
            </h3>
          
            <p>Playlist Title</p>
            <TextField
              minLength={10}
              type="text"
              name="title"
              value={playlist.title}
              onChange={handleChange}
              required
              />
          
            <p>Description</p>
            <TextareaAutosize
              type="text"
              name="description"
              value={playlist.description}
              onChange={handleChange}
              style={{ width: 210 }}
              minRows={3}
              >
              </TextareaAutosize>
              </FormControl>
              </Box>
        </div>

        <Box  p={1} width="100%">
          <Button size="small" sx={{ width: 210, textAlign: "center", borderRadius:10, background:"#4caf50" }} type="submit" variant="contained">Submit</Button>
        </Box>

      </div>
    </form>
    </>
  );
}

export default FormPlaylist;
