import React,{Component} from 'react'
import axios from 'axios';



export class Newartwork extends Component{
  constructor(props){
    super(props);
    this.state=({

    })
  }

  postGallery=()=>{
    axios.post('http://localhost:3000/gallery',{dataGallery:'fakedata'})
    .then((res)=>console.log(res.data))
    .catch(e=>console.log(e))
  }



  render(){
    return(
      <div>
        <div>newartorig alcanzado</div>
        <button onClick={this.postGallery}>send fakedata to gallery</button>
      </div>
          )
  }

}
