import React,{Component} from 'react'
import axios from 'axios';
import {Artworkdetail} from './artworkdetail';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export class Artwork extends Component{

  constructor(props){
    super(props);
    this.state=({
      visitor:this.props.visitor,
      owner:this.props.art._creator.username,
      dataID:this.props.art._id
    })
  }

  handleSubmit=()=>{
    console.log(this.state.visitor,this.state.owner)


      }

  render(){
    console.log("Artoworks: ",this.props)
    const newTo = {
        pathname: "/Artworkdetail",
        param1: this.state.visitor,
        param2: this.state.owner,
        param3: this.state.dataID
      };
    return(
      <div className="col-md-4" style={{backgroundColor:'#ddf0f7'}}>
        <h4>{this.props.art.title}</h4>
        <img alt="foto" style={{width:200}} src={this.props.art.pic_path}/>
        <p>{this.props.art.category}</p>
        <p>{this.props.art.description}</p>
        <p>{this.props.art.startBid}</p>
        An work of: <p>{this.props.art._creator.username}</p>
        Do you like details?

        <button onClick={this.handleSubmit}><Link to={newTo} dataset={this.state}>Go</Link></button>
        </div>
    )
  }

}
