import React,{Component} from 'react'
import axios from 'axios';


export class Artwork extends Component{

  constructor(props){
    super(props);
    this.state=({
    })
  }

  render(){
    console.log(this.props)
    return(
      <div className="col-md-4" style={{backgroundColor:'#ddf0f7'}}>
        <h4>{this.props.art.title}</h4>
        <img alt="foto" style={{width:200}} src={this.props.art.pic_path}/>
        <p>{this.props.art.category}</p>
        <p>{this.props.art.description}</p>
        <p>{this.props.art.startBid}</p>
        An work of: <p>{this.props.art._creator.username}</p>
      </div>
    )
  }

}
