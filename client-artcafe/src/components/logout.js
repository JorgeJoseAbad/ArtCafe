import React, { Component } from 'react'
import axios from 'axios';


export class Logout extends Component{

  handleLogout = ()=>{
    axios.get('http://localhost:3000/logout')
     .then((res)=>{
         this.props.getUserNameId('');
     })
     .catch(e=>console.log(e))
  }


render(){
  return (
    <div>
      {this.props.user}
      <button onClick={this.handleLogout}>Make Logout</button>
    </div>)
  }

}
