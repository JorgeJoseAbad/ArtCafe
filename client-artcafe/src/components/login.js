import React, { Component } from 'react'
import axios from 'axios';
import Background from '../logos/fondo.jpg';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;

export class Login extends Component{
  constructor(props){
    super(props);
    this.initialState = {
        username: '',
        password: '',
        serverResponse:'',
        userName:'',
        userId:'',
        userPic_path:''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange = event => {
      const {name, value} = event.target;

      this.setState({
          [name] : value
      });
  }

  handleSubmit = (event) => {
      this.loginPost(this.state)
      this.setState(this.initialState);
      event.preventDefault();
  }


 loginPost=(state)=>{
    axios.post(`${apiUrl}/login`,state)
    .then((res)=>{
      console.log(res);
      this.setState({
        serverResponse:res.data.message,
        userName:res.data.username,
        userId:res.data._id,
        userPic_path:res.data.pic_path
      })
      if (res.data.message!=="The username do not exist"
            && res.data.message!=="The password is incorrect"
          ){
        this.props.getUserNameId(
          this.state.userName,
          this.state.userId,
          this.state.userPic_path
        );
         this.props.history.push('/');
      }


    })
    .catch(e=>console.log(e))
  }

  render(){
    const {username,password}=this.state;
    return(
      <div
        style={{
          backgroundImage:`url(${Background})`,
          color:'black',
        }}
      >

        <div className="error"
          style={{
            color:'hsla(0, 95%, 14%, 1)',
            backgroundColor: 'hsla(191, 18%, 42%, 0.41)'
          }}>
          {this.state.serverResponse}
        </div>
        {this.apiUrl}
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
                <button
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                >
                  login
                </button>
                <p className="account-message">
                  Don't have an account? <a href="/signup">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
