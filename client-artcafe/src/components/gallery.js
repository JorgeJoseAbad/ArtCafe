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
  }

  handleSubmit=()=>{
    this.getGallery();
  }

  getGallery=()=>{
    axios.get('http://localhost:3000/gallery')
    .then((res)=>{
      console.log(res.data);
      this.setState(this.state.arrayGallery=res.data);

    })
    .catch(e=>console.log(e))
  }

  render(){
      let toNewArtwork;
      if (this.props.id!=='') toNewArtwork=<Newartwork id={this.props.id}/>
      else toNewArtwork=<div>You are no logged and can't load artwork</div>

      const artworkList = this.state.arrayGallery.map((art,index)=>{
         return <Artwork art={art}/>
           })

    return(
          <div className="page">
            <pre>Hola {this.props.user} your id is {this.props.id}!!!!</pre>
            {artworkList}
            <button onClick={this.handleSubmit}>get Gallery</button>

            {toNewArtwork}
            <img alt="AltHomer" src="https://instagram.fmad3-6.fna.fbcdn.net/vp/e2831892fe54726bc725854514d818bb/5C4D2598/t51.2885-15/sh0.08/e35/s640x640/43438078_333374877223205_9014798235918047786_n.jpg"/>
          </div>
    )}

}
