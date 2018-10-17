import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logos/logo.svg';
import './App.css';
import Background from './logos/fondo.jpg';

import {Gallery} from './components/gallery.js';
import {Login} from './components/login.js';
import {Signup} from './components/signup.js';

const Routes = () => {
  return [
    <Route exact path="/" key="r0" component={()=><Gallery title="Hola"/>} />,
    <Route path="/gallery" key="r1" component={Gallery}/>,
    <Route path="/login" key="r2" component={Login} />,
    <Route path="/signup" key="r3" component={Signup} />
  ]
  };

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active"><Link to="/">Portada</Link></li>
                <li className="nav-item"><Link to="/gallery">Gallery</Link></li>
                <li className="nav-item"><Link to="/signup">Signup</Link></li>
                <li className="nav-item"><Link to="/login">Login</Link></li>
              </ul>
            </div>
          </nav>
          <header className="App-header"  style={{backgroundImage:`url(${Background})`,color:'black'}}>
            <img src={logo} className="App-logo" alt="logo" />


            <h1>YOUR COFEE FOR ARTIST AND ART LOVERS ALL ARROUND THE WORLD</h1>
            <h2>Artist thrive here</h2>
            <p>The place where you can buy the better artworks or auction your creations</p>
          </header>
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
