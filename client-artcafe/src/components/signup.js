import React,{Component} from 'react'
import axios from 'axios'

export class Signup extends Component{
  constructor(props){
    super(props);
    this.initialState={
      username: '',
      password: '',
      email:'',
      description:'',
      isArtist:false,

    }
    this.state=this.initialState
  }


  handleChange = event => {
      const {name, value} = event.target;
      console.log(name,value);
      this.setState({
          [name] : value,


      });
  }



  submitForm = () => {
      //this.props.handleSubmit(this.state);
      this.sendSignup(this.state)
      this.setState(this.initialState);
  }

  sendSignup=(state)=>{

    axios.post('http://localhost:3000/users/signup',state)
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  }

render(){
  const {username,password,email,description,isArtist}=this.state
  return(
    <div>
      <div className="page">

        <img style={{width:100}} alt="CarlosSainzagain" src="https://instagram.fmad3-6.fna.fbcdn.net/vp/e2831892fe54726bc725854514d818bb/5C4D2598/t51.2885-15/sh0.08/e35/s640x640/43438078_333374877223205_9014798235918047786_n.jpg"/>
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
                  value={isArtist}
                  defaultChecked={this.state.isArtist}
                  onChange={this.handleChange}
                />
              </div>
              <p className="account-message">
                Do you already have an account? <a href="/login">Login</a>
              </p>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.submitForm}
              >Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

}
