import React from 'react'
import axios from 'axios';



  export const Delete = (props) => {

    const handleDelete=(event)=>{
      deleteArtwork(props.location.param1);
    }

    const deleteArtwork=(id)=>{
      axios.delete(`https://localhost:3000/gallery/${id}`)
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
