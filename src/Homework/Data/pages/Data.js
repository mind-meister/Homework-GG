import { Button } from "@mui/material"

const Data = ({ artist, track, url,album,statusSelect, uri,isSelected}) => {

    return(
    <div className='container-tracks'>
      <div className='tracks'>

        <div className="image-tracks">
          <img src={url} alt={"...."} />
        </div>

        <div className="text-tracks">
          <h2>{artist}</h2>
          <h3>{track}</h3>
          <h4>{album}</h4>

            
            <div className="button-tracks">
            <Button variant="contained" onClick={()=>{statusSelect(uri)}}> {isSelected? 'Deselect' : 'Select'} </Button>
            </div>


            
        </div>

        


      </div>
    </div>
  
    )
  }

  export default Data