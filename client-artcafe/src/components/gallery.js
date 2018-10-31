import React,{Component} from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {Newartwork} from './newartwork';
import {Artwork} from './artwork';
import Background from '../logos/fondo.jpg';
import logo from '../logos/logo.svg';

export class Gallery extends Component {
  constructor(props){
    super(props);
    this.state=({
      arrayGallery:[]
    })

    this.getGallery();
  }


   getGallery=()=>{
    axios.get('http://localhost:3000/gallery')
    .then((res)=>{
      this.setState({arrayGallery:res.data});
    })
    .catch(e=>console.log(e))
  }

  render(){
      let toNewArtwork;
      if (this.props.id&&(this.props.id!==''))
        //toNewArtwork=<Newartwork id={this.props.id}/>
        toNewArtwork=<button><Link to="/newartwork">Load a new artwork!!</Link></button>
      else
        toNewArtwork=<div>You are no logged and can't load artwork</div>

      const artworkList = this.state.arrayGallery.map((art,index)=>{
         return <Artwork art={art} key={index} visitor={this.props.user}/>
           })

    return(
      <div>
        <header className="App-header"
          style={{backgroundImage:`url(${Background})`,color:'black'}}>
          <h1>YOUR COFEE FOR ARTIST AND ART LOVERS ALL ARROUND THE WORLD</h1>
          <img src={logo} className="App-logo" alt="ArtCafe" />
          <h2>Artist thrive here</h2>
          <p>The place where you can buy the better artworks or
          auction your creations</p>
        </header>

        <div className="page">
          <pre>Hola {this.props.user} your id is {this.props.id}!!!!</pre>
          <div className="container-fluid">
            <div className="row">
              {artworkList}
            </div>
          </div>
          {toNewArtwork}
        </div>
      </div>
    )}

}
