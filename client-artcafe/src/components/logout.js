import React, { Component } from 'react'
import axios from 'axios';


export class Logout extends Component{

  handleLogout = ()=>{
    axios.get('http://localhost:3000/logout')
     .then((res)=>{
         this.props.getUserNameId('','','');
         this.props.history.push('/gallery');
     })
     .catch(e=>console.log(e))
  }


render(){
  return (
    <div>
      <div>{this.props.user}, are you sure you want leave?</div>
      <button onClick={this.handleLogout}>YES</button>
    </div>)
  }

}
