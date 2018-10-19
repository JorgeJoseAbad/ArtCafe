import React, { Component } from 'react'
import axios from 'axios';


export class Logout extends Component{

  handleLogout = ()=>{
    console.log("ejecuto handlelogout");
    axios.get('http://localhost:3000/logout')
     .then((res)=>{
       console.log(res)

         this.props.getUserName('');
     })
     .catch(e=>console.log(e))
  }


render(){
  console.log(this.props.user)
  return (
    <div>
      {this.props.user}
      <button onClick={this.handleLogout}>Make Logout</button>

    </div>)
}

  ;
}
