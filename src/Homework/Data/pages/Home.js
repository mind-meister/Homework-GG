import React, { useEffect, useState } from "react";
import FormPlaylist from "../Form/FormPlaylist";
import Data from "./Data";
import Search from "./Search";

function Home() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [messageTracks, setMessageTracks] = useState("Tracks Not Found");

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const handleSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) =>
      selectedTracksUri.includes(track.uri)
    );

    setTracks(() => {
      const onTracks = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (onTracks.length === 0) {
        setMessageTracks(`No tracks found with query "${query}"`);
      } else {
        setMessageTracks("");
      }

      return onTracks;
    });
  };

  const handleClearSearch = () => {
    setTracks(selectedTracks);
    setMessageTracks("No Tracks Found");
    setIsInSearch(false);
  };

  const handleSelected = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };
  return (
    <>
      <FormPlaylist urisTrack={selectedTracksUri} />

      <Search
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      
      <div>
      {tracks.length === 0 && <p>{messageTracks}</p>}
      </div>
      {tracks.map((track, index) => {
        const status = selectedTracksUri.find((selectedUri) => selectedUri === track.uri);
        return (
          <>
            <Data
              key={index}
              track={track.name}
              album={track.album.name}
              artist={track.album.artists[0].name}
              url={track.album.images[0].url}
              statusSelect={() => handleSelected(track)}
              isSelected={status}
              uri={track.uri}
            />
          </>
        );
      })}
    </>
  );
}

export default Home;
