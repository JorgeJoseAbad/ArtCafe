import React,{Component} from 'react'
import axios from 'axios';
import {Editartwork} from './editartwork';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Artworkdetail extends Component{
  constructor(props){
    super(props);
    this.state=({
      userVisitor:this.props.location.param1,
      artworkCreator:this.props.location.param2,
      artworkID:this.props.location.param3,
      artworkData:'',
      selectedFile:null,

    })
    this.getArtwork()

    this.fileInput = React.createRef(); //optative!!!

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleselectedFile=this.handleselectedFile.bind(this);
  }

  getArtwork=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.artworkID}`)
    .then((res)=>{
      this.setState({artworkData:res.data});

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
    console.log(this.fileInput.current.files[0]);
    event.preventDefault();
    const data = new FormData()
    data.append('artworkImage', this.state.selectedFile)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post(`http://localhost:3000/gallery/upload/${this.state.artworkID}`,data,config)
    .then((res)=>{
      console.log(res)

    })
    .catch(e=>console.log(e))
 }

 render(){
   let newToEdit={
     pathname: "/editartwork",
     param1: this.state.artworkID

   }

   const {pic_path}=this.state.artworkData;

   let options;
   if (this.state.userVisitor===this.state.artworkCreator)
      options=
      <div>
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
          <input type="hidden" value="<%= artwork._id%>" name="_id" id="upload-photo" className="form-control"/>
          <input type="submit" value="Submit" />
        </form>

        <button
          type="button"
          className="btn btn-primary"
          style={{color:'black'}}
        >
          <Link to={newToEdit}>Edit</Link>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          style={{color:'black'}}
        >
          DELETE
        </button>
      </div>

   else options=
     <div>
       <b>This is a ganga {this.state.startBid}</b>
       <button type="button" className="btn btn-secondary">Buy</button>
     </div>

   return(
      <div
        className="container artworkdetail-main"
        style={{
          backgroundColor:'AliceBlue',
          border: '5px solid hsla(155, 50%, 10%, 1)',
          margin: '0 auto',
          maxWidth:900,
          height:400,
          color:'MidnightBlue',
          fontSize:30
        }}
      >
        <div
          className="row artworkdetail-header"
          style={{
            backgroundColor:'rgba(103, 33, 33, 0.2)',
          }}
        >
          <div className="col-md-2">{this.state.userVisitor}</div>
          <div className="col-md-6">{this.state.artworkData.title}</div>
          <div className="col-md-2">{this.state.artworkCreator}</div>
          <div className="col-md-2">{this.state.artworkData.category}</div>
        </div>
        <div className="row">
          <div
            className="col-md-4 artworkdetail-img"
            style={{
                boxShadow: '6px 5px 5px black',
                border: '1px solid black',
                padding:0
            }}
          >
            <img
              alt="art"
              style={{width:'inherit',height:'auto'}}
              src={this.state.artworkData.pic_path}
            />
          </div>
          <div className="col-md-8">
            <div
              className="artworkdetail-description"
              style={{
                  margin:10,
                  border:'1px solid blue',
                  boxShadow: '2px 2px 2px 2px blue'
              }}
            >
              {this.state.artworkData.description}
            </div>
            <div className="artworkdetail-options">
              {options}
            </div>
          </div>
        </div>
      </div>
   )
 }


}
