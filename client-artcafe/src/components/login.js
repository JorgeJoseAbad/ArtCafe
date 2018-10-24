import React, { Component } from 'react'
import axios from 'axios';

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
    axios.post('http://localhost:3000/login',state)
    .then((res)=>{
      console.log(res);
      this.setState({
        serverResponse:res.data.message,
        userName:res.data.username,
        userId:res.data._id,
        userPic_path:res.data.pic_path
      })
      this.props.getUserNameId(
        this.state.userName,
        this.state.userId,
        this.state.userPic_path
      );

    })
    .catch(e=>console.log(e))
  }


handleLogout = ()=>{
  axios.get('http://localhost:3000/logout')
   .then((res)=>{
     this.setState({
       serverResponse:res.data.message,
       userId:''
     })
     this.props.getUserNameId('','','');
   })
   .catch(e=>console.log(e))
}

  render(){
    const {username,password}=this.state;
    return(
      <div>

        <div>{this.state.serverResponse}</div>
        <div>
          <button onClick={this.handleLogout}>Make Logout</button>
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
