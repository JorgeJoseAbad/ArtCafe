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
      <div className="cover-main">
        Place to put variants
        <ul>
          <li>List artorks<button type="button"><Link to="/gallery">
                                  Go to gallery</Link></button></li>
          {this.props.user!==''?
              <li>List my Artwork <button type="button">
                <Link to={userArtwork}>See your artork</Link>
              </button></li>
              :
              <li>Made login <button type="button"><Link to="/login">
                                  Login</Link></button>
              </li>
          }
          <li>List artwork by type <button type="button"></button></li>
        </ul>
      </div>
    </div>

  )
}

}
