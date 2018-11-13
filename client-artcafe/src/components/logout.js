import React, { Component } from 'react'
import axios from 'axios';
import Background from '../logos/fondo.jpg';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

export class Logout extends Component{

  handleLogout = ()=>{
    axios.get(`${apiUrl}/logout`)
     .then((res)=>{
         this.props.getUserNameId('','','');
         this.props.history.push('/');
     })
     .catch(e=>console.log(e))
  }


render(){
  return (
    <div
    style={{
      backgroundImage:`url(${Background})`,
      color:'black',
      height: 200,
      paddingTop: 80,
    }}>
      <div>{this.props.user}, are you sure you want leave?</div>
      <button onClick={this.handleLogout}>YES</button>
    </div>)
  }

}
