import React,{Component} from 'react'
import axios from 'axios';

export class Artworkdetail extends Component{
  constructor(props){
    super(props);
    this.state=({

    })
  }

 render(){
   console.log(this.props)
   console.log(this.state);
   return(
      <div>
        {this.props.location.param1}
        <img alt="art" width="200px" src={this.props.location.param2.art.pic_path}/>
      </div>
   )
 }


}
