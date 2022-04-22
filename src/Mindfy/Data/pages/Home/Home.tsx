import React, { useEffect, useState } from 'react';
import FormPlaylist from '../../components/Form/FormPlaylist';
import Search from '../../components/Search/Search';
import Logout from '../../components/Logout/Logout';
import Tracks from '../../components/Tracks/Tracks';
import { Track } from '../../types/globalInterface';

const Home: React.FC = () =>{
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [isInSearch, setIsInSearch] = useState<boolean>(false);
  const [messageTracks, setMessageTracks] = useState<string>('Tracks Not Found');

  useEffect(() => {
    if (!isInSearch) {
      const selectedTracks: Track[] = filterSelectedTracks();
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri]);

  const filterSelectedTracks: () => Track[] = () =>
    tracks.filter((track) => selectedTracksUri.includes(track.uri));

  const handleSearch: (searchTracks: Track[]) => void = (searchTracks) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track: Track) =>
      selectedTracksUri.includes(track.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };

  const handleClearSearch: () => void = () => {
    setTracks(selectedTracks);
    setMessageTracks('No Tracks Found');
    setIsInSearch(false);
  };

  const handleSelected: (track: Track) => void = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item: string) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item: Track) => item.uri !== uri));
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
              // duration={track.duration_ms}
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
