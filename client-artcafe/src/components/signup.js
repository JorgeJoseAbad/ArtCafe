import React,{Component} from 'react'
import axios from 'axios'
import Background from '../logos/fondo.jpg';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

export class Signup extends Component{
  constructor(props){
    super(props);
    this.initialState={
      username: '',
      password: '',
      email:'',
      description:'',
      isArtist:false,

      serverResponse:''
    }
    this.state=this.initialState
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
      this.setState({
          [name] : value
      });
  }

  handleSubmit = (event) => {
      this.sendSignup(this.state)
      this.setState(this.initialState);
      event.preventDefault();
  }

  sendSignup=(state)=>{
    axios.post(`${apiUrl}/signup`,state)
    .then((res)=>{
      this.setState({
        serverResponse:res.data.message
      });
    })
    .catch(e=>console.log(e))
  }

  render(){
    const {username,password,email,description,isArtist}=this.state
    return(
      <div
        style={{
          backgroundImage:`url(${Background})`,
          color:'black',
        }}
      >
        <div>
          {this.state.serverResponse}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6 centered-form">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  />
                </div>
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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  />
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
                <p className="account-message">
                  Do you already have an account? <a href="/login">Login</a>
                </p>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
