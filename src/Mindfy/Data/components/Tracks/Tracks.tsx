import React, { useState } from 'react';
import { Button } from '@mui/material';
import './tracks.css';

interface Props {
  url: string;
  track: string;
  artist: string;
  album: string;
  duration: number;
  isSelected: boolean;
  statusSelect: () => void;
}

const Tracks: React.FC<Props> = ({ artist, track, url,album,statusSelect,isSelected,duration}) => {
  const [selected, setSelected] = useState<boolean>(isSelected);

  const handleSelect: () => void = () => {
    setSelected(!selected);
    statusSelect();
  };

    return(
    <div className='container-tracks'>
      <div className='tracks'>

        <div className='image-tracks'>
          <img src={url} alt={'....'} />
        </div>

        <div className='text-tracks'>
          <h2>{artist}</h2>
          <h3>{track}</h3>
          <h4>{album}</h4>
          <h4>{duration}</h4>

            <div className='button-tracks'>
            <Button variant='contained' onClick={handleSelect}> {selected ? 'Deselect' : 'Select'} </Button>
            </div>

        </div>

      </div>

    </div>
  
    );
  };

  export default Tracks;