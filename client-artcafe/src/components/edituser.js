import React,{Component} from 'react'
import axios from 'axios';
import Background from '../logos/fondo.jpg';

export class Edituser extends Component{
  constructor(props){
    super(props);
    this.initialState=({
      userId:this.props.userID,
      userToedit:{
        isArtist:'',
        description:'',
        email:''
      }
    })
    this.state=this.initialState;
    this.getUserToEdit();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    handleChange = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
        this.setState.userToedit({
              [name] : value

        });
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

 const{isArtist,description,email}=this.state.userToedit;

  return(

    <div
    style={{
      backgroundImage:`url(${Background})`,
      color:'black',
    }}>
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

      <form>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            name="description"
            value={description}
            onChange={this.handleChange}
            className="form-control"
          required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="isArtist">Are You Artist?</label>
          <input
            type="checkbox"
            name="isArtist"
            checked={isArtist}
            onChange={this.handleChange}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Make changes
        </button>
      </form>

    </div>
  )
}
}
