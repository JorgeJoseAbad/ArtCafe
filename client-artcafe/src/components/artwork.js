import React,{Component} from 'react'
import axios from 'axios';


export class Artwork extends Component{

  constructor(props){
    super(props);
    this.state=({
    })
  }

  render(){

    return(
      <div>
        <b>Alcanzado Artwork class</b>
        <h4>{this.props.art.category}</h4>
        <img alt="foto" src={this.props.art.pic_path}/>
      </div>
    )
  }

}
