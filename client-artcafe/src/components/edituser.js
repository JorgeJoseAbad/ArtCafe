import React,{Component} from 'react'
import axios from 'axios';

export class Edituser extends Component{
  constructor(props){
    super(props);
    this.state=({
      userId:this.props.userID,
      userToedit:null
    })
    this.getUserToEdit();
  }

  getUserToEdit=()=>{
    axios.get(`http://localhost:3000/users/${this.state.userId}`)
    .then((res)=>{
       console.log(res)
      this.setState({userToedit:res.data});

    })
    .catch(e=>console.log(e))
  }

  handleselectedFile = event => {
    console.log(event);
      let selectedFile = document.getElementById('input').files[0];
      this.setState({
        selectedFile: selectedFile,
      })
    }

  handleSubmit=(event)=>{
    console.log(event)
    event.preventDefault();
    const data = new FormData()
    data.append('avatar', this.state.selectedFile)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post(
      `http://localhost:3000/users/upload/${this.state.userId}`
      ,data,config
    )
    .then((res)=>{
      console.log(res)

    })
    .catch(e=>console.log(e))
 }

render(){
  return(

    <div>
      <div>Edit User alcanzado {this.props.userID}</div>
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label
          htmlFor="pic_path"
        >
          Upload a new photo for this artwork
        </label>
        <input
          type="file"
          id="input"
          ref={this.fileInput}
          onChange={this.handleselectedFile}
        />
        <input
          type="hidden" value="<%= artwork._id%>"
          name="_id" id="upload-photo"
          className="form-control"
        />
        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}
}
