import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logos/logo.svg';

import './App.css';

import {Gallery} from './components/galery.js';
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
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div
              className="classRoutes"
              style={{
                backgroundColor:'hsla(33, 29%, 70%, 1)',
                margin:20
              }}>

              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item active"><Link to="/">Portada</Link></li>
                    <li class="nav-item"><Link to="/gallery">Gallery</Link></li>
                    <li class="nav-item"><Link to="/signup">Signup</Link></li>
                    <li class="nav-item"><Link to="/login">Login</Link></li>
                  </ul>
                </div>
              </nav>

            </div>
          </header>
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
