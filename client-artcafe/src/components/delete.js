import React from 'react'
import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

  export const Delete = (props) => {

    const handleDelete=(event)=>{
      deleteArtwork(props.location.param1);
    }

    const deleteArtwork=(id)=>{
      axios.delete(`${apiUrl}/gallery/${id}`)
      .then((res)=>{console.log(res)}
      )
      .catch(e=>console.log(e))
    }

   return(
     <div>
       <div>You are deleted an artwork, stupid!!!</div>
       <button type="button" onClick={handleDelete}>Delete It</button>
     </div>
   )

  }
