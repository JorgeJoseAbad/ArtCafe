import React from 'react'
import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

  export const Buy = (props) => {



  let artWorkPrice=props.location.param2.startBid;

  const getArtwork=()=>{
    axios.get(`${apiUrl}/gallery/${props.location.param1}`)
    .then((res)=>{
        artWorkPrice=res.data.startBid;

    })
    .catch(e=>console.log(e))
  }



    getArtwork();



    return (

        <div style={{
          fontSize: 30,
          color: '#080864',
          marginTop: 40,
          backgroundColor: '#e3b9b9'
        }}>
        {(props.location.param3&&props.location.param3!=='')?
            <b>Congratulations!, You have buy {props.location.param2.title} for {artWorkPrice}€</b>
            :
            <b>You must be logged to buy this artwork!!</b>
          }
        </div>

    )
}
