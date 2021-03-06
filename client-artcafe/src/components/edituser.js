import React,{Component} from 'react'
import axios from 'axios';
import Background from '../logos/fondo.jpg';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

export class Edituser extends Component{
  constructor(props){
    super(props);
    this.initialState=({
      userId:this.props.userID,
      userToedit:{
        username:'',
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
    axios.get(`${apiUrl}/users/${this.state.userId}`)
    .then((res)=>{
      this.setState({userToedit:res.data});


    })
    .catch(e=>console.log(e))
  }

  handleselectedFile = event => {
      let selectedFile = document.getElementById('avatar').files[0];
      this.setState({
        selectedFile: selectedFile,
      })
    }

    handleChange = event => {
      const target = event.target;
      const name= target.name;
      const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({userToedit:{...this.state.userToedit,[name] : value}});
    }

  handleSubmit=(event)=>{
    event.preventDefault();
    const data = new FormData()
    data.append('avatar', this.state.selectedFile)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post(
      `${apiUrl}/users/upload/${this.state.userId}`
      ,data,config
    )
    .then((res)=>{
      console.log(res)

    })
    .catch(e=>console.log(e))
 }


 handleSubmitUserData=(event)=>{

   event.preventDefault();
   const data=this.state.userToedit;
   axios.put(
     `${apiUrl}/users/${this.state.userId}`
     ,data
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
      <div>User Name: {this.state.userToedit.username}</div>
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <label
          htmlFor="avatar"
        >
          Upload a new avatar image for this user
        </label>
        <input
          style={{
            width: '50%',
            margin: '0 auto',
          }}

          type="file"
          id="avatar"
          name="avatar"
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
            style={{
              width: '50%',
              margin: '0 auto',
            }}
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
          style={{
            width: '50%',
            margin: '0 auto',
          }}
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
          onClick={this.handleSubmitUserData}
        >
          Make changes
        </button>
      </form>

    </div>
  )
}
}
