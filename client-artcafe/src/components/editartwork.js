import React,{Component} from 'react'
import axios from 'axios';

export class Editartwork extends Component{
  constructor(props){
    super(props);
    this.state=({
      artworkID:this.props.location.param1,
      artworktoEdit:{}
    })

   this.getArtworkToEdit();

  }

  getArtworkToEdit=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.artworkID}`)
    .then((res)=>{

      this.setState({artworktoEdit:res.data});

    })
    .catch(e=>console.log(e))
  }

  render(){
    return(
      <div>Hola Edit</div>

    )
  }
}
