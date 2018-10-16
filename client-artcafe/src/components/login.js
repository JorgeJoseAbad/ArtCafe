import React from 'react'
import axios from 'axios';

export const Login = (props) =>{
  console.log(props.match)

  function callBackEnd(){
    axios.get('http://localhost:3000/users')
    .then((res)=>console.log(res))
    .catch(error=>console.log(error));
  }

  function callBackEndPost(){
    let prueba='prueba';
    axios.post('http://localhost:3000/users',{prueba})
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  }

  function callBackEndPostParam(){
    let prueba='prueba';
    axios.post('http://localhost:3000/users/jorge',{prueba})
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  }


   return(
        <div className="page">
          <pre>{props.match.path}</pre>
          <button onClick={callBackEnd}>test get</button>
          <button onClick={callBackEndPost}>test post</button>
          <button onClick={callBackEndPostParam}>test post</button>
          <img alt="CarlosSainz" src="https://instagram.fmad3-6.fna.fbcdn.net/vp/e2831892fe54726bc725854514d818bb/5C4D2598/t51.2885-15/sh0.08/e35/s640x640/43438078_333374877223205_9014798235918047786_n.jpg"/>
        </div>
   )
}
