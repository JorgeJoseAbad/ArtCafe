import React,{Component} from 'react'
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';

import {Artwork} from './artwork';
import Background from '../logos/fondo.jpg';
import logo from '../logos/logo.svg';

export class Cover extends Component {
  constructor(props){
    super(props);
    this.state=({
      userLoggedName:this.props.user,
      userLoggedId:this.props.id,

    })
  }


render(){
  let userArtwork={
    pathname:"/gallery",
    param1:this.state.userLoggedName,
    param2:this.state.userLoggedId,
  }


  return(
    <div className="cover">
      <header className="App-header"
        style={{backgroundImage:`url(${Background})`,color:'black'}}>
        <h1>YOUR COFEE FOR ARTIST AND ART LOVERS ALL ARROUND THE WORLD</h1>
        <img src={logo} className="App-logo" alt="ArtCafe" />
        <h2>Artist thrive here</h2>
        <p>The place where you can buy the better artworks or
        auction your creations</p>
      </header>

      <div className="cover-main"
        style={{
          fontSize:26,
          backgroundColor: '#8da7f3b8',
          maxWidth: '90%',
          margin: '0 auto',
          padding: 20
        }}>
        <pre>Some options you have</pre>
        <ul>
          <li><b>List artorks</b><button type="button"><Link to="/gallery">
                                  Go to gallery</Link></button></li>
          {this.props.user!==''?
              <li><b>List my Artwork</b>
                <button type="button">
                  <Link to={userArtwork}>See your artork</Link>
                </button>
              </li>
              :
              <li><b>Made login</b>
                <button type="button">
                    <Link to="/login">Login</Link>
                </button>
              </li>
          }

        </ul>
      </div>

      <div className="intro-cover"
      style={{
        fontWeight: '100',
        fontSize: 26,
        color: 'navy',
        backgroundColor: '#aaaaaa',
        maxWidth: '90%',
        margin: '0 auto'
      }}>

          This app, ArtCafe, is made with: React, React-route, Bootstrap;
          in the front side. and Node.js, Express, Mongoose and MongoDB,
          in the back side

      </div>

    </div>

  )
}

}
