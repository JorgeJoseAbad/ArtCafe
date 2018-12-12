import React,{Component} from 'react'
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';

import {Artwork} from '../artwork';
import Background from '../../logos/fondo.jpg';
import logo from '../../logos/ArtCoffee-text.png';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;


export class Artworkbycategory extends Component {
  constructor(props){
    super(props);
    this.state=({
       category:props.location.param1,
       arrayGallery:[]
    })

    this.getGallery();
  }

  getGallery=()=>{
   axios.get(`${apiUrl}/gallery`)
   .then((res)=>{
     console.log(res.data);
     if (this.props.location.param1){
       const newRes=res.data.filter(
         (item,index)=>
         item.category===this.props.location.param1
     )

       this.setState({arrayGallery:newRes})

     }
   })
   .catch(e=>console.log(e))
 }


  render(){

    const artworkList = this.state.arrayGallery.map((art,index)=>{
       return <Artwork art={art} key={index} visitor={this.props.user}/>
         })

    return (
      <div>
      <header className="App-header"
        style={{
          backgroundImage:`url(${Background})`,
          color:'black',
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          fontWeight: 'bold',

        }}>
        <h1>Your coffee for artist and art lovers all around the world</h1>
        <img src={logo} style={{width: 300,height: 200}} className="App-logo" alt="ArtCoffee" />
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
              <b>Wellcome there are all this artwork for you</b>
              <div>And you can load a new artwork </div>
            </div>
            :
            <b>Wellcome visitor! there are all this artwork about:
            {this.state.category}, for you</b>
           }
           </div>
           </div>
           <div className="container-fluid">
             <div className="row">
               {artworkList}
             </div>
           </div>
      </div>
    );
  }

}
