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

  render(){
    const newTo = {
        pathname: "/artworkdetail",
        param1: this.state.visitor,
        param2: this.state.owner,
        param3: this.state.dataID
      };
    return(
      <div className="col-md-4">
        <div className="artwork-slide" style={{
          padding:5,
          marginBottom:20,
          height:200,
          backgroundImage: `url(${this.props.art.pic_path})`,
          backgroundSize: 'cover',
          boxShadow: '6px 5px 5px black'
        }}>
          <div className="basicdata"
            style={{
              color:'white',
              backgroundColor:'rgba(0, 0, 0, 0.5)',
              width:'inherit'
            }}>
            <h4>
              <Link style={{
                color:'white',

              }} to={newTo} dataset={this.state}
              >{this.props.art.title}
              </Link>
            </h4>
            <p>
              {this.props.art.startBid} by
              {this.props.art._creator.username}
            </p>
          </div>
        </div>
      </div>

    )
  }

}
