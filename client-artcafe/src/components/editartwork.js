import React,{Component} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Background from '../logos/fondo.jpg';

export class Editartwork extends Component{
  constructor(props){
    super(props);
    this.state=({
      artworkID:this.props.location.param1,
      title:'',
      description:'',
      category:'',
      startBid:''

    })

   this.getArtworkToEdit();

  }

  getArtworkToEdit=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.artworkID}`)
    .then((res)=>{
      console.log(res);
      this.setState({
        title:res.data.title,
        description:res.data.description,
        category:res.data.category,
        startBid:res.data.startBid
      });

    })
    .catch(e=>console.log(e))
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
    this.editGallery(this.state)
    this.setState(this.initialState);
    event.preventDefault();


  }

  editGallery=(state)=>{
    axios.put(`http://localhost:3000/gallery/${this.state.artworkID}`,state)
    .then((res)=>{
      console.log(res.data);
      this.props.history.push('/gallery');

    })
    .catch(e=>console.log(e))
  }



  render(){

    const {title,description,category,startBid}=this.state;

    return(

      <div className="container" style={{
        border:'3px solid blue',
        color:'black',
        backgroundImage:`url(${Background})`,
        marginTop:20
      }}>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6 centered-form">
            <div>Edit artwork data; {this.props.id}</div>
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
                >
                  <option defaultValue="General">General</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Comic writing">Comic writing</option>
                  <option value="Digital art">Digital art</option>
                  <option value="Drawing">Drawing</option>
                  <option value="Engraving">Engraving</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Graffiti">Graffiti</option>
                  <option value="Painting">Painting</option>
                  <option value="Photography">Photography</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Woodwork">Woodwork</option>
                </select>
              </div>
              <div className="form-group">
                <button  onClick={this.handleSubmit}>
                  Send corrected data artwork to gallery
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>

    )
  }
}


// this also works with react-router-native
