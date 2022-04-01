import { useState } from "react"

const Data = ({ artist, track, url, releaseDate,album,statusSelect, click, unclick, id}) => {
    const [tombol, setTombol] = useState(statusSelect)

    const handleClick = () =>{
      setTombol(!tombol)

      if (tombol) {
        unclick(id)
      } else {
        click(id)
      }
    }
  
  
    return(
    <div className='depan'>
      <div className='bagan'>
      <img src={url} />
      <h2>{artist}</h2>
      <h3>{track}</h3>
      <h3>{album}</h3>
      <h4>{releaseDate}</h4>
      <button id={id} onClick={handleClick}>
            {!tombol ? 'Select' : 'Deselect'}
        </button>
      </div>
    </div>
  
    )
  }

  export default Data