import React from 'react'

export const Gallery = (props) =>{
  console.log(props)
    let match = props.match;
    console.log(match);
   return(
        <div className="page">
          <pre>{match.params.name}</pre>
          <img alt="AltHomer" src="https://www.lifewire.com/thmb/vDB3ply4rHJG_BDWeD0AbuRu-EU=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simpsons_09_Homer_V2F_hires1-56e1eccc5f9b5854a9f89a63.jpg"/>
        </div>
   )
}
