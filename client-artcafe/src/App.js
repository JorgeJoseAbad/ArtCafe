import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logos/logo.svg';
import './App.css';
import Background from './logos/fondo.jpg';

import {Gallery} from './components/gallery.js';
import {Login} from './components/login.js';
import {Signup} from './components/signup.js';
import {Logout} from './components/logout.js';

import {Artworkdetail} from './components/artworkdetail.js';
import {Editartwork} from './components/editartwork.js'



let userLogged='';
let userLoggedId=''

const getUserNameId=(user,id)=>{
  console.log("this is a prueba",user,id);
  userLogged=user;
  userLoggedId=id
  console.log(userLogged,userLoggedId);
}


const MayRoutes = () => {
  return [
    <Route exact path="/" key="r0" component={()=><Gallery title="Hola"
      user={userLogged} id={userLoggedId}/>} />,
    <Route path="/gallery" key="r1" component={()=><Gallery title="Hola"
      user={userLogged} id={userLoggedId}/>}/>,
    <Route path="/login" key="r2" component={()=><Login
      getUserNameId={getUserNameId}/>} />,
    <Route path="/signup" key="r3" component={Signup} />,
    <Route path="/logout" key="r4" component={()=><Logout user={userLogged}
      getUserNameId={getUserNameId}/>} />,
    <Route path="/artworkdetail" key="r5" component={Artworkdetail}/>,
    <Route path="/editartwork" key="r6" component={Editartwork}/>
      ]
      };



class App extends Component {
render() {
  return (

    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active"><Link to="/">Portada</Link></li>
            <li className="nav-item"><Link to="/gallery">Gallery</Link></li>
            <li className="nav-item"><Link to="/signup">Signup</Link></li>
            {
              userLogged===''?
                <li className="nav-item"><Link to="/login">Login</Link></li>
              :
              <li className="nav-item">
                <Link to="/logout">Logout: {userLogged}</Link>
              </li>
            }
          </ul>
        </div>
      </nav>
      <header className="App-header"
        style={{backgroundImage:`url(${Background})`,color:'black'}}>
        <h1>YOUR COFEE FOR ARTIST AND ART LOVERS ALL ARROUND THE WORLD</h1>
        <img src={logo} className="App-logo" alt="ArtCafe" />
        <h2>Artist thrive here</h2>
        <p>The place where you can buy the better artworks or
        auction your creations</p>
      </header>
      <MayRoutes />

    </div>
    );
  }
}

export default App;
