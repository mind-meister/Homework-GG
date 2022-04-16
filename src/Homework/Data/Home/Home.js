import React, { useEffect, useState } from 'react'
import FormPlaylist from '../Form/FormPlaylist';
import Data from '../pages/Data';
import Search from '../pages/Search';

function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrackURI, setSelectedTrackURI] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (!isSearch) {
      const selectedTracks = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTrackURI]);

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTrackURI.includes(track.uri));
  };

  const handleSuccessSearch = (searchTracks) => {
    setIsSearch(true);

    const selectedSearchTracks = searchTracks.filter((data) =>
      selectedTrackURI.includes(data.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const clearSearch = () => {
    setTracks(selectedTracks);
    setIsSearch(false);
  };

  // const toggleSelect = (track) => {
  //   const uri = track.uri;

    if (selectedTrackURI.includes(uri)) {
      setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
      setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
    } else {
      setSelectedTrackURI([...selectedTrackURI, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  // };
  return (
    <>
      <Search onSuccess={(tracks) => handleSuccessSearch(tracks)}
        onClearSearch={clearSearch} />

      <FormPlaylist uris={selectedTrackURI} />

      {tracks.map((data) => {
          const status = selectedTrackURI.find((selectedUri) => selectedUri === data.uri);
          return(
            <>
            <Data 
            key={data.id}
            track={data.name} 
            album={data.album.name} 
            artist={data.album.artists[0].name}
            releaseDate = {data.album.release_date}
            url={data.album.images[0].url}
            id={data.uri}
            statusSelect={selectedTrackURI}
            isSelected={status}
            uri = {data.uri}
            />
            </>
            )
          }
          )
        }
    </>
  )
}

export default Home