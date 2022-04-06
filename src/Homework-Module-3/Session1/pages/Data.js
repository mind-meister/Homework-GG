import { useState } from "react"

const Data = ({ artist, track, url, releaseDate,album,statusSelect, uri,isSelected, id}) => {


  
    return(
    <div className='depan'>
      <div className='bagan'>
      <img src={url} />
      <h2>{artist}</h2>
      <h3>{track}</h3>
      <h3>{album}</h3>
      <h4>{releaseDate}</h4>
      <button id={id} onClick={()=>{statusSelect(uri)}}> {isSelected? 'Deselect' : 'Select'}
        </button>
      </div>
    </div>
  
    )
  }

  export default Data