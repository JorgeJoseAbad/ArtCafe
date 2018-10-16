import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import {Gallery} from './components/galery.js';
import {Login} from './components/login.js';
import {Signup} from './components/signup.js';

const Routes = () => {
  return [
    <Route exact path="/" key="r1" component={Gallery} />,
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
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <div
              className="classRoutes"
              style={{
                backgroundColor:'hsla(33, 29%, 70%, 1)',
                margin:20
              }}>
              <Routes />
            </div>
          </header>

        </div>
      </Router>
    );
  }
}

export default App;
