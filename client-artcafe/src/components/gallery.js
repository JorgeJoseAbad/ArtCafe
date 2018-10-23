import React,{Component} from 'react'
import axios from 'axios';

import {Newartwork} from './newartwork';
import {Artwork} from './artwork'

export class Gallery extends Component {
  constructor(props){
    super(props);
    this.state=({
      arrayGallery:[]
    })

    this.getGallery();
  }

  handleSubmit=()=>{
    this.getGallery();
  }

  getGallery=()=>{
    let prov=[]
    axios.get('http://localhost:3000/gallery')
    .then((res)=>{
      this.setState({arrayGallery:res.data});
    })
    .catch(e=>console.log(e))
  }

  render(){
      let toNewArtwork;
      if (this.props.id&&(this.props.id!=='')) toNewArtwork=<Newartwork id={this.props.id}/>
      else toNewArtwork=<div>You are no logged and can't load artwork</div>

      const artworkList = this.state.arrayGallery.map((art,index)=>{
         return <Artwork art={art} key={index} visitor={this.props.user}/>
           })

    return(

          <div className="page">
            <pre>Hola {this.props.user} your id is {this.props.id}!!!!</pre>
            <div className="container-fluid">
              <div className="row">

                {artworkList}

              </div>
            </div>
            {/*<button onClick={this.handleSubmit}>get Gallery</button>*/}

            {toNewArtwork}
          </div>
    )}

}
