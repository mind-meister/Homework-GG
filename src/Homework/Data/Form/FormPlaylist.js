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
          <h4>Create Playlist</h4>
        </div>

        <div>

          <div>
            <p>Title</p>
            <input
              minLength={10}
              type="text"
              name="title"
              value={playlist.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <p>Description</p>
            <textarea
              type="text"
              name="description"
              value={playlist.description}
              onChange={handleChange}>
              </textarea>
          </div>
        </div>

        <div>
          <input type="submit" value={"Submit"} />
        </div>

      </div>
    </form>
    </>
  );
}

export default FormPlaylist;
