import React, { Component } from 'react'
import axios from 'axios';

export class Login extends Component{
  constructor(props){
    super(props);
    this.initialState = {
        username: '',
        password: ''
    };
    this.state = this.initialState;

  }

  handleChange = event => {
      const {name, value} = event.target;

      this.setState({
          [name] : value
      });
  }

  submitForm = () => {
      //this.props.handleSubmit(this.state);
      this.callBackEndPost(this.state)
      this.setState(this.initialState);
  }

  /*function callBackEnd(){
    axios.get('http://localhost:3000/users')
    .then((res)=>console.log(res))
    .catch(error=>console.log(error));
  }*/

  callBackEndPost=(state)=>{

    axios.post('http://localhost:3000/users/login',state)
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  }

  /*function callBackEndPostParam(){
    let prueba='prueba';
    axios.post('http://localhost:3000/users/jorge',{prueba})
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  }*/

render(){
  const {username,password}=this.state;
  return(
    <div>
      <div className="page">

        <img style={{width:100}} alt="CarlosSainz" src="https://instagram.fmad3-6.fna.fbcdn.net/vp/e2831892fe54726bc725854514d818bb/5C4D2598/t51.2885-15/sh0.08/e35/s640x640/43438078_333374877223205_9014798235918047786_n.jpg"/>
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
                onClick={this.submitForm}
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
