import React, { useEffect, useState } from 'react';
import FormPlaylist from '../../components/Form/FormPlaylist';
import Search from '../../components/Search/Search';
import Logout from '../../components/Logout/Logout';
import Tracks from '../../components/Tracks/Tracks';

const Home: React.FC = () =>{
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const [isInSearch, setIsInSearch] = useState<boolean>(false);
  const [messageTracks, setMessageTracks] = useState<string>('Tracks Not Found');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const handleSearch: (searchTracks: any[]) => void = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track: any) =>
      selectedTracksUri.includes(track.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const handleClearSearch: () => void = () => {
    setTracks(selectedTracks);
    setMessageTracks('No Tracks Found');
    setIsInSearch(false);
  };

  const handleSelected: (track: any) => void = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item: any) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item: any) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };
  return (
    <>
    <Logout />
    <FormPlaylist urisTrack={selectedTracksUri} />
      <Search
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      
      <div className='home-container'>
      {tracks.length === 0 && <p>{messageTracks}</p>}
      </div>
      {tracks.map((track) => {
        return (
          <>
            <Tracks
              key={track.id}
              track={track.name}
              album={track.album.name}
              artist={track.album.artists[0].name}
              url={track.album.images[0].url}
              statusSelect={() => handleSelected(track)}
              isSelected={selectedTracksUri.includes(track.uri)}
              />
          </>
        );
      })}
    </>
  );
};

export default Home;
