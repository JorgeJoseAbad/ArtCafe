import React,{Component} from 'react'
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';

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

        toNewArtwork=<button>
                        <Link style={{color:'black'}} to="/newartwork">
                          Load a new artwork!!
                        </Link>
                      </button>
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
          <div className="wellcome"
            style={{
              backgroundColor: 'grey',
              marginTop:10,
              marginBottom: 10,
              fontSize: 22,
              color:'white'
            }}>
            {(this.props.user&&this.props.user!=='')?
              <div style={{fontSize: 16,paddingBottom: 5}}>
                <b>Wellcome {this.props.user} there are all this artwork for you</b>
                <div>And you can load a new artwork {toNewArtwork}</div>
              </div>
              :
              <b>Wellcome visitor! there are all this artwork for you</b>
             }
             </div>
          <div className="container-fluid">
            <div className="row">
              {artworkList}
            </div>
          </div>

        </div>
      </div>
    )}

}
