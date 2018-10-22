import React,{Component} from 'react'
import axios from 'axios';

export class Artworkdetail extends Component{
  constructor(props){
    super(props);
    this.state=({

      userVisitor:this.props.location.param1,
      artworkCreator:this.props.location.param2,
      arworkID:this.props.location.param3,
      artworkData:''

    })

    this.getArtwork()
  }

  getArtwork=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.arworkID}`)
    .then((res)=>{
      this.setState(this.state.artworkData=res.data);

    })
    .catch(e=>console.log(e))
  }

 render(){
   console.log(this.props)
   console.log(this.state);
   return(
      <div style={{
        backgroundImage: `url(${this.state.artworkData.pic_path})`,
        backgroundSize: 'cover',
        margin: '0 auto',
        width:600,
        height:400,
        color:'white',
        fontSize:30
      }}
      >
        Hello {this.state.userVisitor}
        this is an artwork from {this.state.artworkCreator}
        <img alt="art" width="200px" src={this.state.pic_path}/>
      </div>
   )
 }


}
