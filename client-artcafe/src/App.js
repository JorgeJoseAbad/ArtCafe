import React, { Component } from 'react';

// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import logoclaim from './logos/ArtCoffee-logo.png';
import './App.css';

//import ProvLogo from './logos/user_color.png'; //provisional

import {Cover} from './components/cover.js';

import {Gallery} from './components/gallery.js';
import {Login} from './components/login.js';
import {Signup} from './components/signup.js';
import {Logout} from './components/logout.js';

import {Artworkdetail} from './components/artworkdetail.js';
import {Editartwork} from './components/editartwork.js';
import {Edituser} from './components/edituser.js';
import {Newartwork} from './components/newartwork.js';

import {Buy} from './components/buy.js';
import {Delete} from './components/delete.js';


class App extends Component {
constructor(props){
  super(props);
  this.state=({
    userLogged:'',
    userLoggedId:'',
    userLoggedLogo:'',
  })

  this.getUserNameId=this.getUserNameId.bind(this);
  this.MyRoutes=this.MyRoutes.bind(this);
}

  MyRoutes = () => {
    return [
      <Route exact path="/" key="r0" render={()=><Cover title="Hola"
        user={this.state.userLogged} id={this.state.userLoggedId}/>} />,
      <Route path="/gallery" key="r1" render={(props)=><Gallery title="Hola"
        user={this.state.userLogged} id={this.state.userLoggedId} {...props}
        />}/>,
      <Route path="/login" key="r2" render={(props)=><Login {...props}
        getUserNameId={this.getUserNameId}/>} />,
      <Route path="/signup" key="r3" component={Signup} />,
      <Route path="/logout" key="r4" render={(props)=><Logout {...props}
      user={this.state.userLogged} getUserNameId={this.getUserNameId}/>} />,
      <Route path="/artworkdetail" key="r5" component={Artworkdetail}/>,
      <Route path="/editartwork" key="r6" component={Editartwork}/>,
      <Route path="/edituser" key="r7" render={()=><Edituser
        userID={this.state.userLoggedId}/>}/>,
      <Route path="/newartwork" key="r8" render={(props)=><Newartwork
         {...props} id={this.state.userLoggedId} name={this.state.userLogged}
         />}/>,
      <Route path="/buy" key="r9" component={Buy}/>,
      <Route path="/delete" key="10" component={Delete}/>
    ]
  };

  getUserNameId=(user,id,pick_path)=>{
    this.setState({userLogged:user});
    this.setState({userLoggedId:id});
    this.setState({userLoggedLogo:pick_path});

  }

  render() {

    return (

      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src={logoclaim} width="50" height="50" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active"><Link to="/">Cover page</Link></li>
              <li className="nav-item"><Link to="/gallery">Gallery</Link></li>
            </ul>
            {
              this.state.userLogged===''?
                <ul className="navbar-nav">
                  <li className="nav-item" style={{display:'inline-block'}}>
                    <Link to="/signup">Signup</Link></li>
                  <li className="nav-item" style={{display:'inline-block'}}>
                    <Link to="/login">Login</Link></li>
                </ul>
              :
              <ul className="navbar-nav" onToggle={this.handleChange}>
                <li className="nav-item" style={{display:'inline-block'}}>
                  <Link to="/logout">Logout</Link>
                </li>
                <li className="nav-image-profile" style={{
                  display:'inline-block'
                }}>
                  <img src={this.state.userLoggedLogo} width="40" height="40"
                  alt=""/>
                </li>
                <li className="nav-item" style={{display:'inline-block'}}>
                  <Link to="/edituser">{this.state.userLogged}</Link>
                </li>
              </ul>

            }

          </div>
        </nav>

        <div className="container-fluid">

              <this.MyRoutes />

        </div>

      </div>
    );
  }
}

export default App;
