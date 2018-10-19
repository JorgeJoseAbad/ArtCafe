import React,{Component} from 'react'
import axios from 'axios';



export class Newartwork extends Component{
  constructor(props){
    super(props);
    this.initialState=({
        title:'',
        description:'',
        category:'',
        _creator:this.props.id,
        startBid:''
    })

    this.state=this.initialState
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange=(event)=>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]:value
    })
  }

  handleSubmit=(event)=>{
    this.postGallery(this.state)
    this.setState(this.initialState);
    event.preventDefault();

  }

  postGallery=(state)=>{
    axios.post('http://localhost:3000/gallery',state)
    .then((res)=>console.log(res.data))
    .catch(e=>console.log(e))
  }



  render(){

    const {title,description,category,startBid}=this.state
    return(


        <div className="container">
          <div className="row">
            <div className="col-sm-offset-3 col-sm-6 centered-form">
              <div>Load new Artwork by {this.props.id}</div>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    className="form-control"
                  required/>
                </div>
                <div className="form-group">
                  <label htmlFor="startBid">Price</label>
                  <div className="input-group">
                    <span className="input-group-addon">€</span>
                    <input
                      type="number"
                      name="startBid"
                      value={startBid}
                      onChange={this.handleChange}
                      className="form-control"
                    required/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    className="form-control"
                  required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    value={category}
                    onChange={this.handleChange}
                    className="custom-select btn-primary"
                    id="category"
                  />
                </div>
                <div className="form-group">
                  <button onClick={this.handleSubmit}>send fakedata to gallery</button>
                </div>
              </form>
            </div>
          </div>
        </div>



          )
  }

}
