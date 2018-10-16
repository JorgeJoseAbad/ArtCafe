import React from 'react'

export const Gallery = (props) =>{
  console.log(props)
    let match = props.match;
    console.log(match);
   return(
        <div className="page">
          <pre>{props.title}</pre>
          <img alt="AltHomer" src="https://instagram.fmad3-6.fna.fbcdn.net/vp/e2831892fe54726bc725854514d818bb/5C4D2598/t51.2885-15/sh0.08/e35/s640x640/43438078_333374877223205_9014798235918047786_n.jpg"/>
        </div>
   )
}
